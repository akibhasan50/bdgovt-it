"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { difficultyStyles } from "@/components/content/accents";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import type { MCQ } from "@/lib/types";
import { useProgressStore } from "@/stores/progress-store";
import { cn } from "@/lib/utils";

function McqRow({ q }: { q: MCQ }) {
  const locale = useLocale() as "bn" | "en";
  const t = useTranslations();
  const [showExplanation, setShowExplanation] = useState(false);
  const bookmarked = useProgressStore((s) => s.bookmarks.includes(q.id));

  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("uppercase", difficultyStyles[q.difficulty])}>
          {q.difficulty}
        </Badge>
        {q.source && (
          <Badge variant="secondary" className="font-mono text-[10px]">
            {q.source}
          </Badge>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="ml-auto"
          aria-label={bookmarked ? t("common.bookmarked") : t("common.bookmark")}
          aria-pressed={bookmarked}
          onClick={() => useProgressStore.getState().toggleBookmark(q.id)}
        >
          {bookmarked ? (
            <BookmarkCheck className="size-4 text-lime" fill="currentColor" />
          ) : (
            <Bookmark className="size-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      <p className="font-display mt-3 text-sm leading-relaxed font-semibold sm:text-[0.95rem]">
        {q.question[locale]}
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const correct = i === q.answer;
          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm",
                correct
                  ? "border-success/50 bg-success/10 text-foreground"
                  : "border-border bg-background/40 text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-md border text-[10px] font-bold",
                  correct
                    ? "border-success/50 bg-success/20 text-success"
                    : "border-border text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="leading-snug">{opt[locale]}</span>
              {correct && (
                <CheckCircle2 className="ml-auto size-4 shrink-0 text-success" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 px-2 text-xs text-primary"
          aria-expanded={showExplanation}
          onClick={() => setShowExplanation((v) => !v)}
        >
          <Info className="size-3.5" />
          {t("common.explanation")}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform",
              showExplanation && "rotate-180"
            )}
          />
        </Button>
        {showExplanation && (
          <p className="mt-1.5 rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            {q.explanation[locale]}
          </p>
        )}
      </div>
    </article>
  );
}

export function McqVirtualList({ mcqs }: { mcqs: MCQ[] }) {
  useHydrateProgress();
  const t = useTranslations();
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: mcqs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 210,
    overscan: 6,
  });

  if (mcqs.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        {t("common.noResults")}
      </p>
    );
  }

  return (
    <div
      ref={parentRef}
      className="max-h-[640px] overflow-auto rounded-2xl border border-border bg-surface/60 p-3 sm:p-4"
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((vi) => (
          <div
            key={vi.key}
            data-index={vi.index}
            ref={virtualizer.measureElement}
            className="absolute inset-x-0 top-0 px-0.5 pb-3"
            style={{ transform: `translateY(${vi.start}px)` }}
          >
            <McqRow q={mcqs[vi.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
