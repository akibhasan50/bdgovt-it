"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Building2,
  FileText,
  Flame,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { colorChip } from "@/components/content/accents";
import { bankCategories } from "@/lib/data/banks";
import { cn } from "@/lib/utils";

const bankIcons: Record<string, LucideIcon> = {
  Landmark,
  Building2,
  Zap,
  Flame,
  GraduationCap,
  LayoutGrid,
};

export function BankGrid() {
  const t = useTranslations();
  const locale = useLocale() as "bn" | "en";

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {bankCategories.map((bank, i) => {
        const Icon = bankIcons[bank.icon] ?? FileText;
        return (
          <motion.div
            key={bank.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="h-full"
          >
            <Link
              href={`/banks/${bank.slug}`}
              className="card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                    colorChip[bank.color]
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base leading-snug font-semibold group-hover:text-primary">
                      {bank.title[locale]}
                    </h3>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="mt-1.5 max-w-full truncate text-[10px]"
                  >
                    {bank.organization[locale]}
                  </Badge>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                {bank.description[locale]}
              </p>
              <span className="mt-3 text-xs font-semibold text-primary">
                {t("common.viewAll")} →
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
