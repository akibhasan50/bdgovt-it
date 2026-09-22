"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/layout/logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="relative grid min-h-[calc(100dvh-3.5rem)] lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden border-r border-border/60 bg-dots lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-violet/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-32 size-[28rem] rounded-full bg-cyan/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-1/4 left-1/3 size-56 rounded-full bg-lime/15 blur-3xl"
        />

        <div className="relative max-w-md">
          <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
            {t("hero.badge")}
          </p>
          <h2 className="font-display mt-5 text-4xl leading-[1.05] font-bold tracking-tight xl:text-5xl">
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>{" "}
            {t("hero.title3")}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("common.tagline")}
          </p>
        </div>

        <p className="relative text-xs text-muted-foreground">
          {t("footer.builtFor")}
        </p>
      </aside>

      <div className="relative flex items-center justify-center overflow-hidden bg-dots px-4 py-12 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-lime/15 blur-3xl"
        />

        <div className="relative w-full max-w-md animate-rise">
          <Logo className="mb-6 justify-center" />

          <div className="rounded-2xl border border-border/70 bg-card/85 p-6 shadow-[0_24px_80px_-32px_var(--glow)] ring-1 ring-foreground/10 backdrop-blur-xl sm:p-8">
            <div className="mb-6 text-center">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>

          {footer ? (
            <div className="mt-5 text-center text-sm">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
