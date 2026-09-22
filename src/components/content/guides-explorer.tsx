"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Clock, GraduationCap, Lightbulb, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Guide } from "@/lib/types";
import { cn } from "@/lib/utils";

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

const catAccent = {
  aptitude: "bg-warning/12 text-warning",
  viva: "bg-cyan/12 text-cyan",
  strategy: "bg-violet/12 text-violet",
} as const;

function GuideCard({ guide, index }: { guide: Guide; index: number }) {
  const t = useTranslations();
  const locale = useLocale() as "bn" | "en";
  const Icon: LucideIcon = catIcon[guide.category];

  return (
    <motion.div
      id={guide.slug}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      className="scroll-mt-24"
    >
      <div className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className={cn("gap-1 text-[10px]", catAccent[guide.category])}
          >
            <Icon className="size-3" />
            {t(catLabel[guide.category])}
          </Badge>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {guide.minutes} {t("common.minRead")}
          </span>
        </div>

        <h3 className="font-display mt-3 text-base leading-snug font-semibold group-hover:text-primary">
          {guide.title[locale]}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
          {guide.excerpt[locale]}
        </p>

        <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary">
          <User className="size-3" />
          {t("common.by")} {guide.author}
        </span>
      </div>
    </motion.div>
  );
}

function GuideGrid({ items }: { items: Guide[] }) {
  const t = useTranslations();
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        {t("common.noResults")}
      </p>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((guide, i) => (
        <GuideCard key={guide.slug} guide={guide} index={i} />
      ))}
    </div>
  );
}

export function GuidesExplorer({ guides }: { guides: Guide[] }) {
  const t = useTranslations();

  const byCategory = (cat: Guide["category"]) =>
    guides.filter((g) => g.category === cat);

  return (
    <Tabs defaultValue="all" className="mt-8">
      <TabsList>
        <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
        <TabsTrigger value="aptitude">{t("guides.aptitude")}</TabsTrigger>
        <TabsTrigger value="viva">{t("guides.viva")}</TabsTrigger>
        <TabsTrigger value="strategy">{t("guides.strategy")}</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-5">
        <GuideGrid items={guides} />
      </TabsContent>
      <TabsContent value="aptitude" className="mt-5">
        <GuideGrid items={byCategory("aptitude")} />
      </TabsContent>
      <TabsContent value="viva" className="mt-5">
        <GuideGrid items={byCategory("viva")} />
      </TabsContent>
      <TabsContent value="strategy" className="mt-5">
        <GuideGrid items={byCategory("strategy")} />
      </TabsContent>
    </Tabs>
  );
}
