"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExamCTA() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-brand relative overflow-hidden rounded-3xl p-8 sm:p-12"
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-lime/30 blur-[80px]" />

        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/70 uppercase">
              <Trophy className="size-3.5" /> Mock exam
            </span>
            <h2 className="font-display mt-3 text-3xl leading-tight font-bold text-white sm:text-4xl">
              {t("home.examCtaTitle")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              {t("home.examCtaSubtitle")}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-white/70">
              <span className="flex items-center gap-1.5">
                <Timer className="size-3.5" /> 30 min
              </span>
              <span>24 MCQs</span>
              <span>−0.5 negative</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-7 text-base font-bold text-violet shadow-lg hover:bg-white/90"
            >
              <Link href="/exams/live-full-mock-01">
                {t("home.examCtaButton")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-transparent px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/exams">{t("exam.title")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
