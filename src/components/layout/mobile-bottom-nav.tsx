"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Flame, Home, LayoutDashboard, Target, Trophy } from "lucide-react";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/practice", labelKey: "practice", icon: Target },
  { href: "/exams", labelKey: "exams", icon: Trophy },
  { href: "/saved", labelKey: "saved", icon: Flame },
  { href: "/dashboard", labelKey: "profile", icon: LayoutDashboard },
] as const;

export function MobileBottomNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);

  // Hidden while a focus-mode exam/practice session is active
  if (pathname.startsWith("/practice/session") || /^\/exams\/[^/]+\/(take|result)/.test(pathname)) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Bottom navigation"
    >
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />
              )}
              <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
              {t(`nav.${item.labelKey}`)}
            </Link>
          );
        })}
      </div>
      <button
        className="sr-only"
        onClick={() => setCommandOpen(true)}
        aria-hidden
        tabIndex={-1}
      />
    </nav>
  );
}
