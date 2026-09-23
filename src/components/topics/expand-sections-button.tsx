"use client";

import * as React from "react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExpandSectionsButton({
  sectionIds,
  expandLabel,
  collapseLabel,
}: {
  sectionIds: string[];
  expandLabel: string;
  collapseLabel: string;
}) {
  const [allOpen, setAllOpen] = React.useState(false);

  const toggle = () => {
    const next = !allOpen;
    setAllOpen(next);
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = next;
    }
  };

  if (sectionIds.length === 0) return null;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8 gap-1.5 text-xs"
      aria-expanded={allOpen}
      onClick={toggle}
    >
      {allOpen ? (
        <ChevronsDownUp className="size-3.5" />
      ) : (
        <ChevronsUpDown className="size-3.5" />
      )}
      {allOpen ? collapseLabel : expandLabel}
    </Button>
  );
}
