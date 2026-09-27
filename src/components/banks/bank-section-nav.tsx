"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  FileText,
  Play,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type BankNavIcon = "file-text" | "scroll-text" | "play";

export type BankNavSection = {
  value: string;
  label: string;
  count: number;
  icon: BankNavIcon;
  /** When set, the section is a link to another route instead of a tab. */
  href?: string;
};

const sectionIcons: Record<BankNavIcon, LucideIcon> = {
  "file-text": FileText,
  "scroll-text": ScrollText,
  play: Play,
};

type BankSectionNavProps = {
  sections: BankNavSection[];
  /** Initial tab value for link-less sections (from ?tab=). */
  initialTab?: string;
  /** Panel content for link-less sections, keyed by section value. */
  panels?: Record<string, ReactNode>;
};

const countClass =
  "hidden rounded-md bg-foreground/8 px-1.5 py-px font-mono text-[11px] tabular-nums text-muted-foreground sm:inline";

export function BankSectionNav({
  sections,
  initialTab,
  panels = {},
}: BankSectionNavProps) {
  const pathname = usePathname();
  const tabSections = sections.filter(
    (section): section is BankNavSection & { href?: undefined } =>
      !section.href
  );
  const [value, setValue] = useState<string | undefined>(() =>
    initialTab && tabSections.some((section) => section.value === initialTab)
      ? initialTab
      : tabSections[0]?.value
  );

  if (tabSections.length === 0) return null;

  const handleValueChange = (next: string) => {
    setValue(next);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", next);
    window.history.replaceState(null, "", url.toString());
  };

  const triggerPill = (section: BankNavSection) => {
    const Icon = sectionIcons[section.icon];
    return (
      <TabsTrigger
        key={section.value}
        value={section.value}
        className="h-8 gap-1.5 rounded-lg px-2.5 sm:px-3"
      >
        <Icon className="size-4" />
        {section.label}
        <span className={countClass}>{section.count}</span>
      </TabsTrigger>
    );
  };

  const linkPill = (section: BankNavSection) => {
    const href = section.href!;
    const Icon = sectionIcons[section.icon];
    const active = href === pathname;
    return (
      <Link
        key={section.value}
        href={href}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium whitespace-nowrap transition-all sm:px-3",
          active
            ? "bg-background text-foreground shadow-sm dark:bg-input/30"
            : "text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
        )}
      >
        <Icon className="size-4" />
        {section.label}
        <span className={countClass}>{section.count}</span>
        {!active && <ArrowUpRight className="size-3.5 opacity-70" />}
      </Link>
    );
  };

  // Pills keep the sections' order: the tab list is emitted at the position of
  // its first tab section (Radix requires triggers inside TabsList), links
  // render individually in place.
  const pills: ReactNode[] = [];
  let listEmitted = false;
  for (const section of sections) {
    if (section.href) {
      pills.push(linkPill(section));
    } else if (!listEmitted) {
      listEmitted = true;
      pills.push(
        <TabsList key="tabs" className="gap-1 rounded-none bg-transparent p-0">
          {tabSections.map(triggerPill)}
        </TabsList>
      );
    }
  }

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex w-max items-center gap-1 rounded-xl bg-muted p-1">
          {pills}
        </div>
      </div>
      {tabSections.map((section) => (
        <TabsContent
          key={section.value}
          value={section.value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          {panels[section.value]}
        </TabsContent>
      ))}
    </Tabs>
  );
}
