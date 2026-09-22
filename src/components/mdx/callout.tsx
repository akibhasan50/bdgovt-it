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
      className:
        "border-lime/40 bg-lime/10 text-foreground",
      label: "Exam tip",
    },
    warning: {
      icon: AlertTriangle,
      className:
        "border-warning/40 bg-warning/10 text-foreground",
      label: "Careful",
    },
    info: {
      icon: Info,
      className: "border-cyan/40 bg-cyan/10 text-foreground",
      label: "Note",
    },
  } as const;
  const cfg = map[type];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed",
        cfg.className
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <span className="mb-1 block font-semibold text-xs tracking-wide uppercase">
          {cfg.label}
        </span>
        <div className="text-muted-foreground [&_strong]:text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
