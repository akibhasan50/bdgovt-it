"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  ArrowRight,
  Bookmark,
  BookmarkX,
  Check,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getMCQ } from "@/lib/data/mcqs";
import { getTopic } from "@/lib/data/topics";
import type { MCQ } from "@/lib/types";
import { useProgressStore } from "@/stores/progress-store";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { cn } from "@/lib/utils";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

const emptySubscribe = () => () => {};

/** True only after hydration — keeps persisted store reads SSR-safe. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const difficultyTone: Record<string, string> = {
  easy: "border-success/35 bg-success/10 text-success",
  medium: "border-warning/35 bg-warning/10 text-warning",
  hard: "border-danger/35 bg-danger/10 text-danger",
};

export function SavedView() {
  const t = useTranslations();
  const locale = useLocale();
  useHydrateProgress();

  const mounted = useMounted();
  const [query, setQuery] = useState("");
  const bookmarks = useProgressStore((s) => s.bookmarks);
  const toggleBookmark = useProgressStore((s) => s.toggleBookmark);

  if (!mounted) return <SavedSkeleton />;
  const questions = bookmarks
    .slice(0, 50)
    .map((id) => getMCQ(id))
    .filter((q): q is MCQ => Boolean(q));

  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? questions.filter((q) =>
        [
          q.question.en,
          q.question.bn,
          q.source ?? "",
          ...q.options.map((o) => o.en),
          ...q.options.map((o) => o.bn),
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      )
    : questions;

  const removeBookmark = (id: string) => {
    toggleBookmark(id);
    toast.success("Removed from your revision list.");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t("nav.saved")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("dashboard.savedSubtitle")}
          </p>
        </div>
        <Badge variant="secondary" className="h-6 px-2.5 text-xs">
          {bookmarks.length} {t("common.questions")}
        </Badge>
      </div>

      {questions.length > 0 ? (
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("common.searchPlaceholder")}
            aria-label={t("common.search")}
            className="h-10 rounded-xl pl-9 pr-9"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("common.close")}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6">
        {questions.length === 0 ? (
          <Card className="rounded-2xl border border-dashed border-border/80">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Bookmark className="size-5" />
              </span>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("dashboard.emptySaved")}
              </p>
              <Button asChild size="sm">
                <Link href="/practice">
                  {t("dashboard.openPractice")}
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/80 bg-surface/40 px-6 py-10 text-center text-sm text-muted-foreground">
            {t("common.noResults")}
          </p>
        ) : (
          <ul className="grid gap-4">
            {filtered.map((q) => {
              const topic = getTopic(q.topic);
              return (
                <li key={q.id}>
                  <Card className="card-hover rounded-2xl border border-border/70">
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">
                          {topic
                            ? locale === "bn"
                              ? topic.title.bn
                              : topic.title.en
                            : q.topic}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={difficultyTone[q.difficulty]}
                        >
                          {q.difficulty}
                        </Badge>
                        {q.source ? (
                          <Badge variant="outline" className="text-muted-foreground">
                            {q.source}
                          </Badge>
                        ) : null}
                      </div>
                      <CardTitle className="pt-1 text-base leading-relaxed">
                        {locale === "bn" ? q.question.bn : q.question.en}
                      </CardTitle>
                      <CardAction>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={t("common.bookmarked")}
                          title={t("common.bookmark")}
                          onClick={() => removeBookmark(q.id)}
                        >
                          <BookmarkX className="size-4 text-primary" />
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid gap-2">
                        {q.options.map((opt, i) => {
                          const correct = i === q.answer;
                          return (
                            <li
                              key={i}
                              className={cn(
                                "flex items-start gap-2.5 rounded-xl border px-3 py-2 text-sm",
                                correct
                                  ? "border-success/40 bg-success/10 font-medium text-success"
                                  : "border-border/60 bg-surface/40 text-muted-foreground"
                              )}
                            >
                              <span
                                className={cn(
                                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md text-[11px] font-bold",
                                  correct
                                    ? "bg-success/20 text-success"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                {correct ? (
                                  <Check className="size-3" />
                                ) : (
                                  OPTION_LETTERS[i]
                                )}
                              </span>
                              <span>{locale === "bn" ? opt.bn : opt.en}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <details className="group mt-3 rounded-xl border border-border/60 bg-surface/50 px-3.5 py-2.5">
                        <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          {t("common.explanation")}
                          <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {locale === "bn"
                            ? q.explanation.bn
                            : q.explanation.en}
                        </p>
                      </details>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function SavedSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2.5">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="mt-6 h-10 rounded-xl" />
      <div className="mt-6 grid gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
