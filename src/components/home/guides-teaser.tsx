"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock, GraduationCap, Lightbulb, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/data/banks";

const catIcon = {
  aptitude: Lightbulb,
  viva: Users,
  strategy: GraduationCap,
} as const;

const catLabel = {
  aptitude: "guides.aptitude",
  viva: "guides.viva",
  strategy: "guides.strategy",
} as const;

export function GuidesTeaser() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t("home.guidesTitle")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home.guidesSubtitle")}
          </p>
        </div>
        <Link
          href="/guides"
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          {t("common.viewAll")} →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {guides.slice(0, 3).map((guide, i) => {
          const Icon = catIcon[guide.category];
          return (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href="/guides"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <Icon className="size-3" />
                    {t(catLabel[guide.category])}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="size-3" />
                    {guide.minutes} {t("common.minRead")}
                  </span>
                </div>
                <h3 className="font-display mt-3 line-clamp-2 text-base leading-snug font-semibold group-hover:text-primary">
                  {guide.title.en}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {guide.excerpt.en}
                </p>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  {guide.author}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
