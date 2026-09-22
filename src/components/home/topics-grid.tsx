"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { topics } from "@/lib/data/topics";
import { cn } from "@/lib/utils";

const chipAccents: Record<string, string> = {
  violet: "bg-violet/10 text-violet hover:bg-violet hover:text-white",
  lime: "bg-lime/10 text-lime-foreground hover:bg-lime hover:text-lime-foreground",
  cyan: "bg-cyan/10 text-cyan hover:bg-cyan hover:text-white",
  warning: "bg-warning/10 text-warning hover:bg-warning hover:text-warning-foreground",
  success: "bg-success/10 text-success hover:bg-success hover:text-success-foreground",
  danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
};

export function TopicsGrid() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t("home.topicsTitle")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home.topicsSubtitle")}
          </p>
        </div>
        <Link
          href="/topics"
          className="text-sm font-semibold text-primary hover:underline"
        >
          {t("common.viewAll")} →
        </Link>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
          >
            <Link
              href={`/topics/${topic.slug}`}
              className={cn(
                "flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5",
                chipAccents[topic.color]
              )}
            >
              {topic.title.en}
              <span className="text-[10px] opacity-70">
                {topic.questionCount}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
