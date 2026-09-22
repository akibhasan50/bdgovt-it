"use client";

import { Flame } from "lucide-react";
import { useProgressStore } from "@/stores/progress-store";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function StreakPill({ className }: { className?: string }) {
  const streak = useProgressStore((s) => s.streak);
  const mounted = useMounted();

  if (!mounted || streak === 0) return null;

  return (
    <div
      className={cn(
        "flex h-7 items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2.5 text-xs font-bold text-warning",
        className
      )}
      title="Daily streak"
    >
      <Flame className="size-3.5 animate-streak-flame" />
      {streak}
    </div>
  );
}
