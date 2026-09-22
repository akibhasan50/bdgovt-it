"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowRight,
  BookOpen,
  FileText,
  Flame,
  LayoutDashboard,
  LogIn,
  LogOut,
  Newspaper,
  Target,
  Trophy,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/logo";
import { topics } from "@/lib/data/topics";
import { bankCategories } from "@/lib/data/banks";
import { useUIStore } from "@/stores/ui-store";

export function MobileDrawer() {
  const t = useTranslations();
  const open = useUIStore((s) => s.mobileNavOpen);
  const setOpen = useUIStore((s) => s.setMobileNavOpen);
  const { data: session } = useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full max-w-sm flex-col gap-0 overflow-y-auto p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle asChild>
            <Link href="/" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("nav.menu")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-1 px-3 py-4">
          <DrawerLink href="/practice" icon={Target} label={t("nav.practice")} onClick={() => setOpen(false)} />
          <DrawerLink href="/exams" icon={Trophy} label={t("nav.exams")} onClick={() => setOpen(false)} />
          <DrawerLink href="/news" icon={Newspaper} label={t("nav.news")} onClick={() => setOpen(false)} />
          <DrawerLink href="/guides" icon={BookOpen} label={t("nav.guides")} onClick={() => setOpen(false)} />
          <DrawerLink href="/saved" icon={Flame} label={t("nav.saved")} onClick={() => setOpen(false)} />
        </div>

        <Separator />

        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {t("nav.coreFundamentals")}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {topics.slice(0, 8).map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {topic.title.en}
              </Link>
            ))}
          </div>
          <Button asChild variant="link" size="sm" className="mt-1 px-0">
            <Link href="/topics" onClick={() => setOpen(false)}>
              {t("common.viewAll")} <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        <Separator />

        <div className="px-5 py-4">
          <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {t("nav.banks")}
          </p>
          <div className="grid grid-cols-2 gap-1">
            {bankCategories.map((bank) => (
              <Link
                key={bank.slug}
                href={`/banks/${bank.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {bank.title.en}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-border p-4">
          {session?.user ? (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <LayoutDashboard className="size-4" />
                  {t("common.dashboard")}
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  void signOut({ callbackUrl: "/" });
                }}
              >
                <LogOut className="size-4" />
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <LogIn className="size-4" />
                  {t("nav.login")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register" onClick={() => setOpen(false)}>
                  {t("nav.register")}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DrawerLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: typeof Target;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-accent"
    >
      <Icon className="size-4 text-primary" />
      {label}
      <FileText className="ml-auto size-3.5 text-muted-foreground opacity-0" />
    </Link>
  );
}
