"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  CheckCircle2,
  Dices,
  Play,
  Shuffle,
  Target,
  Timer,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMCQTopics, shuffle } from "@/lib/data/mcqs";
import { topics } from "@/lib/data/topics";
import type { SessionMode } from "@/stores/practice-store";
import { usePracticeStore } from "@/stores/practice-store";
import { cn } from "@/lib/utils";

const COUNT_OPTIONS = [10, 15, 20, 25, 30, 50] as const;

const MODE_META: Record<
  SessionMode,
  { icon: typeof Target; descKey: string }
> = {
  practice: { icon: Target, descKey: "modePracticeDesc" },
  mock: { icon: Timer, descKey: "modeMockDesc" },
};

export function PracticeSetup() {
  const t = useTranslations("practice");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";
  const router = useRouter();
  const searchParams = useSearchParams();
  const startSession = usePracticeStore((s) => s.startSession);

  const preset = useMemo(() => {
    const raw = searchParams.get("topics");
    if (!raw) return [] as string[];
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter((slug) => topics.some((tp) => tp.slug === slug));
  }, [searchParams]);

  const [mode, setMode] = useState<SessionMode>("practice");
  const [selected, setSelected] = useState<string[]>(preset);
  const [count, setCount] = useState<number>(20);

  function toggleTopic(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function handleStart() {
    const pool = getMCQTopics(selected, count);
    const questions = mode === "practice" ? shuffle(pool) : pool;
    if (questions.length === 0) return;
    const topicSlugs = [...new Set(questions.map((q) => q.topic))];
    startSession({
      questions,
      mode,
      topicSlugs,
      timeLimitSec: mode === "mock" ? Math.max(5, questions.length) * 60 : null,
      title:
        mode === "mock"
          ? `Mock · ${questions.length} MCQs`
          : `Practice · ${questions.length} MCQs`,
    });
    router.push("/practice/session");
  }

  const poolSize = getMCQTopics(selected).length;
  const disabled = selected.length === 0 || poolSize === 0;

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          <Zap aria-hidden /> {t("title")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </motion.header>

      {/* mode */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        aria-label={t("modePractice")}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {(Object.keys(MODE_META) as SessionMode[]).map((m) => {
            const meta = MODE_META[m];
            const Icon = meta.icon;
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  active
                    ? "border-primary/50 bg-primary/8 ring-glow"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <span className="font-display text-base font-semibold">
                    {m === "practice" ? t("modePractice") : t("modeMock")}
                  </span>
                  {active && (
                    <CheckCircle2
                      className="ml-auto size-4 text-primary"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(meta.descKey as "modePracticeDesc")}
                </p>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* topics */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display flex items-center gap-2 text-lg font-semibold">
            <Target className="size-4 text-violet" aria-hidden />
            {t("chooseTopics")}
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selected.length} selected · {poolSize} {tc("questions")}
            </Badge>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() =>
                setSelected((prev) =>
                  prev.length === topics.length
                    ? []
                    : topics.map((tp) => tp.slug)
                )
              }
            >
              <Dices aria-hidden />
              {selected.length === topics.length ? tc("all") : "Select all"}
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const checked = selected.includes(topic.slug);
            return (
              <label
                key={topic.slug}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors",
                  checked
                    ? "border-primary/45 bg-primary/8"
                    : "border-border bg-card hover:border-primary/25"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleTopic(topic.slug)}
                  className="mt-0.5"
                  aria-label={topic.title[locale]}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {topic.title[locale]}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {topic.questionCount} {tc("questions")}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {selected.length === 0 && (
          <p className="mt-3 text-sm text-warning">{t("emptySelection")}</p>
        )}
      </motion.section>

      {/* count + start */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 ring-glow sm:p-8"
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full bg-primary/20 blur-[70px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <label
              htmlFor="practice-count"
              className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase"
            >
              {t("questionCount")}
            </label>
            <div className="mt-2">
              <Select
                value={String(count)}
                onValueChange={(v) => setCount(Number(v))}
              >
                <SelectTrigger
                  id="practice-count"
                  size="sm"
                  className="h-9 min-w-28"
                  aria-label={t("questionCount")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNT_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {poolSize > 0
                ? `Available: ${Math.min(poolSize, 100)} in selection`
                : "Pick at least one topic"}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:items-end">
            <Button
              size="lg"
              className="h-12 px-8 text-base"
              disabled={disabled}
              onClick={handleStart}
            >
              {mode === "mock" ? <Timer aria-hidden /> : <Play aria-hidden />}
              {mode === "mock" ? t("startMock") : t("startPractice")}
            </Button>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shuffle className="size-3.5" aria-hidden />
              {mode === "practice"
                ? "Instant feedback · no timer"
                : "Timed · auto-submit · scored"}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
