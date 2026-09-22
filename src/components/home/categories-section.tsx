"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
import { bankCategories } from "@/lib/data/banks";
import { cn } from "@/lib/utils";

const icons = {
  Landmark,
  Building2,
  Zap,
  Flame,
  GraduationCap,
  LayoutGrid,
} as const;

const accents: Record<string, string> = {
  success: "bg-success/12 text-success group-hover:bg-success group-hover:text-success-foreground",
  violet: "bg-violet/12 text-violet group-hover:bg-violet group-hover:text-white",
  warning: "bg-warning/12 text-warning group-hover:bg-warning group-hover:text-warning-foreground",
  danger: "bg-danger/12 text-danger group-hover:bg-danger group-hover:text-white",
  cyan: "bg-cyan/12 text-cyan group-hover:bg-cyan group-hover:text-white",
  lime: "bg-lime/12 text-lime-foreground group-hover:bg-lime group-hover:text-lime-foreground",
};

export function CategoriesSection() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.categoriesTitle")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("home.categoriesSubtitle")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bankCategories.map((bank, i) => {
          const Icon = icons[bank.icon as keyof typeof icons] ?? FileText;
          return (
            <motion.div
              key={bank.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/banks/${bank.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_48px_-16px_var(--glow)]"
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-xl transition-colors",
                    accents[bank.color]
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold">
                  {bank.title.en}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {bank.description.en}
                </p>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  {t("common.viewAll")}
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
