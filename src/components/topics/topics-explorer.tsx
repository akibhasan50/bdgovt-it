"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { difficultyStyles, colorChip } from "@/components/content/accents";
import { topics } from "@/lib/data/topics";
import { cn } from "@/lib/utils";
import { ExamWeightRing } from "./exam-weight-ring";
import { TopicIcon } from "./topic-icons";

export function TopicsExplorer() {
  const t = useTranslations();
  const locale = useLocale() as "bn" | "en";
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return topics;
    return topics.filter(
      (tp) =>
        tp.title.en.toLowerCase().includes(needle) ||
        tp.title.bn.toLowerCase().includes(needle) ||
        tp.slug.includes(needle) ||
        tp.description.en.toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {topics.length} · {t("common.questions")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("topics.title")}</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("topics.subtitle")}
        </p>
      </div>

      <div className="relative mt-8 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("common.searchPlaceholder")}
          className="h-10 rounded-full pr-9 pl-9"
          aria-label={t("common.search")}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={t("common.close")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {filtered.length} {t("common.of")} {topics.length}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {t("common.noResults")}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic, i) => (
            <motion.div
              key={topic.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.5) }}
              className="h-full"
            >
              <Link
                href={`/topics/${topic.slug}`}
                className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                      colorChip[topic.color]
                    )}
                  >
                    <TopicIcon name={topic.icon} className="size-5" />
                  </span>
                  <Badge
                    variant="outline"
                    className={cn("uppercase", difficultyStyles[topic.difficulty])}
                  >
                    {topic.difficulty}
                  </Badge>
                </div>

                <h2 className="font-display mt-4 text-lg leading-snug font-semibold group-hover:text-primary">
                  {topic.title[locale]}
                </h2>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {topic.description[locale]}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                  <span>
                    <strong className="font-semibold text-foreground">
                      {topic.questionCount}
                    </strong>{" "}
                    {t("common.questions")}
                  </span>
                  <span aria-hidden>·</span>
                  <span>
                    <strong className="font-semibold text-foreground">
                      {topic.chapters}
                    </strong>{" "}
                    {t("topics.chapters")}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 font-medium">
                    <ExamWeightRing value={topic.examWeight} />
                    {topic.examWeight}%
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
