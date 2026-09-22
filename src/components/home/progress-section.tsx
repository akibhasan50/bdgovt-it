"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Award,
  BookMarked,
  Flame,
  Gauge,
  MessageSquare,
  Timer,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const features = [
  { icon: MessageSquare, key: "instantFb" },
  { icon: Timer, key: "timedMode" },
  { icon: BookMarked, key: "bookmarkList" },
] as const;

export function ProgressSection() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Gauge className="size-4" />
            {t("practice.title")}
          </div>
          <h2 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("home.practiceTitle")}
          </h2>

          <ul className="mt-6 space-y-4">
            {features.map((f, i) => (
              <motion.li
                key={f.key}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <f.icon className="size-4" />
                </span>
                <span className="pt-1.5 text-sm text-muted-foreground">
                  {t(`home.${f.key}`)}
                </span>
              </motion.li>
            ))}
          </ul>

          <Button asChild className="mt-8">
            <Link href="/practice">
              {t("practice.startPractice")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Gamified progress preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {t("home.progressTitle")}
                </p>
                <p className="font-display mt-1 text-lg font-bold">
                  {t("home.progressSubtitle")}
                </p>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-warning/15 text-warning">
                <Flame className="size-6 animate-streak-flame" />
              </span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: t("common.streak"), value: "12", unit: t("common.days"), icon: Flame },
                { label: t("common.level"), value: "7", unit: t("common.xp"), icon: TrendingUp },
                { label: t("common.xp"), value: "3.2k", unit: "", icon: Award },
              ].map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-border bg-surface p-3 text-center"
                >
                  <m.icon className="mx-auto size-4 text-primary" />
                  <p className="font-display mt-1 text-xl font-bold">{m.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {[
                { topic: "Data Structures", pct: 82 },
                { topic: "Computer Networks", pct: 64 },
                { topic: "DBMS", pct: 47 },
              ].map((row) => (
                <div key={row.topic}>
                  <div className="mb-1.5 flex justify-between text-xs">
                    <span className="font-medium">{row.topic}</span>
                    <span className="text-muted-foreground">{row.pct}%</span>
                  </div>
                  <Progress value={row.pct} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -right-3 -top-3 rounded-xl border border-lime/40 bg-lime/15 px-3 py-1.5 text-xs font-bold text-lime-foreground backdrop-blur">
            +40 XP today
          </div>
        </motion.div>
      </div>
    </section>
  );
}
