"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  ArrowLeft,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Crown,
  Eye,
  Medal,
  Minus,
  RefreshCw,
  Share2,
  Timer,
  TrendingUp,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getMCQ, getMCQsByIds } from "@/lib/data/mcqs";
import { getTopic } from "@/lib/data/topics";
import { leaderboard } from "@/lib/data/banks";
import type { Exam, MCQ } from "@/lib/types";
import { usePracticeStore } from "@/stores/practice-store";
import {
  useProgressStore,
  type AttemptSummary,
} from "@/stores/progress-store";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { formatDurationSec, useMounted } from "@/components/exam/shared";

type QuestionOutcome = { id: string; chosen: number | null; correct: number };

type ResolvedResult = {
  score: number;
  total: number;
  correct: number;
  wrong: number | null;
  skipped: number | null;
  accuracy: number;
  xpEarned: number;
  timeTakenSec: number;
  perQuestion: QuestionOutcome[] | null;
  topicAccuracies: AttemptSummary["topicAccuracies"] | null;
  source: "session" | "attempt" | "demo";
};

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministically interleave correct/wrong/skipped so demo looks organic */
function spreadStatuses(total: number, correct: number, wrong: number, skipped: number) {
  const cells = [
    ...Array.from({ length: correct }, () => 0),
    ...Array.from({ length: wrong }, () => 1),
    ...Array.from({ length: skipped }, () => 2),
  ];
  const order = Array.from({ length: total }, (_, i) => i).sort(
    (a, b) => (a * 0.6180339887) % 1 - ((b * 0.6180339887) % 1)
  );
  const out = new Array<number>(total).fill(0);
  order.forEach((pos, i) => {
    out[pos] = cells[i] ?? 0;
  });
  return out;
}

function buildDemo(exam: Exam): ResolvedResult {
  const questions = getMCQsByIds(exam.questionIds);
  const total = questions.length;
  const correct = Math.max(1, Math.round((total * 17) / 24));
  const remaining = Math.max(0, total - correct);
  const skipped = Math.min(remaining, Math.round(remaining * 0.3));
  const wrong = remaining - skipped;
  const statuses = spreadStatuses(total, correct, wrong, skipped);

  const perQuestion: QuestionOutcome[] = questions.map((q, i) => {
    const status = statuses[i] ?? 0;
    const chosen =
      status === 0
        ? q.answer
        : status === 1
          ? (q.answer + 1) % q.options.length
          : null;
    return { id: q.id, chosen, correct: q.answer };
  });

  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  return {
    score: correct,
    total,
    correct,
    wrong,
    skipped,
    accuracy,
    xpEarned: correct * 6 + 10,
    timeTakenSec: total * 45,
    perQuestion,
    topicAccuracies: null,
    source: "demo",
  };
}

function fromAttempt(a: AttemptSummary): ResolvedResult {
  return {
    score: a.score,
    total: a.total,
    correct: a.score,
    wrong: null,
    skipped: null,
    accuracy: a.accuracy,
    xpEarned: a.xpEarned,
    timeTakenSec: a.timeTakenSec,
    perQuestion: null,
    topicAccuracies: a.topicAccuracies,
    source: "attempt",
  };
}

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    let raf = 0;
    const from = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const DEMO_TREND = [
  { label: "#1", accuracy: 54 },
  { label: "#2", accuracy: 58 },
  { label: "#3", accuracy: 52 },
  { label: "#4", accuracy: 61 },
  { label: "#5", accuracy: 64 },
  { label: "#6", accuracy: 60 },
  { label: "#7", accuracy: 67 },
  { label: "#8", accuracy: 65 },
  { label: "#9", accuracy: 69 },
  { label: "#10", accuracy: 71 },
];

const topicChartConfig = {
  accuracy: { label: "Accuracy", color: "var(--chart-1)" },
} satisfies ChartConfig;

const trendChartConfig = {
  accuracy: { label: "Accuracy", color: "var(--chart-2)" },
} satisfies ChartConfig;

