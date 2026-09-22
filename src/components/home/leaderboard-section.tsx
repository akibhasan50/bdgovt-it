"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Crown, Medal } from "lucide-react";
import { leaderboard } from "@/lib/data/banks";

export function LeaderboardSection() {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {t("home.leaderboardTitle")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("home.leaderboardSubtitle")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {leaderboard.slice(0, 10).map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className={
              i < 3
                ? "rounded-2xl border border-primary/30 bg-card p-4 shadow-lg sm:col-span-1 lg:col-span-1"
                : "rounded-2xl border border-border bg-card p-4"
            }
          >
            <div className="flex items-center gap-3">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, hsl(${entry.avatarHue} 70% 55%), hsl(${(entry.avatarHue + 40) % 360} 70% 45%))`,
                }}
              >
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {entry.rank <= 3 && (
                    <Crown
                      className="mr-1 inline size-3.5 text-warning"
                      aria-hidden
                    />
                  )}
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.score} {t("common.score")} · {entry.xp.toLocaleString()}{" "}
                  {t("common.xp")}
                </p>
              </div>
              <Medal
                className={`size-4 shrink-0 ${
                  entry.rank === 1
                    ? "text-warning"
                    : entry.rank === 2
                      ? "text-cyan"
                      : entry.rank === 3
                        ? "text-warning/60"
                        : "text-muted-foreground/40"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
