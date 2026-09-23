import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function Callout({
  type = "tip",
  children,
}: {
  type?: "tip" | "warning" | "info";
  children: ReactNode;
}) {
  const map = {
    tip: {
      icon: Lightbulb,
      frame: "border-lime/40 bg-lime/8",
      chip: "bg-lime/20 text-lime-foreground",
      label: "Exam tip",
    },
    warning: {
      icon: AlertTriangle,
      frame: "border-warning/40 bg-warning/10",
      chip: "bg-warning/20 text-warning",
      label: "Careful",
    },
    info: {
      icon: Info,
      frame: "border-cyan/40 bg-cyan/10",
      chip: "bg-cyan/20 text-cyan",
      label: "Note",
    },
  } as const;
  const cfg = map[type];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3.5 rounded-2xl border-l-4 p-4 text-sm leading-relaxed shadow-xs",
        cfg.frame
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg",
          cfg.chip
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <span className="mb-1.5 block text-xs font-bold tracking-widest text-foreground/90 uppercase">
          {cfg.label}
        </span>
        <div className="space-y-2 text-foreground/75 [&_strong]:text-foreground [&_p]:my-0">
          {children}
        </div>
      </div>
    </div>
  );
}
