"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  ListChecks,
  Minus,
  Play,
  RefreshCw,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMCQsByIds } from "@/lib/data/mcqs";
import type { Exam } from "@/lib/types";
import { usePracticeStore } from "@/stores/practice-store";
import {
  LiveDot,
  ReminderButton,
  formatExamDate,
} from "@/components/exam/shared";

function MetaCell({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/50 p-4">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </span>
      <p className="font-display mt-1.5 text-xl font-bold text-foreground">
        {value}
      </p>
    </div>
  );
}

export function ExamIntro({ exam }: { exam: Exam }) {
  const t = useTranslations("exam");
  const tc = useTranslations("common");
  const locale = useLocale() as "bn" | "en";
  const router = useRouter();
  const startSession = usePracticeStore((s) => s.startSession);

  const rules = (t.raw("rules") ?? []) as string[];
  const isUpcoming = exam.status === "upcoming";
  const isPast = exam.status === "past";

  function handleStart() {
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* status + org */}
        <div className="flex flex-wrap items-center gap-2">
          {exam.status === "live" && (
            <Badge className="border-danger/40 bg-danger/10 font-bold tracking-wider text-danger">
              <LiveDot aria-hidden />
              {tc("live")}
            </Badge>
          )}
          {isUpcoming && (
            <Badge className="border-warning/40 bg-warning/10 text-warning">
              <CalendarClock aria-hidden />
              {tc("upcoming")}
            </Badge>
          )}
          {isPast && (
            <Badge variant="secondary">
              <Trophy aria-hidden />
              {tc("past")}
            </Badge>
          )}
          <Badge variant="outline" className="text-cyan">
            {exam.organization[locale]}
          </Badge>
          <Badge variant="outline" className="border-lime/40 bg-lime/10 text-lime">
            <Zap aria-hidden /> +6 {tc("xp")} / correct
          </Badge>
        </div>

        <h1 className="font-display mt-4 text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl">
          {exam.title[locale]}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {exam.description[locale]}
        </p>

        {/* meta grid */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <MetaCell
            icon={Clock}
            label={t("duration")}
            value={`${exam.durationMin} min`}
          />
          <MetaCell
            icon={Target}
            label={t("totalMarks")}
            value={String(exam.totalMarks)}
          />
          <MetaCell
            icon={Minus}
            label={t("negativeMark")}
            value={exam.negativeMark > 0 ? `−${exam.negativeMark}` : "0"}
          />
          <MetaCell
            icon={ListChecks}
            label={tc("questions")}
            value={String(exam.questionIds.length)}
          />
          <MetaCell
            icon={Users}
            label={t("participants")}
            value={
              exam.participants != null
                ? exam.participants.toLocaleString(locale)
                : "—"
            }
          />
        </div>
      </motion.div>

      {/* rules */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-10"
      >
        <h2 className="font-display flex items-center gap-2 text-xl font-bold tracking-tight">
          <CheckCircle2 className="size-5 text-success" aria-hidden />
          {t("rulesTitle")}
        </h2>
        <ol className="mt-4 space-y-3">
          {rules.map((rule, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </motion.section>

      {/* ready / actions */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.18 }}
        className="relative mt-8 overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 text-center ring-glow sm:p-8"
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full bg-primary/20 blur-[70px]" />

        <div className="relative">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {t("readyTitle")}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {t("readySubtitle")}
          </p>

          {exam.status === "live" && (
            <>
              <Button
                size="lg"
                className="mt-6 h-12 px-8 text-base"
                onClick={handleStart}
              >
                <Play aria-hidden />
                {t("joinLive")}
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                {exam.durationMin} min · {exam.totalMarks} marks ·{" "}
                {t("negativeMark")} −{exam.negativeMark}
              </p>
            </>
          )}

          {isUpcoming && (
            <>
              <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-warning">
                <CalendarClock className="size-4" aria-hidden />
                {formatExamDate(exam.startsAt, locale)}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" disabled className="h-12 px-8 text-base">
                  <Play aria-hidden />
                  {t("startExam")}
                </Button>
                <ReminderButton examId={exam.id} />
              </div>
            </>
          )}

          {isPast && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href={`/exams/${exam.id}/result`}>
                  <Trophy aria-hidden />
                  {t("viewResult")}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                onClick={handleStart}
              >
                <RefreshCw aria-hidden />
                Retake
              </Button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
