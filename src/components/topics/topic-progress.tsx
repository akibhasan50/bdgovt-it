"use client";

import { useTranslations } from "next-intl";
import { Progress } from "@/components/ui/progress";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";
import { useProgressStore } from "@/stores/progress-store";

export function TopicProgress({ slug }: { slug: string }) {
  useHydrateProgress();
  const t = useTranslations("topics");
  const stats = useProgressStore((s) => s.topicStats[slug]);
  const pct =
    stats && stats.attempted > 0
      ? Math.round((stats.correct / stats.attempted) * 100)
      : 0;

  return (
    <div className="min-w-36">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">{t("progress")}</span>
        <span className="font-semibold text-foreground">{pct}%</span>
      </div>
      <Progress value={pct} className="mt-1.5 h-1.5" />
      {stats && stats.attempted > 0 ? (
        <p className="mt-1 text-[11px] text-muted-foreground">
          {stats.correct}/{stats.attempted}
        </p>
      ) : null}
    </div>
  );
}