function topicLabel(slug: string, locale: "bn" | "en") {
  return getTopic(slug)?.title[locale] ?? slug;
}

function barFill(accuracy: number) {
  if (accuracy < 60) return "var(--danger)";
  if (accuracy < 75) return "var(--warning)";
  return "var(--success)";
}

type QuestionRow = {
  index: number;
  mq: MCQ;
  chosen: number | null;
  correct: number;
  status: "correct" | "wrong" | "skipped" | "review";
};

export function ExamResult({ exam }: { exam: Exam }) {
  const t = useTranslations("exam");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";
  const router = useRouter();

  useHydrateProgress();
  const attempts = useProgressStore((s) => s.attempts);
  const practiceResult = usePracticeStore((s) => s.result);
  const practiceExamId = usePracticeStore((s) => s.examId);
  const startSession = usePracticeStore((s) => s.startSession);

  const mounted = useMounted();

  const resolved = useMemo<ResolvedResult>(() => {
    const sessionMatch =
      practiceResult &&
      (practiceExamId === exam.id ||
        practiceResult.title === exam.title.en ||
        practiceResult.title === exam.title.bn);

    if (sessionMatch && practiceResult) {
      return {
        score: practiceResult.score,
        total: practiceResult.total,
        correct: practiceResult.correct,
        wrong: practiceResult.wrong,
        skipped: practiceResult.skipped,
        accuracy: practiceResult.accuracy,
        xpEarned: practiceResult.xpEarned,
        timeTakenSec: practiceResult.timeTakenSec,
        perQuestion: practiceResult.perQuestion,
        topicAccuracies: null,
        source: "session",
      };
    }

    if (mounted) {
      const attempt = attempts.find(
        (a) =>
          a.id.includes(exam.id) ||
          a.title === exam.title.en ||
          a.title === exam.title.bn
      );
      if (attempt) return fromAttempt(attempt);
    }

    return buildDemo(exam);
  }, [practiceResult, practiceExamId, attempts, exam, mounted]);

  const passed = resolved.accuracy >= 60;
  const displayScore = useCountUp(resolved.score);

  const percentile = Math.min(
    98,
    Math.max(5, Math.round(50 + (resolved.accuracy - 60) * 1.4))
  );
  const participants = exam.participants ?? 876;
  const rank = Math.max(
    1,
    Math.round((participants * (100 - percentile)) / 100)
  );

  const topicRows = useMemo(() => {
    if (resolved.perQuestion) {
      const agg: Record<string, { correct: number; total: number }> = {};
      for (const pq of resolved.perQuestion) {
        const mq = getMCQ(pq.id);
        if (!mq) continue;
        const slot = (agg[mq.topic] ??= { correct: 0, total: 0 });
        slot.total += 1;
        if (pq.chosen !== null && pq.chosen === mq.answer) slot.correct += 1;
      }
      return Object.entries(agg)
        .map(([slug, v]) => ({
          topic: topicLabel(slug, locale),
          accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0,
        }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 8);
    }

    if (resolved.topicAccuracies) {
      return Object.entries(resolved.topicAccuracies)
        .map(([slug, v]) => ({
          topic: topicLabel(slug, locale),
          accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0,
        }))
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 8);
    }

    // demo: plausible synthetic buckets from this exam's topics
    const slugs = [
      ...new Set(getMCQsByIds(exam.questionIds).map((q) => q.topic)),
    ].slice(0, 6);
    return slugs
      .map((slug) => ({
        topic: topicLabel(slug, locale),
        accuracy: 35 + (hashStr(slug + exam.id) % 51),
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [resolved, exam, locale]);

  const trendRows = useMemo(() => {
    if (mounted && attempts.length > 0) {
      return attempts
        .slice(0, 10)
        .reverse()
        .map((a, i) => {
          const d = new Date(a.date);
          const label = Number.isNaN(d.getTime())
            ? `#${i + 1}`
            : new Intl.DateTimeFormat(locale, {
                day: "numeric",
                month: "short",
              }).format(d);
          return { label, accuracy: a.accuracy };
        });
    }
    return DEMO_TREND;
  }, [mounted, attempts, locale]);

  const questionRows = useMemo<QuestionRow[]>(() => {
    if (resolved.perQuestion) {
      const rows: QuestionRow[] = [];
      resolved.perQuestion.forEach((pq, i) => {
        const mq = getMCQ(pq.id);
        if (!mq) return;
        const status =
          pq.chosen === null
            ? "skipped"
            : pq.chosen === mq.answer
              ? "correct"
              : "wrong";
        rows.push({
          index: i + 1,
          mq,
          chosen: pq.chosen,
          correct: mq.answer,
          status,
        });
      });
      return rows;
    }
    return getMCQsByIds(exam.questionIds).map((mq, i) => ({
      index: i + 1,
      mq,
      chosen: null,
      correct: mq.answer,
      status: "review" as const,
    }));
  }, [resolved, exam]);

  function handleRetake() {
    const questions = getMCQsByIds(exam.questionIds);
    const topicSlugs = [...new Set(questions.map((q) => q.topic))];
    startSession({
      questions,
      mode: "mock",
      topicSlugs,
      timeLimitSec: exam.durationMin * 60,
      title: exam.title[locale],
      examId: exam.id,
    });
    router.push("/practice/session");
  }

  async function handleShare() {
    const text = t("shareText", {
      score: `${resolved.score}/${resolved.total}`,
      exam: exam.title[locale],
    });
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "IT Job Prep BD", text });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success(tc("copied"));
    } catch {
      /* clipboard unavailable */
    }
  }

  const statusStyle = {
    correct: {
      card: "border-success/40 bg-success/5",
      badge: "border-success/40 bg-success/10 text-success",
      Icon: CheckCircle2,
      label: tc("correct"),
    },
    wrong: {
      card: "border-danger/40 bg-danger/5",
      badge: "border-danger/40 bg-danger/10 text-danger",
      Icon: XCircle,
      label: tc("wrong"),
    },
    skipped: {
      card: "border-warning/40 bg-warning/5",
      badge: "border-warning/40 bg-warning/10 text-warning",
      Icon: Minus,
      label: tc("skipped"),
    },
    review: {
      card: "border-border",
      badge: "border-border text-muted-foreground",
      Icon: Eye,
      label: "Answer key",
    },
  } as const;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* ── Score hero ───────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 ring-glow sm:p-10"
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -top-20 -right-12 size-56 rounded-full bg-lime/30 blur-[80px]" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              className={
                passed
                  ? "border-white/40 bg-white/20 font-bold tracking-widest text-white"
                  : "border-white/30 bg-danger/40 font-bold tracking-widest text-white"
              }
            >
              {passed ? t("pass") : t("fail")}
            </Badge>
            <span className="text-xs font-semibold tracking-widest text-white/60 uppercase">
              {t("resultTitle")}
            </span>
            <Badge
              variant="outline"
              className="ml-auto border-white/30 bg-white/10 text-white/90"
            >
              {exam.organization[locale]}
            </Badge>
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-display text-6xl leading-none font-bold text-white tabular-nums sm:text-7xl">
              {displayScore}
            </span>
            <span className="font-display mb-1 text-2xl font-semibold text-white/70">
              /{resolved.total}
            </span>
            <Badge className="mb-2 border-white/30 bg-white/15 text-white">
              {resolved.accuracy}% {tc("accuracy")}
            </Badge>
          </div>

          <p className="mt-3 text-sm font-medium text-white/80">
            {exam.title[locale]}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <dt className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                {t("percentile")}
              </dt>
              <dd className="font-display mt-0.5 text-lg font-bold text-white">
                {percentile}%
              </dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <dt className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                {t("rankLabel")}
              </dt>
              <dd className="font-display mt-0.5 text-lg font-bold text-white">
                #{rank}
              </dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <dt className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                {t("timeTaken")}
              </dt>
              <dd className="font-display mt-0.5 text-lg font-bold text-white tabular-nums">
                {formatDurationSec(resolved.timeTakenSec)}
              </dd>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
              <dt className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">
                {tc("xp")}
              </dt>
              <dd className="font-display mt-0.5 text-lg font-bold text-lime">
                +{resolved.xpEarned}
              </dd>
            </div>
          </dl>
        </div>
      </motion.section>

      {/* ── Charts ───────────────────────────────────────── */}
      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <BarChart3 className="size-4 text-violet" aria-hidden />
              {t("topicBreakdown")}
            </h2>
            <Badge variant="secondary" className="text-[10px]">
              {topicRows.length} topics
            </Badge>
          </div>
          <div className="mt-4">
            <ChartContainer
              config={topicChartConfig}
              className="aspect-auto h-[240px] w-full"
            >
              <BarChart data={topicRows} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="topic"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  tickFormatter={(v: string) =>
                    v.length > 9 ? `${v.slice(0, 8)}…` : v
                  }
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <ChartTooltip
                  cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {topicRows.map((row) => (
                    <Cell key={row.topic} fill={barFill(row.accuracy)} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display flex items-center gap-2 text-base font-semibold">
              <TrendingUp className="size-4 text-lime" aria-hidden />
              {t("scoreTrend")}
            </h2>
            <Badge variant="secondary" className="text-[10px]">
              last {trendRows.length}
            </Badge>
          </div>
          <div className="mt-4">
            <ChartContainer
              config={trendChartConfig}
              className="aspect-auto h-[240px] w-full"
            >
              <LineChart data={trendRows} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tickFormatter={(v: number) => `${v}%`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--color-accuracy)"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "var(--color-accuracy)", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </motion.div>
      </section>

      {/* ── Per-question breakdown ───────────────────────── */}
      <section id="breakdown" className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <CheckCircle2 className="size-4 text-success" aria-hidden />
            {t("breakdown")}
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="border-success/40 text-success">
              {tc("correct")} {resolved.correct}
            </Badge>
            {resolved.wrong != null && (
              <Badge variant="outline" className="border-danger/40 text-danger">
                {tc("wrong")} {resolved.wrong}
              </Badge>
            )}
            {resolved.skipped != null && (
              <Badge variant="outline" className="border-warning/40 text-warning">
                {tc("skipped")} {resolved.skipped}
              </Badge>
            )}
            <Badge variant="outline" className="text-muted-foreground">
              {tc("accuracy")} {resolved.accuracy}%
            </Badge>
          </div>
        </div>

        <ol className="mt-5 space-y-3">
          {questionRows.map((row) => {
            const meta = statusStyle[row.status];
            return (
              <li
                key={row.mq.id}
                className={`rounded-2xl border p-4 transition-colors ${meta.card}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-muted text-[11px] font-bold text-muted-foreground">
                      {row.index}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {topicLabel(row.mq.topic, locale)}
                    </Badge>
                    {row.mq.source && (
                      <Badge
                        variant="outline"
                        className="hidden text-[10px] text-muted-foreground sm:inline-flex"
                      >
                        {row.mq.source}
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className={meta.badge}>
                    <meta.Icon className="size-3" aria-hidden />
                    {meta.label}
                  </Badge>
                </div>

                <p className="mt-3 text-sm leading-relaxed font-medium text-foreground">
                  {row.mq.question[locale]}
                </p>

                {row.status === "skipped" && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-warning">
                    <Minus className="size-3.5" aria-hidden />
                    Skipped
                  </p>
                )}

                {row.chosen !== null && row.status !== "review" && (
                  <p
                    className={`mt-2 flex items-start gap-1.5 text-sm ${
                      row.status === "wrong" ? "text-danger" : "text-success"
                    }`}
                  >
                    {row.status === "wrong" ? (
                      <X className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    ) : (
                      <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    )}
                    <span>
                      <span className="font-semibold">Your answer:</span>{" "}
                      {String.fromCharCode(65 + row.chosen)}.{" "}
                      {row.mq.options[row.chosen]?.[locale]}
                    </span>
                  </p>
                )}

                {(row.status === "wrong" ||
                  row.status === "skipped" ||
                  row.status === "review") && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-sm text-success">
                    <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    <span>
                      <span className="font-semibold">
                        {row.status === "review" ? "Answer key" : "Correct answer"}:
                      </span>{" "}
                      {String.fromCharCode(65 + row.correct)}.{" "}
                      {row.mq.options[row.correct]?.[locale]}
                    </span>
                  </p>
                )}

                <details className="group mt-3 overflow-hidden rounded-xl border border-border bg-background/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2.5 text-xs font-semibold text-muted-foreground select-none">
                    {tc("explanation")}
                    <ChevronDown
                      className="size-3.5 transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="border-t border-border/60 px-3 py-3 text-sm leading-relaxed text-muted-foreground">
                    {row.mq.explanation[locale]}
                  </p>
                </details>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Leaderboard ──────────────────────────────────── */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <Trophy className="size-4 text-warning" aria-hidden />
            {t("leaderboardTitle")}
          </h2>
          <Badge variant="secondary" className="text-[10px]">
            {t("pointsLabel")}
          </Badge>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {leaderboard.map((entry) => (
            <li
              key={entry.rank}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3"
            >
              <span
                className="grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, hsl(${entry.avatarHue} 70% 55%), hsl(${(entry.avatarHue + 40) % 360} 70% 45%))`,
                }}
                aria-hidden
              >
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-semibold">
                  {entry.rank <= 3 && (
                    <Crown
                      className={`size-3.5 shrink-0 ${
                        entry.rank === 1 ? "text-warning" : "text-cyan"
                      }`}
                      aria-hidden
                    />
                  )}
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.score} {tc("score").toLowerCase()} ·{" "}
                  {entry.xp.toLocaleString(locale)} {tc("xp")}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Medal
                  className={`size-4 ${
                    entry.rank === 1
                      ? "text-warning"
                      : entry.rank === 2
                        ? "text-cyan"
                        : entry.rank === 3
                          ? "text-warning/60"
                          : "text-muted-foreground/40"
                  }`}
                  aria-hidden
                />
                #{entry.rank}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Share card ───────────────────────────────────── */}
      <section className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <Share2 className="size-4 text-cyan" aria-hidden />
            {t("shareCard")}
          </h2>
          <Button size="sm" onClick={handleShare}>
            <Share2 aria-hidden />
            {tc("share")}
          </Button>
        </div>

        <div className="bg-gradient-brand relative mt-4 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -right-10 -bottom-14 size-44 rounded-full bg-lime/30 blur-[60px]" />

          <div className="relative">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-sm font-bold text-white/85">
                IT Job Prep BD
              </span>
              <Badge className="border-white/40 bg-white/20 font-bold tracking-widest text-white">
                {passed ? t("pass") : t("fail")}
              </Badge>
            </div>

            <p className="font-display mt-5 text-5xl leading-none font-bold text-white tabular-nums sm:text-6xl">
              {resolved.score}
              <span className="text-2xl font-semibold text-white/70 sm:text-3xl">
                /{resolved.total}
              </span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-snug font-medium text-white/85">
              {exam.title[locale]}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs font-medium text-white/70">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="size-3.5" aria-hidden />
                {resolved.accuracy}% {tc("accuracy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="size-3.5" aria-hidden />
                {percentile}% {t("percentile")}
              </span>
              <span className="flex items-center gap-1.5">
                <Timer className="size-3.5" aria-hidden />
                {formatDurationSec(resolved.timeTakenSec)}
              </span>
              <span className="flex items-center gap-1.5 text-lime">
                +{resolved.xpEarned} {tc("xp")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Actions ──────────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="lg" className="h-11 px-5">
          <Link href="/exams">
            <ArrowLeft aria-hidden />
            {t("title")}
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="h-11 px-5">
          <a href="#breakdown">
            <Eye aria-hidden />
            {t("reviewAnswers")}
          </a>
        </Button>
        <Button size="lg" className="h-11 px-6" onClick={handleRetake}>
          <RefreshCw aria-hidden />
          Retake
        </Button>
      </div>
    </div>
  );
}
