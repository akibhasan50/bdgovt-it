import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArchiveTable } from "@/components/banks/archive-table";
import { BankHeader } from "@/components/banks/bank-header";
import {
  BankSectionNav,
  type BankNavSection,
} from "@/components/banks/bank-section-nav";
import {
  bankCategories,
  getBank,
  getBankPapersByBank,
  getWrittenByBank,
} from "@/lib/data/banks";
import { getPaperWrittenQAs } from "@/lib/bank-paper-rows";

// Incomplete prerendered RSC payloads (Next #93889 / #92362) crash the flight
// client on soft-nav with enqueueModel errors — always render on demand.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return bankCategories.map((bank) => ({ slug: bank.slug }));
}

export async function generateMetadata(
  props: PageProps<"/banks/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const bank = getBank(slug);
  if (!bank) return { title: "Question bank not found" };

  const locale = await getLocale();
  return {
    title: locale === "bn" ? bank.title.bn : bank.title.en,
    description:
      locale === "bn" ? bank.description.bn : bank.description.en,
  };
}

export default async function BankPage(props: PageProps<"/banks/[slug]">) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const bank = getBank(slug);
  if (!bank) notFound();

  const [t, locale] = await Promise.all([
    getTranslations("banks"),
    getLocale(),
  ]);
  const papers = getBankPapersByBank(slug);
  const paperRows = (
    await Promise.all(papers.map((p) => getPaperWrittenQAs(p.slug)))
  ).flat();
  const rows = [...getWrittenByBank(slug), ...paperRows];

  const sections: BankNavSection[] = [];

  if (papers.length > 0) {
    sections.push({
      value: "papers",
      label: t("tabPapers"),
      count: papers.length,
      icon: "file-text",
    });
  }

  if (rows.length > 0) {
    sections.push({
      value: "written",
      label: t("writtenQA"),
      count: rows.length,
      icon: "scroll-text",
    });
  }

  const panels: Record<string, ReactNode> = {};

  if (papers.length > 0) {
    panels.papers = (
      <div className="mt-5 flex flex-col gap-3">
        {papers.map((paper) => (
          <Link
            key={paper.slug}
            href={`/banks/papers/${paper.slug}`}
            className="card-hover group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-success/12 text-success">
              <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold group-hover:text-primary sm:text-lg">
                {locale === "bn" ? paper.title.bn : paper.title.en}
              </p>
              <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                {locale === "bn"
                  ? paper.description.bn
                  : paper.description.en}
              </p>
            </div>
            <Badge variant="secondary" className="font-mono text-[11px]">
              {paper.questionCount}
            </Badge>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    );
  }

  if (rows.length > 0) {
    panels.written = (
      <div className="mt-5">
        <div className="mb-4 flex items-center justify-end gap-3">
          <span className="text-xs text-muted-foreground">
            {t("showing")} {rows.length} {t("ofEntries")}
          </span>
        </div>
        <ArchiveTable rows={rows} />
      </div>
    );
  }

  const tabSections = sections.filter((section) => !section.href);
  const initialTab =
    typeof searchParams.tab === "string" ? searchParams.tab : undefined;

  let content: ReactNode = null;
  if (sections.length > 1) {
    content = (
      <BankSectionNav
        sections={sections}
        initialTab={initialTab}
        panels={panels}
      />
    );
  } else if (tabSections.length > 0) {
    content = panels[tabSections[0]!.value];
  } else {
    redirect("/practice");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <BankHeader bank={bank} locale={locale} writtenCount={rows.length} />
      {content}
    </section>
  );
}
