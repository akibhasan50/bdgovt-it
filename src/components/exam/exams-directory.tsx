"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarClock,
  ClipboardList,
  Clock,
  Flame,
  ListChecks,
  Minus,
  PlayCircle,
  Target,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getExamsByStatus } from "@/lib/data/exams";
import type { Exam } from "@/lib/types";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { useProgressStore } from "@/stores/progress-store";
import {
  AvatarStack,
  LiveDot,
  ReminderButton,
  formatExamDate,
  useMounted,
} from "@/components/exam/shared";

function MetaChip({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      {children}
    </span>
  );
}

function LiveExamCard({ exam, locale }: { exam: Exam; locale: string }) {
  const t = useTranslations("exam");
  const tc = useTranslations("common");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="card-hover relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 ring-glow sm:p-8"
    >
      <div className="pointer-events-none absolute -top-14 -right-14 size-48 rounded-full bg-primary/20 blur-[70px]" />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-danger/40 bg-danger/10 font-bold tracking-wider text-danger">
            <LiveDot aria-hidden />
            {tc("live")}
          </Badge>
          <Badge variant="outline" className="text-cyan">
            {exam.organization[locale as "bn" | "en"]}
          </Badge>
          <Badge
            variant="outline"
            className="border-lime/40 bg-lime/10 text-lime"
          >
            <Zap aria-hidden /> +6 {tc("xp")} / correct
          </Badge>
        </div>

        <h3 className="font-display mt-4 text-2xl leading-tight font-bold sm:text-3xl">
          {exam.title[locale as "bn" | "en"]}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {exam.description[locale as "bn" | "en"]}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <MetaChip icon={Timer}>
            {exam.durationMin} {tc("time").toLowerCase()}
          </MetaChip>
          <MetaChip icon={Target}>
            {exam.totalMarks} {tc("score").toLowerCase()}
          </MetaChip>
          <MetaChip icon={Minus}>
            {t("negativeMark")} −{exam.negativeMark}
          </MetaChip>
          <MetaChip icon={ListChecks}>
            {exam.questionIds.length} {tc("questions")}
          </MetaChip>
          {exam.participants != null && (
            <MetaChip icon={Users}>
              {exam.participants.toLocaleString(locale)} {t("participants")}
            </MetaChip>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <AvatarStack
            seed={exam.id}
            count={exam.participants}
            locale={locale}
          />
          <Button asChild size="lg" className="h-11 px-6 text-base">
            <Link href={`/exams/${exam.id}`}>
              <PlayCircle aria-hidden />
              {t("joinLive")}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function UpcomingCard({ exam, locale }: { exam: Exam; locale: string }) {
  const tc = useTranslations("common");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-hover flex flex-col rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge
          variant="outline"
          className="border-warning/40 bg-warning/10 text-warning"
        >
          <CalendarClock aria-hidden />
          {formatExamDate(exam.startsAt, locale)}
        </Badge>
        <Badge variant="secondary" className="shrink-0">
          {tc("upcoming")}
        </Badge>
      </div>

      <h3 className="font-display mt-3 text-lg leading-snug font-semibold">
        {exam.title[locale as "bn" | "en"]}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-cyan">
        {exam.organization[locale as "bn" | "en"]}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {exam.description[locale as "bn" | "en"]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <MetaChip icon={Clock}>{exam.durationMin} min</MetaChip>
        <MetaChip icon={Target}>
          {exam.totalMarks} {tc("score").toLowerCase()}
        </MetaChip>
        <MetaChip icon={Minus}>−{exam.negativeMark}</MetaChip>
        <MetaChip icon={ClipboardList}>
          {exam.questionIds.length} {tc("questions")}
        </MetaChip>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/60 pt-4">
        <ReminderButton examId={exam.id} />
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <Link href={`/exams/${exam.id}`}>
            View
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

function PastCard({ exam, locale }: { exam: Exam; locale: string }) {
  const t = useTranslations("exam");
  const tc = useTranslations("common");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="card-hover flex flex-col rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge variant="outline" className="text-muted-foreground">
          <CalendarClock aria-hidden />
          {formatExamDate(exam.startsAt, locale)}
        </Badge>
        <Badge variant="outline" className="border-lime/40 text-lime">
          <Trophy aria-hidden />
          {tc("past")}
        </Badge>
      </div>

      <h3 className="font-display mt-3 text-lg leading-snug font-semibold">
        {exam.title[locale as "bn" | "en"]}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-cyan">
        {exam.organization[locale as "bn" | "en"]}
      </p>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {exam.description[locale as "bn" | "en"]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {exam.participants != null && (
          <MetaChip icon={Users}>
            {exam.participants.toLocaleString(locale)} {t("participants")}
          </MetaChip>
        )}
        <MetaChip icon={Timer}>{exam.durationMin} min</MetaChip>
        <MetaChip icon={Target}>
          {exam.totalMarks} {tc("score").toLowerCase()}
        </MetaChip>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
        <Button asChild size="sm" className="h-8">
          <Link href={`/exams/${exam.id}/result`}>
            <Trophy aria-hidden />
            {t("viewResult")}
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={`/exams/${exam.id}`}>
            Retake
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

export function ExamsDirectory() {
  const t = useTranslations("exam");
  const tc = useTranslations("common");
  const locale = useLocale();
  useHydrateProgress();
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.streak);
  const mounted = useMounted();

  const live = getExamsByStatus("live");
  const upcoming = getExamsByStatus("upcoming");
  const past = getExamsByStatus("past");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-violet/20 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 size-64 rounded-full bg-cyan/10 blur-[90px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Badge className="border-primary/30 bg-primary/10 text-primary">
              <Trophy aria-hidden />
              Timed mocks, real cut-offs
            </Badge>
            <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              <span className="text-gradient">{t("title")}</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t("subtitle")}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="h-7 gap-1.5 px-3 text-xs"
              >
                <Zap className="size-3.5 text-lime" aria-hidden />
                {mounted ? xp.toLocaleString(locale) : "—"} {tc("xp")}
              </Badge>
              <Badge
                variant="secondary"
                className="h-7 gap-1.5 px-3 text-xs"
              >
                <Flame className="size-3.5 animate-streak-flame text-warning" aria-hidden />
                {tc("streak")}: {mounted ? streak : 0}
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* ── Happening now ──────────────────────────────── */}
        {live.length > 0 && (
          <section className="mt-4">
            <div className="mb-4 flex items-center gap-3">
              <Badge className="border-danger/40 bg-danger/10 font-bold tracking-wider text-danger">
                <LiveDot aria-hidden />
                {tc("live")}
              </Badge>
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                {t("liveNow")}
              </h2>
            </div>
            <div className="grid gap-4">
              {live.map((exam) => (
                <LiveExamCard key={exam.id} exam={exam} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* ── Upcoming / Past tabs ───────────────────────── */}
        <section className="mt-10">
          <Tabs defaultValue="upcoming">
            <TabsList className="h-10 w-full sm:w-auto">
              <TabsTrigger value="upcoming" className="flex-1 px-4 sm:flex-none">
                {t("upcomingExams")}
                <span className="ml-1 text-xs text-muted-foreground">
                  {upcoming.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex-1 px-4 sm:flex-none">
                {t("pastExams")}
                <span className="ml-1 text-xs text-muted-foreground">
                  {past.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-5">
              {upcoming.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  Nothing scheduled right now — check back soon.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {upcoming.map((exam) => (
                    <UpcomingCard
                      key={exam.id}
                      exam={exam}
                      locale={locale}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="mt-5">
              {past.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  {t("archive")} is empty — finish a mock to fill it up.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {past.map((exam) => (
                    <PastCard key={exam.id} exam={exam} locale={locale} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
}
