import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { ExpandSectionsButton } from "@/components/topics/expand-sections-button";
import { OpenHashSection } from "@/components/topics/open-hash-section";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  title: string;
  content: ReactNode;
};

export async function SectionAccordion({ sections }: { sections: Section[] }) {
  const t = await getTranslations("topics");

  if (sections.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {sections.length} {t("sectionCount")}
        </p>
        <ExpandSectionsButton
          sectionIds={sections.map((s) => s.id)}
          expandLabel={t("expandAll")}
          collapseLabel={t("collapseAll")}
        />
      </div>

      <OpenHashSection ids={sections.map((s) => s.id)} />

      <div className="flex flex-col">
        {sections.map((section, index) => (
          <details
            key={section.id}
            id={section.id}
            data-accordion-item=""
            className="group border-b border-border/70 scroll-mt-24 last:border-b-0"
          >
            <summary className="group flex cursor-pointer list-none items-center rounded-xl px-3 py-3.5 text-left text-base font-semibold tracking-tight transition-colors outline-none hover:bg-muted/50 open:bg-muted/40 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-6 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-[0.7rem] font-bold text-primary tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{section.title}</span>
              </span>
              <ChevronDown
                aria-hidden
                className="ml-2 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <div
              className={cn(
                "mb-1 rounded-xl border border-border/60 bg-card px-4 pt-1 pb-5 text-[0.95rem] shadow-xs",
                "[&>:first-child]:mt-0 [&_p:first-of-type]:text-base [&_p:first-of-type]:text-foreground/85"
              )}
            >
              {section.content}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
