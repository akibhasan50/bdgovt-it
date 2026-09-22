"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CommandPalette } from "@/components/command-palette";
import { useHydrateProgress } from "@/hooks/use-hydrate-progress";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useHydrateProgress();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <SiteHeader />
      <MobileDrawer />
      <main id="main" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <MobileBottomNav />
      <CommandPalette />
    </div>
  );
}
