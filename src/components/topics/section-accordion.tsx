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
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
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
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            id={section.id}
            className="scroll-mt-24"
          >
            <AccordionTrigger className="py-3.5 text-base font-semibold hover:no-underline">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[0.95rem]">
              {section.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
