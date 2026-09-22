"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { colorChip } from "@/components/content/accents";
import type { Topic } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TopicIcon } from "./topic-icons";

export function RelatedTopics({
  topics,
  slug,
}: {
  topics: Topic[];
  slug: string;
}) {
  const t = useTranslations();
  const locale = useLocale() as "bn" | "en";

  if (topics.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`/topics/${topic.slug}`}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-border/70 px-3.5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5",
            colorChip[topic.color]
          )}
        >
          <TopicIcon name={topic.icon} className="size-3.5" />
          {topic.title[locale]}
          <span className="text-[10px] opacity-70">
            {topic.questionCount}
          </span>
        </Link>
      ))}
      <Button asChild size="sm" className="ml-auto rounded-full">
        <Link href={`/practice?topics=${slug}`}>
          <Play className="size-3.5" />
          {t("topics.practiceTopic")}
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
