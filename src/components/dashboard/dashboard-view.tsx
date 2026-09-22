"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight,
  Award,
  Bookmark,
  CalendarCheck,
  Crown,
  Flame,
  Loader2,
  Share2,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState, Panel } from "@/components/dashboard/panel";
import { TrendChart } from "@/components/dashboard/trend-chart";
import {
  accuracyTone,
  longDate,
  shortDate,
} from "@/components/dashboard/utils";
import { getMCQ } from "@/lib/data/mcqs";
import { getTopic } from "@/lib/data/topics";
import type { MCQ } from "@/lib/types";
import {
  getWeakTopics,
  useProgressStore,
  XP_PER_LEVEL,
} from "@/stores/progress-store";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const emptySubscribe = () => () => {};

/** True only after hydration — keeps persisted store reads SSR-safe. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function DashboardView({
  user,
}: {
  user: { name: string; email: string };
}) {
  const t = useTranslations();
  const locale = useLocale();
  useHydrateProgress();

  const mounted = useMounted();
  const [sharing, setSharing] = useState(false);
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.streak);
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const attempts = useProgressStore((s) => s.attempts);
  const topicStats = useProgressStore((s) => s.topicStats);
  const level = useProgressStore((s) => s.level());
  const levelProgress = useProgressStore((s) => s.levelProgress());

  if (!mounted) return <DashboardSkeleton />;

  const remainingXp = XP_PER_LEVEL - (xp % XP_PER_LEVEL);
  const weakTopics = getWeakTopics(topicStats, 4);
  const savedQuestions = bookmarks
    .slice(0, 4)
    .map((id) => getMCQ(id))
    .filter((q): q is MCQ => Boolean(q));
  const recent = attempts.slice(0, 6);

  const shareProgress = async () => {
    setSharing(true);
    const text = `${user.name} is prepping for BD govt IT job exams — ${streak}-day streak, ${xp} XP, level ${level} on IT Job Prep BD.`;
    try {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({
            title: "IT Job Prep BD",
            text,
            url: `${window.location.origin}/dashboard`,
          });
          return;
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") return;
        }
      }
      await navigator.clipboard.writeText(
        `${text} ${window.location.origin}/dashboard`
      );
      toast.success(t("common.copied"));
    } catch {
      toast.error("Couldn't share — please try again.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <motion.header
        variants={item}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t("dashboard.overview")}
          </p>
          <h1 className="font-display mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("dashboard.welcome")},{" "}
            <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarCheck className="size-3.5" />
            {longDate(new Date(), locale)}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={shareProgress}
          disabled={sharing}
        >
          {sharing ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Share2 className="size-3.5" />
          )}
          {t("dashboard.shareProfile")}
        </Button>
      </motion.header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <motion.div
          variants={item}
          className="card-hover rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-warning/15 text-warning">
              <Flame className="size-5 animate-streak-flame" />
            </span>
            <Badge
              variant="outline"
              className="border-warning/35 bg-warning/10 text-[10px] text-warning uppercase"
            >
              {t("common.streak")}
            </Badge>
          </div>
          <p className="font-display mt-3 text-3xl font-bold">
            {streak}
            <span className="ml-1.5 text-sm font-medium text-muted-foreground">
              {t("common.days")}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("dashboard.streakTitle")}
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="card-hover rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-violet/15 text-violet">
              <TrendingUp className="size-5" />
            </span>
            <Badge
              variant="outline"
              className="border-violet/35 bg-violet/10 text-[10px] text-violet uppercase"
            >
              {t("common.xp")}
            </Badge>
          </div>
          <p className="font-display mt-3 text-3xl font-bold">
            {t("common.level")} {level}
            <span className="ml-2 align-middle font-sans text-xs font-medium text-muted-foreground">
              {xp} XP
            </span>
          </p>
          <Progress value={Math.round(levelProgress * 100)} className="mt-2 h-1.5" />
          <p className="mt-1.5 text-xs text-muted-foreground">
            {remainingXp} XP · {t("dashboard.levelUp")}
          </p>
        </motion.div>

        <motion.div variants={item}>
          <Link
            href="/saved"
            className="card-hover group block h-full rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <Bookmark className="size-5" />
              </span>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="font-display mt-3 text-3xl font-bold">
              {bookmarks.length}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {t("nav.saved")}
            </p>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="card-hover rounded-2xl border border-border/70 bg-card p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-lime/15 text-lime-foreground">
              <Target className="size-5" />
            </span>
            <Badge
              variant="outline"
              className="border-border text-[10px] text-muted-foreground uppercase"
            >
              {t("dashboard.activityTitle")}
            </Badge>
          </div>
          <p className="font-display mt-3 text-3xl font-bold">
            {attempts.length}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Total attempts
          </p>
        </motion.div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Panel
            title={t("dashboard.trendTitle")}
            subtitle={t("dashboard.trendSubtitle")}
            className="h-full"
          >
            {recent.length > 0 ? (
              <TrendChart attempts={attempts} locale={locale} />
            ) : (
              <EmptyState
                icon={TrendingUp}
                message={t("dashboard.noAttempts")}
                actionHref="/practice"
                actionLabel={t("dashboard.openPractice")}
              />
            )}
          </Panel>
        </motion.div>

        <motion.div variants={item}>
          <Panel
            title={t("dashboard.weakTitle")}
            subtitle={t("dashboard.weakSubtitle")}
            className="h-full"
          >
            {weakTopics.length > 0 ? (
              <ul className="grid gap-4">
                {weakTopics.map((w) => {
                  const topic = getTopic(w.slug);
                  const title = topic
                    ? locale === "bn"
                      ? topic.title.bn
                      : topic.title.en
                    : w.slug;
                  return (
                    <li key={w.slug}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-2">
                        <span className="truncate text-sm font-medium">
                          {title}
                        </span>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {w.accuracy}% · {w.attempted}{" "}
                          {t("common.attempted")}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-[width] duration-700"
                          style={{
                            width: `${Math.max(w.accuracy, 3)}%`,
                            backgroundImage:
                              "linear-gradient(90deg, var(--danger), var(--success))",
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState
                icon={Target}
                message="Answer 3+ questions per topic and your weak spots show up here."
                actionHref="/practice"
                actionLabel={t("dashboard.revisionCta")}
              />
            )}
          </Panel>
        </motion.div>
      </div>

      <motion.div variants={item} className="mt-5">
        <Panel
          title={t("dashboard.savedTitle")}
          subtitle={t("dashboard.savedSubtitle")}
          action={
            bookmarks.length > 0 ? (
              <Button asChild variant="ghost" size="sm">
                <Link href="/saved">
                  {t("common.seeAll")}
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            ) : undefined
          }
        >
          {savedQuestions.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {savedQuestions.map((q) => {
                const topic = getTopic(q.topic);
                return (
                  <Link
                    key={q.id}
                    href="/saved"
                    className="group rounded-xl border border-border/70 bg-surface/60 p-3.5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <Badge
                      variant="secondary"
                      className="mb-2 max-w-full truncate"
                    >
                      {topic
                        ? locale === "bn"
                          ? topic.title.bn
                          : topic.title.en
                        : q.topic}
                    </Badge>
                    <p className="line-clamp-2 text-sm leading-snug font-medium">
                      {locale === "bn" ? q.question.bn : q.question.en}
                    </p>
                    <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      {t("common.bookmarked")}
                      <ArrowRight className="size-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Bookmark}
              message={t("dashboard.emptySaved")}
              actionHref="/practice"
              actionLabel={t("dashboard.openPractice")}
            />
          )}
        </Panel>
      </motion.div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          <Panel
            title={t("dashboard.recentAttempts")}
            subtitle={t("dashboard.activityTitle")}
            className="h-full"
          >
            {recent.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session</TableHead>
                    <TableHead className="text-right">
                      {t("common.score")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("common.accuracy")}
                    </TableHead>
                    <TableHead className="text-right">
                      {t("common.xp")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="whitespace-normal">
                        <span className="block font-medium">{a.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          {shortDate(a.date, locale) || a.date}
                        </span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {a.score}/{a.total}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={cn(
                            "tabular-nums",
                            accuracyTone(a.accuracy)
                          )}
                        >
                          {a.accuracy}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-lime-foreground tabular-nums">
                        +{a.xpEarned}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={Award}
                message={t("dashboard.noAttempts")}
                actionHref="/practice"
                actionLabel={t("dashboard.openPractice")}
              />
            )}
          </Panel>
        </motion.div>

        <motion.div variants={item}>
          <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-brand p-6 text-white shadow-[0_24px_64px_-28px_var(--glow)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-white/15 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-8 size-40 rounded-full bg-lime/25 blur-2xl"
            />

            <div className="relative flex items-start justify-between gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-white/15">
                <Crown className="size-5" />
              </span>
              <Badge className="border-transparent bg-white/20 text-white hover:bg-white/25">
                {t("subscription.proName")}
              </Badge>
            </div>

            <h3 className="font-display relative mt-4 text-xl font-bold">
              {t("dashboard.subscriptionTitle")}
            </h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-white/85">
              {t("dashboard.upgradeDesc")}
            </p>

            <Button
              asChild
              size="lg"
              className="relative mt-5 w-full rounded-xl bg-white text-foreground hover:bg-white/90"
            >
              <Link href="/pricing">
                {t("dashboard.upgradeCta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2.5">
          <Skeleton className="h-3.5 w-32" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-44" />
        </div>
        <Skeleton className="h-8 w-36" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>

      <Skeleton className="mt-5 h-52 rounded-2xl" />

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Skeleton className="h-72 rounded-2xl lg:col-span-2" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    </div>
  );
}
