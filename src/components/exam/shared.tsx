"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

const emptySubscribe = () => () => {};

/** true only after hydration — safe for reading persisted zustand state */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/** "Sat, 26 Sep · 8:00 PM" style date+time label, pinned to BD time so
 *  server and client always render identical strings (no hydration drift). */
export function formatExamDate(iso: string, locale: string) {
  const date = new Date(iso);
  const day = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Asia/Dhaka",
  }).format(date);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  }).format(date);
  return `${day} · ${time}`;
}

export function formatDurationSec(sec: number) {
  const totalMin = Math.floor(sec / 60);
  const s = sec % 60;
  if (totalMin >= 60) {
    const h = Math.floor(totalMin / 60);
    return `${h}h ${String(totalMin % 60).padStart(2, "0")}m`;
  }
  return `${totalMin}:${String(s).padStart(2, "0")}`;
}

/** Pulsing red dot for LIVE indicators */
export function LiveDot() {
  return (
    <span className="relative flex size-2" aria-hidden>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-danger opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-danger" />
    </span>
  );
}

const STACK_INITIALS = ["RA", "SA", "TA", "NJ", "IK"];

function hueFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 360;
}

/** Colored-initial avatar pile — gamified participant stack */
export function AvatarStack({
  seed,
  count,
  locale = "en",
}: {
  seed: string;
  count?: number;
  locale?: string;
}) {
  const base = hueFor(seed);
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {STACK_INITIALS.map((initials, i) => {
          const hue = (base + i * 47) % 360;
          return (
            <span
              key={initials}
              aria-hidden
              className="grid size-7 place-items-center rounded-full text-[9px] font-bold text-white ring-2 ring-card"
              style={{
                zIndex: STACK_INITIALS.length - i,
                background: `linear-gradient(135deg, hsl(${hue} 70% 55%), hsl(${(hue + 40) % 360} 70% 45%))`,
              }}
            >
              {initials}
            </span>
          );
        })}
      </div>
      {count != null && (
        <span className="text-xs text-muted-foreground">
          +{count.toLocaleString(locale)}
        </span>
      )}
    </div>
  );
}

export function ReminderButton({ examId }: { examId: string }) {
  const t = useTranslations("exam");
  const reminders = useUIStore((s) => s.reminders);
  const toggleReminder = useUIStore((s) => s.toggleReminder);
  const registered = reminders.includes(examId);

  return (
    <Button
      type="button"
      variant={registered ? "secondary" : "outline"}
      size="sm"
      aria-pressed={registered}
      onClick={() => toggleReminder(examId)}
      className={
        registered
          ? "border-success/40 bg-success/10 text-success hover:bg-success/15"
          : undefined
      }
    >
      {registered ? <BellRing aria-hidden /> : <Bell aria-hidden />}
      {registered ? t("registered") : t("registerUpcoming")}
    </Button>
  );
}
