"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { TopicSection } from "@/lib/content";

export function SectionAccordion({ sections }: { sections: TopicSection[] }) {
  const t = useTranslations("topics");
  const [value, setValue] = React.useState<string[]>([]);

  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && sections.some((s) => s.id === id)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hash deep-link on mount
      setValue([id]);
    }
  }, [sections]);

  if (sections.length === 0) return null;

  const allOpen = value.length === sections.length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {sections.length} {t("sectionCount")}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 text-xs"
          aria-expanded={allOpen}
          onClick={() =>
            setValue(allOpen ? [] : sections.map((section) => section.id))
          }
        >
          {allOpen ? (
            <ChevronsDownUp className="size-3.5" />
          ) : (
            <ChevronsUpDown className="size-3.5" />
          )}
          {allOpen ? t("collapseAll") : t("expandAll")}
        </Button>
      </div>

      <Accordion type="multiple" value={value} onValueChange={setValue}>
        {sections.map((section, index) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            id={section.id}
            className="scroll-mt-24 border-border/70"
          >
            <AccordionTrigger className="group items-center rounded-xl px-3 py-3.5 text-left text-base font-semibold tracking-tight hover:bg-muted/50 hover:no-underline aria-expanded:bg-muted/40">
              <span className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-[0.7rem] font-bold text-primary tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{section.title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="mb-1 rounded-xl border border-border/60 bg-card px-4 pt-1 pb-5 text-[0.95rem] shadow-xs [&>:first-child]:mt-0 [&_p:first-of-type]:text-base [&_p:first-of-type]:text-foreground/85">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
