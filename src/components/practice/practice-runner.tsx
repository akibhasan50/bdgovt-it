"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Flag,
  Grid3x3,
  Minus,
  Timer,
  Trophy,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { difficultyStyles } from "@/components/content/accents";
import { getTopic } from "@/lib/data/topics";
import { usePracticeStore } from "@/stores/practice-store";
import {
  useProgressStore,
  type AttemptSummary,
} from "@/stores/progress-store";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { formatDurationSec } from "@/components/exam/shared";
import { cn } from "@/lib/utils";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatClock(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${pad(m)}:${pad(s)}`;
}

export function PracticeRunner() {
  const t = useTranslations("practice");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";
  const router = useRouter();

  const status = usePracticeStore((s) => s.status);
  const mode = usePracticeStore((s) => s.mode);
  const title = usePracticeStore((s) => s.title);
  const examId = usePracticeStore((s) => s.examId);
  const questions = usePracticeStore((s) => s.questions);
  const currentIndex = usePracticeStore((s) => s.currentIndex);
  const answers = usePracticeStore((s) => s.answers);
  const flagged = usePracticeStore((s) => s.flagged);
  const revealed = usePracticeStore((s) => s.revealed);
  const timeLeftSec = usePracticeStore((s) => s.timeLeftSec);
  const timeLimitSec = usePracticeStore((s) => s.timeLimitSec);
  const answer = usePracticeStore((s) => s.answer);
  const clearAnswer = usePracticeStore((s) => s.clearAnswer);
  const toggleFlag = usePracticeStore((s) => s.toggleFlag);
  const goTo = usePracticeStore((s) => s.goTo);
  const next = usePracticeStore((s) => s.next);
  const prev = usePracticeStore((s) => s.prev);
  const tick = usePracticeStore((s) => s.tick);
  const finish = usePracticeStore((s) => s.finish);
  const reset = usePracticeStore((s) => s.reset);

  useHydrateProgress();
  const recordAttempt = useProgressStore((s) => s.recordAttempt);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const touchStreak = useProgressStore((s) => s.touchStreak);
  const recordedRef = useRef(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [autoSubmit, setAutoSubmit] = useState(false);

  useEffect(() => {
    if (status === "idle") router.replace("/practice");
  }, [status, router]);

  useEffect(() => {
    if (status !== "running" || timeLimitSec === null) return;
    const id = setInterval(() => tick(1), 1000);
    return () => clearInterval(id);
  }, [status, timeLimitSec, tick]);

  const q = questions[currentIndex];
  const chosen = q ? answers[q.id] : undefined;
  const isFlagged = q ? flagged.includes(q.id) : false;
  const isRevealed = q ? Boolean(revealed[q.id]) : false;
  const showFeedback = mode === "practice" && isRevealed;

  const answeredCount = useMemo(
    () => questions.filter((qq) => answers[qq.id] != null).length,
    [questions, answers]
  );

  useEffect(() => {
    if (status !== "finished" || recordedRef.current) return;
    recordedRef.current = true;
    const result = finish(false);
    if (!result) return;

    const topicAccuracies: AttemptSummary["topicAccuracies"] = {};
    for (const pq of result.perQuestion) {
      const mq = questions.find((qq) => qq.id === pq.id);
      if (!mq) continue;
      const slot = (topicAccuracies[mq.topic] ??= { correct: 0, total: 0 });
      slot.total += 1;
      if (pq.chosen !== null && pq.chosen === pq.correct) slot.correct += 1;
      recordAnswer(mq.topic, pq.chosen !== null && pq.chosen === pq.correct);
    }

    const attemptId = `${examId ? examId + "-" : "practice-"}${Date.now()}`;
    recordAttempt({
      id: attemptId,
      title: result.title || title,
      date: new Date().toISOString(),
      score: result.score,
      total: result.total,
      accuracy: result.accuracy,
      timeTakenSec: result.timeTakenSec,
      xpEarned: result.xpEarned,
      topicAccuracies,
    });
    touchStreak();
  }, [
    status,
    finish,
    questions,
    recordAttempt,
    recordAnswer,
    touchStreak,
    examId,
    title,
  ]);

  function handleFinish(auto = false) {
    setConfirmOpen(false);
    if (auto) setAutoSubmit(true);
    finish(auto);
  }

  if (status === "idle" || !q) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-4">
        <p className="text-sm text-muted-foreground">{tc("loading")}</p>
      </div>
    );
  }

  if (status === "finished") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-center ring-glow">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full bg-lime/30 blur-[70px]" />
          <Trophy className="relative mx-auto size-10 text-white" aria-hidden />
          <h1 className="font-display relative mt-3 text-3xl font-bold text-white">
            {t("sessionSummary")}
          </h1>
          <p className="relative mt-1 text-sm text-white/80">
            {autoSubmit ? tc("autoSubmitted") : title}
          </p>
          <Button
            className="relative mt-6 h-11 px-8"
            onClick={() => {
              reset();
              router.push(examId ? `/exams/${examId}/result` : "/practice");
            }}
          >
            {examId ? (
              <>
                <Trophy aria-hidden /> {tc("results")}
              </>
            ) : (
              <>
                {tc("continue")} <ArrowRight aria-hidden />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  const topicLabel = getTopic(q.topic)?.title[locale] ?? q.topic;
  const lowTime = timeLimitSec !== null && timeLeftSec <= 60;
  const pct = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8">
      {/* top bar */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge variant="outline" className="text-violet">
          {mode === "mock" ? t("modeMock") : t("modePractice")}
        </Badge>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground">
          {title}
        </span>
        {timeLimitSec !== null && (
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-bold tabular-nums",
              lowTime
                ? "border-danger/40 bg-danger/10 text-danger"
                : "border-border bg-card text-foreground"
            )}
            aria-live="polite"
          >
            <Timer className="size-3.5" aria-hidden />
            {formatClock(timeLeftSec)}
          </span>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setConfirmOpen(true)}
        >
          {t("finishSession")}
        </Button>
      </div>

      {/* progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {t("sessionProgress")}: {currentIndex + 1} / {questions.length}
          </span>
          <span>
            {answeredCount}/{questions.length} {tc("answered")}
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        {/* question card */}
        <article className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              {topicLabel}
            </Badge>
            <Badge
              variant="outline"
              className={cn("uppercase", difficultyStyles[q.difficulty])}
            >
              {q.difficulty}
            </Badge>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="ml-auto"
              aria-pressed={isFlagged}
              aria-label={t("markForReview")}
              onClick={() => toggleFlag(q.id)}
            >
              <Flag
                className={cn(
                  "size-4",
                  isFlagged ? "text-warning" : "text-muted-foreground"
                )}
                fill={isFlagged ? "currentColor" : "none"}
              />
            </Button>
          </div>

          <p className="font-display mt-4 text-base leading-relaxed font-semibold sm:text-lg">
            {q.question[locale]}
          </p>

          <div
            className="mt-5 grid gap-2"
            role="radiogroup"
            aria-label={tc("question")}
          >
            {q.options.map((opt, i) => {
              const picked = chosen === i;
              const correct = showFeedback && i === q.answer;
              const wrongPick = showFeedback && picked && i !== q.answer;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={picked}
                  disabled={showFeedback}
                  onClick={() => answer(q.id, i, mode === "practice")}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    correct
                      ? "border-success/50 bg-success/10"
                      : wrongPick
                        ? "border-danger/50 bg-danger/10"
                        : picked
                          ? "border-primary/50 bg-primary/8"
                          : "border-border bg-background/40 hover:border-primary/30",
                    showFeedback && "cursor-default"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border text-[11px] font-bold",
                      correct
                        ? "border-success/50 bg-success/20 text-success"
                        : wrongPick
                          ? "border-danger/50 bg-danger/20 text-danger"
                          : picked
                            ? "border-primary/50 bg-primary/15 text-primary"
                            : "border-border text-muted-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-snug">{opt[locale]}</span>
                  {correct && (
                    <Check className="ml-auto mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  )}
                  {wrongPick && (
                    <X className="ml-auto mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div
              className={cn(
                "mt-4 rounded-xl border p-4",
                chosen === q.answer
                  ? "border-success/40 bg-success/8"
                  : chosen == null
                    ? "border-warning/40 bg-warning/8"
                    : "border-danger/40 bg-danger/8"
              )}
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                {chosen === q.answer ? (
                  <>
                    <Check className="size-4 text-success" aria-hidden />
                    <span className="text-success">{tc("correct")}</span>
                  </>
                ) : chosen == null ? (
                  <>
                    <Minus className="size-4 text-warning" aria-hidden />
                    <span className="text-warning">{tc("skipped")}</span>
                  </>
                ) : (
                  <>
                    <X className="size-4 text-danger" aria-hidden />
                    <span className="text-danger">{tc("wrong")}</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("correctAnswer")}:{" "}
                <span className="font-semibold text-foreground">
                  {String.fromCharCode(65 + q.answer)}.{" "}
                  {q.options[q.answer]?.[locale]}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {q.explanation[locale]}
              </p>
            </div>
          )}

          {/* nav */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={prev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft aria-hidden /> {tc("prev")}
            </Button>
            {mode === "practice" && !showFeedback && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => clearAnswer(q.id)}
                disabled={chosen == null}
              >
                {t("skipQuestion")}
              </Button>
            )}
            <div className="ml-auto flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => toggleFlag(q.id)}
              >
                <Flag aria-hidden />
                {t("markForReview")}
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  if (currentIndex >= questions.length - 1) setConfirmOpen(true);
                  else next();
                }}
              >
                {currentIndex >= questions.length - 1
                  ? t("finishSession")
                  : t("nextQuestion")}{" "}
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </article>

        {/* navigator */}
        <aside className="rounded-2xl border border-border bg-card p-4">
          <h2 className="font-display flex items-center gap-2 text-sm font-semibold">
            <Grid3x3 className="size-4 text-cyan" aria-hidden />
            {t("questionNav")}
          </h2>
          <div className="mt-3 grid grid-cols-6 gap-1.5 lg:grid-cols-5">
            {questions.map((qq, i) => {
              const ans = answers[qq.id];
              const active = i === currentIndex;
              const isF = flagged.includes(qq.id);
              return (
                <button
                  key={qq.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Q${i + 1}`}
                  aria-current={active}
                  className={cn(
                    "grid aspect-square place-items-center rounded-lg border text-[11px] font-bold transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : ans != null
                        ? "border-success/40 bg-success/15 text-success"
                        : "border-border bg-background/50 text-muted-foreground hover:border-primary/40",
                    isF && "ring-1 ring-warning"
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <dl className="mt-4 space-y-1.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded bg-success/40" /> {tc("answered")}
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded bg-border" />{" "}
              {tc("unanswered")}
            </div>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded ring-1 ring-warning" />{" "}
              {t("markForReview")}
            </div>
          </dl>
        </aside>
      </div>

      {/* mobile prev/next FABs */}
      <div className="sticky bottom-4 z-10 flex justify-between gap-2 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={prev}
          disabled={currentIndex === 0}
          aria-label={tc("prev")}
        >
          <ArrowLeft aria-hidden />
        </Button>
        <Button
          type="button"
          size="icon"
          onClick={() => {
            if (currentIndex >= questions.length - 1) setConfirmOpen(true);
            else next();
          }}
          aria-label={tc("next")}
        >
          <ArrowRight aria-hidden />
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("finishSession")}</DialogTitle>
            <DialogDescription>{t("confirmFinish")}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {answeredCount}/{questions.length} {tc("answered")} ·{" "}
            {questions.length - answeredCount} {tc("unanswered")}
          </p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setConfirmOpen(false)}>
              {tc("cancel")}
            </Button>
            <Button type="button" onClick={() => handleFinish(false)}>
              {tc("finish")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* keep formatDurationSec referenced for consistent time display elsewhere */}
      <span className="sr-only">{formatDurationSec(timeLeftSec)}</span>
    </div>
  );
}
