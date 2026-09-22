"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  ListChecks,
  Minus,
  Play,
  Timer,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMCQ } from "@/lib/data/mcqs";
import { getTopic } from "@/lib/data/topics";
import { usePracticeStore } from "@/stores/practice-store";
import { useProgressStore } from "@/stores/progress-store";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { formatDurationSec } from "@/components/exam/shared";
import { cn } from "@/lib/utils";

function Stat({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof Trophy;
  label: string;
  value: string;
  tone?: "default" | "success" | "danger" | "warning" | "lime";
}) {
  const tones = {
    default: "text-foreground",
    success: "text-success",
    danger: "text-danger",
    warning: "text-warning",
    lime: "text-lime",
  };
  return (
    <div className="rounded-2xl border border-border bg-background/50 p-4">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3.5" aria-hidden /> {label}
      </span>
      <p className={cn("font-display mt-1.5 text-2xl font-bold", tones[tone])}>
        {value}
      </p>
    </div>
  );
}

export function PracticeResults() {
  const t = useTranslations("practice");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";
  const router = useRouter();

  useHydrateProgress();
  const result = usePracticeStore((s) => s.result);
  const questions = usePracticeStore((s) => s.questions);
  const examId = usePracticeStore((s) => s.examId);
  const startSession = usePracticeStore((s) => s.startSession);
  const reset = usePracticeStore((s) => s.reset);
  const attempts = useProgressStore((s) => s.attempts);

  const [showAll, setShowAll] = useState(false);

  const rows = useMemo(() => {
    if (!result) return [];
    return result.perQuestion
      .map((pq, i) => {
        const mq = questions.find((q) => q.id === pq.id) ?? getMCQ(pq.id);
        if (!mq) return null;
        const status =
          pq.chosen === null ? "skipped" : pq.chosen === pq.correct ? "correct" : "wrong";
        return { index: i + 1, mq, chosen: pq.chosen, correct: pq.correct, status };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [result, questions]);

  const topicRows = useMemo(() => {
    if (!result) return [];
    const agg: Record<string, { correct: number; total: number }> = {};
    for (const pq of result.perQuestion) {
      const mq = questions.find((q) => q.id === pq.id) ?? getMCQ(pq.id);
      if (!mq) continue;
      const slot = (agg[mq.topic] ??= { correct: 0, total: 0 });
      slot.total += 1;
      if (pq.chosen !== null && pq.chosen === pq.correct) slot.correct += 1;
    }
    return Object.entries(agg)
      .map(([slug, v]) => ({
        slug,
        label: getTopic(slug)?.title[locale] ?? slug,
        accuracy: v.total ? Math.round((v.correct / v.total) * 100) : 0,
        correct: v.correct,
        total: v.total,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [result, questions, locale]);

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">{tc("noResults")}</p>
        <Button className="mt-4" onClick={() => router.push("/practice")}>
          {t("backToPractice")}
        </Button>
      </div>
    );
  }

  const lastAttempt = attempts[0];

  function handleRetry() {
    const fresh = questions;
    if (fresh.length === 0) return;
    startSession({
      questions: fresh,
      mode: "practice",
      topicSlugs: result!.topicSlugs,
      timeLimitSec: null,
      title: result!.title,
      examId,
    });
    router.push("/practice/session");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
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
            <Badge className="border-white/40 bg-white/20 font-bold tracking-widest text-white">
              {t("sessionSummary")}
            </Badge>
            {examId && (
              <Badge
                variant="outline"
                className="border-white/30 bg-white/10 text-white/90"
              >
                <Trophy aria-hidden /> Exam mode
              </Badge>
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-display text-6xl leading-none font-bold text-white tabular-nums sm:text-7xl">
              {result.score}
            </span>
            <span className="font-display mb-1 text-2xl font-semibold text-white/70">
              /{result.total}
            </span>
            <Badge className="mb-2 border-white/30 bg-white/15 text-white">
              {result.accuracy}% {t("accuracyRate")}
            </Badge>
          </div>
          <p className="mt-3 text-sm font-medium text-white/80">{result.title}</p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/75">
            <span className="flex items-center gap-1.5">
              <Timer className="size-3.5" aria-hidden />
              {formatDurationSec(result.timeTakenSec)}
            </span>
            <span className="flex items-center gap-1.5 text-lime">
              <Zap className="size-3.5" aria-hidden /> +{result.xpEarned}{" "}
              {tc("xp")}
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 className="size-3.5" aria-hidden /> {lastAttempt
                ? `${lastAttempt.score}/${lastAttempt.total}`
                : "—"}
            </span>
          </div>
        </div>
      </motion.section>

      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          icon={CheckCircle2}
          label={tc("correct")}
          value={String(result.correct)}
          tone="success"
        />
        <Stat
          icon={XCircle}
          label={tc("wrong")}
          value={String(result.wrong)}
          tone="danger"
        />
        <Stat
          icon={Minus}
          label={tc("skipped")}
          value={String(result.skipped)}
          tone="warning"
        />
        <Stat
          icon={Clock}
          label={tc("time")}
          value={formatDurationSec(result.timeTakenSec)}
        />
      </section>

      {topicRows.length > 0 && (
        <section className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <BarChart3 className="size-4 text-violet" aria-hidden />
            Topic breakdown
          </h2>
          <ul className="mt-4 space-y-2">
            {topicRows.map((row) => (
              <li
                key={row.slug}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3"
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium">
                  {row.label}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {row.correct}/{row.total}
                </span>
                <span
                  className={cn(
                    "w-12 text-right text-sm font-bold tabular-nums",
                    row.accuracy >= 75
                      ? "text-success"
                      : row.accuracy >= 50
                        ? "text-warning"
                        : "text-danger"
                  )}
                >
                  {row.accuracy}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display flex items-center gap-2 text-base font-semibold">
            <ListChecks className="size-4 text-cyan" aria-hidden />
            Per-question review
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
          >
            {showAll ? "Show less" : "Show all"}
            <ChevronDown
              className={cn("size-3.5 transition-transform", showAll && "rotate-180")}
              aria-hidden
            />
          </Button>
        </div>
        <ol className="mt-4 space-y-2">
          {(showAll ? rows : rows.slice(0, 5)).map((row) => (
            <li
              key={row.mq.id}
              className={cn(
                "rounded-xl border p-3",
                row.status === "correct"
                  ? "border-success/40 bg-success/5"
                  : row.status === "wrong"
                    ? "border-danger/40 bg-danger/5"
                    : "border-warning/40 bg-warning/5"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm leading-snug font-medium">
                  {row.index}. {row.mq.question[locale]}
                </span>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0",
                    row.status === "correct"
                      ? "border-success/40 text-success"
                      : row.status === "wrong"
                        ? "border-danger/40 text-danger"
                        : "border-warning/40 text-warning"
                  )}
                >
                  {row.status === "correct"
                    ? tc("correct")
                    : row.status === "wrong"
                      ? tc("wrong")
                      : tc("skipped")}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {tc("correctAnswer")}:{" "}
                <span className="font-semibold text-foreground">
                  {String.fromCharCode(65 + row.correct)}.{" "}
                  {row.mq.options[row.correct]?.[locale]}
                </span>
              </p>
              {row.chosen !== null && row.chosen !== row.correct && (
                <p className="mt-1 text-xs text-danger">
                  Your answer: {String.fromCharCode(65 + row.chosen)}.{" "}
                  {row.mq.options[row.chosen]?.[locale]}
                </p>
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        {examId && (
          <Button
            size="lg"
            className="h-11 px-6"
            onClick={() => router.push(`/exams/${examId}/result`)}
          >
            <Trophy aria-hidden /> {tc("results")}
          </Button>
        )}
        <Button size="lg" variant="secondary" className="h-11 px-6" onClick={handleRetry}>
          <Play aria-hidden /> {t("tryAgain")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-11 px-6"
          onClick={() => {
            reset();
            router.push("/practice");
          }}
        >
          {t("backToPractice")}
        </Button>
      </div>
    </div>
  );
}
