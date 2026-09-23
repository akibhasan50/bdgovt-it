"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  ChevronDown,
  Command,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Menu,
  Newspaper,
  Search,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LocaleToggle } from "@/components/layout/locale-toggle";
import { StreakPill } from "@/components/layout/streak-pill";
import { topics } from "@/lib/data/topics";
import { bankCategories } from "@/lib/data/banks";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

type MenuKey = "topics" | "banks" | null;

const flatLinks = [
  { href: "/practice", labelKey: "practice", icon: Target },
  { href: "/exams", labelKey: "exams", icon: Trophy },
  { href: "/news", labelKey: "news", icon: Newspaper },
  { href: "/guides", labelKey: "guides", icon: BookOpen },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const { data: session } = useSession();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);
  const [menu, setMenu] = useState<MenuKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleHandle = useRef<number | null>(null);

  const clearIdle = () => {
    if (idleHandle.current != null) {
      window.cancelIdleCallback?.(idleHandle.current);
      idleHandle.current = null;
    }
  };

  const deferMenuClear = () => {
    clearIdle();
    const run = () => setMenu(null);
    if (typeof window.requestIdleCallback === "function") {
      idleHandle.current = window.requestIdleCallback(run, { timeout: 400 });
    } else {
      idleHandle.current = window.setTimeout(run, 200) as unknown as number;
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  useEffect(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    deferMenuClear();
    return clearIdle;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close menu after nav, deferred past flight
  }, [pathname]);

  const openMenu = (key: Exclude<MenuKey, null>) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    clearIdle();
    setMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      deferMenuClear();
    }, 140);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav
          className="ml-4 hidden items-center gap-0.5 lg:flex"
          onMouseLeave={scheduleClose}
          aria-label="Main"
        >
          <NavDropdownTrigger
            label={t("nav.coreFundamentals")}
            open={menu === "topics"}
            onEnter={() => openMenu("topics")}
            onLeave={scheduleClose}
          />
          <NavDropdownTrigger
            label={t("nav.banks")}
            open={menu === "banks"}
            onEnter={() => openMenu("banks")}
            onLeave={scheduleClose}
          />
          {flatLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`nav.${l.labelKey}`)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden h-8 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground md:flex"
            aria-label={t("common.search")}
          >
            <Search className="size-3.5" />
            <span className="min-w-24 text-left">{t("common.search")}</span>
            <kbd className="pointer-events-none flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="size-3" />K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={t("common.search")}
            onClick={() => setCommandOpen(true)}
          >
            <Search className="size-4" />
          </Button>

          <StreakPill className="hidden sm:flex" />
          <LocaleToggle />
          <ThemeToggle />

          {session?.user ? (
            <div className="hidden items-center gap-1 sm:flex">
              <Button asChild size="sm" variant="secondary">
                <Link href="/dashboard">
                  <LayoutDashboard className="size-3.5" />
                  {t("common.dashboard")}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t("nav.logout")}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/login">{t("nav.login")}</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label={t("nav.openMenu")}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-4.5" />
          </Button>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-popover/98 shadow-2xl backdrop-blur-xl lg:block"
            onMouseEnter={() => openMenu(menu)}
            onMouseLeave={scheduleClose}
          >
            {menu === "topics" ? <TopicsMega /> : <BanksMega />}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavDropdownTrigger({
  label,
  open,
  onEnter,
  onLeave,
}: {
  label: string;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onClick={onEnter}
      aria-expanded={open}
      className={cn(
        "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          "size-3.5 transition-transform",
          open && "rotate-180"
        )}
      />
    </button>
  );
}

function TopicsMega() {
  const t = useTranslations();
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-7 lg:grid-cols-[300px_1fr]">
      <div className="border-r border-border pr-8">
        <div className="mb-1 flex items-center gap-2 text-primary">
          <Zap className="size-4" />
          <span className="text-sm font-semibold">
            {t("nav.coreFundamentals")}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("nav.coreFundamentalsDesc")}
        </p>
        <Button asChild size="sm" className="mt-4">
          <Link href="/topics">
            {t("common.viewAll")}
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-1 xl:grid-cols-4">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="group flex items-start gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-accent"
          >
            <span
              className={cn(
                "mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-primary"
              )}
            >
              <BookOpen className="size-3.5" />
            </span>
            <span>
              <span className="block text-[0.8rem] leading-snug font-medium text-foreground">
                {topic.title.en}
              </span>
              <span className="block text-[0.7rem] text-muted-foreground">
                {topic.questionCount} {t("common.questions")}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BanksMega() {
  const t = useTranslations();
  const icons: Record<string, typeof Banknote> = {
    Landmark: Banknote,
    Building2: LayoutGrid,
    Zap: Zap,
    Flame: Flame,
    GraduationCap: GraduationCap,
    LayoutGrid: LayoutGrid,
  };
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-7 lg:grid-cols-[300px_1fr]">
      <div className="border-r border-border pr-8">
        <div className="mb-1 flex items-center gap-2 text-primary">
          <FileText className="size-4" />
          <span className="text-sm font-semibold">{t("nav.banks")}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("nav.jobBanksDesc")}
        </p>
        <Button asChild size="sm" className="mt-4">
          <Link href="/banks">
            {t("common.viewAll")}
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-1 xl:grid-cols-3">
        {bankCategories.map((bank) => {
          const Icon = icons[bank.icon] ?? FileText;
          return (
            <Link
              key={bank.slug}
              href={`/banks/${bank.slug}`}
              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {bank.title.en}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground line-clamp-2">
                  {bank.description.en}
                </span>
                <Badge variant="secondary" className="mt-1.5 text-[10px]">
                  {bank.organization.en}
                </Badge>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
