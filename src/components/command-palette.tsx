"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  BookOpen,
  Calendar,
  FileText,
  Flame,
  LayoutDashboard,
  LogIn,
  Newspaper,
  Search,
  Target,
  Trophy,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { topics } from "@/lib/data/topics";
import { bankCategories } from "@/lib/data/banks";
import { mcqs } from "@/lib/data/mcqs";
import { exams } from "@/lib/data/exams";
import { news } from "@/lib/data/news";
import { useUIStore } from "@/stores/ui-store";
import { useMounted } from "@/hooks/use-mounted";

export function CommandPalette() {
  const t = useTranslations();
  const router = useRouter();
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const mounted = useMounted();

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const navItems = useMemo(
    () => [
      { href: "/", label: t("nav.home"), icon: BookOpen },
      { href: "/practice", label: t("nav.practice"), icon: Target },
      { href: "/exams", label: t("nav.exams"), icon: Trophy },
      { href: "/banks", label: t("nav.banks"), icon: FileText },
      { href: "/news", label: t("nav.news"), icon: Newspaper },
      { href: "/guides", label: t("nav.guides"), icon: Calendar },
      { href: "/dashboard", label: t("common.dashboard"), icon: LayoutDashboard },
      { href: "/saved", label: t("nav.saved"), icon: Flame },
      { href: "/login", label: t("nav.login"), icon: LogIn },
    ],
    [t]
  );

  if (!mounted) return null;

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder={t("common.searchPlaceholder")}
        aria-label={t("common.search")}
      />
      <CommandList>
        <CommandEmpty>{t("common.noResults")}</CommandEmpty>

        <CommandGroup heading={t("nav.practice")}>
          {topics.slice(0, 6).map((topic) => (
            <CommandItem
              key={topic.slug}
              value={`topic ${topic.title.en} ${topic.title.bn}`}
              onSelect={() => go(`/topics/${topic.slug}`)}
            >
              <BookOpen className="size-4 text-primary" />
              <span>{topic.title.en}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {topic.questionCount}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t("common.search")}>
          {mcqs.slice(0, 5).map((q) => (
            <CommandItem
              key={q.id}
              value={`question ${q.question.en} ${q.question.bn}`}
              onSelect={() => go(`/practice?focus=${q.id}`)}
            >
              <Search className="size-4 text-cyan" />
              <span className="truncate">{q.question.en}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t("nav.exams")}>
          {exams.slice(0, 4).map((exam) => (
            <CommandItem
              key={exam.id}
              value={`exam ${exam.title.en} ${exam.title.bn}`}
              onSelect={() => go(`/exams/${exam.id}`)}
            >
              <Trophy className="size-4 text-warning" />
              <span className="truncate">{exam.title.en}</span>
              {exam.status === "live" && (
                <span className="ml-auto rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">
                  LIVE
                </span>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t("nav.banks")}>
          {bankCategories.map((bank) => (
            <CommandItem
              key={bank.slug}
              value={`bank ${bank.title.en} ${bank.title.bn}`}
              onSelect={() => go(`/banks/${bank.slug}`)}
            >
              <FileText className="size-4 text-success" />
              <span>{bank.title.en}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t("nav.news")}>
          {news.slice(0, 3).map((item) => (
            <CommandItem
              key={item.id}
              value={`news ${item.title.en} ${item.title.bn}`}
              onSelect={() => go("/news")}
            >
              <Newspaper className="size-4 text-violet" />
              <span className="truncate">{item.title.en}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t("common.navigate")}>
          {navItems.map((item) => (
            <CommandItem
              key={item.href}
              value={`nav ${item.label}`}
              onSelect={() => go(item.href)}
            >
              <item.icon className="size-4 text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
