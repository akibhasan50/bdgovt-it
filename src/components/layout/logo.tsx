import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "bg-gradient-brand grid size-8 shrink-0 place-items-center rounded-[10px] shadow-[0_4px_16px_-4px_var(--glow)]",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4.5 text-white"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 8l4 4-4 4" />
        <path d="M13 16h4" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[0.95rem] leading-none font-bold tracking-tight">
        IT Job Prep
        <span className="text-gradient ml-1">BD</span>
      </span>
    </span>
  );
}
