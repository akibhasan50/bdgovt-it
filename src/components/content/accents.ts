import type { TopicColor, TopicDifficulty } from "@/lib/types";

export const colorChip: Record<TopicColor, string> = {
  violet:
    "bg-violet/12 text-violet group-hover:bg-violet group-hover:text-white",
  lime: "bg-lime/12 text-lime-foreground group-hover:bg-lime group-hover:text-lime-foreground",
  cyan: "bg-cyan/12 text-cyan group-hover:bg-cyan group-hover:text-white",
  warning:
    "bg-warning/12 text-warning group-hover:bg-warning group-hover:text-warning-foreground",
  success:
    "bg-success/12 text-success group-hover:bg-success group-hover:text-success-foreground",
  danger: "bg-danger/12 text-danger group-hover:bg-danger group-hover:text-white",
};

export const colorSoft: Record<TopicColor, string> = {
  violet: "bg-violet/10 text-violet border-violet/30",
  lime: "bg-lime/10 text-lime-foreground border-lime/30",
  cyan: "bg-cyan/10 text-cyan border-cyan/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  success: "bg-success/10 text-success border-success/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

export const difficultyStyles: Record<TopicDifficulty, string> = {
  easy: "border-success/40 bg-success/10 text-success",
  medium: "border-warning/40 bg-warning/10 text-warning",
  hard: "border-danger/40 bg-danger/10 text-danger",
};
