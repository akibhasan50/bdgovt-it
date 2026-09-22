"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Play, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { topics } from "@/lib/data/topics";
import { mcqs } from "@/lib/data/mcqs";

const stats = [
  { key: "statTopics", value: "19+" },
  { key: "statQuestions", value: "5,000+" },
  { key: "statExams", value: "120+" },
  { key: "statUsers", value: "12k+" },
] as const;

export function Hero() {
  const t = useTranslations("hero");
  const sample = mcqs.find((q) => q.id === "net-02") ?? mcqs[0];

  return (
    <section className="relative overflow-hidden">
      {/* background decoration */}
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-violet/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-40 size-80 rounded-full bg-cyan/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 size-72 rounded-full bg-lime/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20 lg:pb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="border-primary/30 bg-primary/10 text-primary">
              ⚡ {t("badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="font-display mt-5 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-gradient">{t("title2")}</span>
            <br />
            <span className="text-muted-foreground/90 text-2xl font-medium sm:text-3xl lg:text-4xl">
              {t("title3")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/exams/live-full-mock-01">
                <Play className="size-4" />
                {t("ctaPrimary")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-base">
              <Link href="/banks">
                {t("ctaSecondary")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid max-w-lg grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <div key={s.key}>
                <dt className="sr-only">{t(s.key)}</dt>
                <dd className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                </dd>
                <dd className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                  {t(s.key)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Floating mock question preview */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl" />
          <div className="relative rounded-2xl border border-border bg-card p-5 shadow-2xl ring-glow">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-[10px]">
                {topics.find((tp) => tp.slug === sample.topic)?.title.en}
              </Badge>
              <span className="flex items-center gap-1 text-xs font-semibold text-warning">
                <Timer className="size-3.5" />
                00:24
              </span>
            </div>
            <p className="font-display mt-4 text-base leading-snug font-semibold">
              {sample.question.en}
            </p>
            <div className="mt-4 space-y-2">
              {sample.options.map((opt, i) => {
                const correct = i === sample.answer;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      correct
                        ? "border-success/50 bg-success/10 text-foreground"
                        : i === 1
                          ? "border-danger/40 bg-danger/10 text-muted-foreground"
                          : "border-border bg-background/50 text-muted-foreground"
                    }`}
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-md border text-[10px] font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="truncate">{opt.en}</span>
                    {correct && (
                      <CheckCircle2 className="ml-auto size-4 shrink-0 text-success" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
              <span className="mb-0.5 block font-semibold text-foreground">
                Explanation
              </span>
              {sample.explanation.en}
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -left-4 rounded-xl border border-warning/30 bg-warning/15 px-3 py-2 text-xs font-bold text-warning backdrop-blur"
          >
            🔥 12-day streak
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="absolute -right-4 -bottom-4 rounded-xl border border-lime/30 bg-lime/15 px-3 py-2 text-xs font-bold text-lime backdrop-blur"
          >
            +120 XP · Level 7
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
