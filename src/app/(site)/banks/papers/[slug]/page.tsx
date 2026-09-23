import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, FileText, Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SectionAccordion } from "@/components/topics/section-accordion";
import { colorChip } from "@/components/content/accents";
import {
  bankPapers,
  getBank,
  getBankPaper,
} from "@/lib/data/banks";
import { getBankPaperContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return bankPapers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata(
  props: PageProps<"/banks/papers/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const paper = getBankPaper(slug);
  if (!paper) return { title: "Paper not found · IT Job Prep BD" };

  const locale = await getLocale();
  const content = await getBankPaperContent(slug);
  const title = locale === "bn" ? paper.title.bn : paper.title.en;
  const description =
    content.frontmatter
      ? locale === "bn"
        ? content.frontmatter.summary_bn
        : content.frontmatter.summary_en
      : locale === "bn"
        ? paper.description.bn
        : paper.description.en;

  return {
    title: `${title} · IT Job Prep BD`,
    description,
  };
}

export default async function BankPaperPage(props: PageProps<"/banks/papers/[slug]">) {
  const { slug } = await props.params;
  const paper = getBankPaper(slug);
  if (!paper) notFound();

  const [t, locale, content] = await Promise.all([
    getTranslations("banks"),
    getLocale(),
    getBankPaperContent(slug),
  ]);

  const bank = getBank(paper.bank);
  const title = locale === "bn" ? paper.title.bn : paper.title.en;
  const description =
    content.frontmatter && content.exists
      ? locale === "bn"
        ? content.frontmatter.summary_bn || paper.description.bn
        : content.frontmatter.summary_en || paper.description.en
      : locale === "bn"
        ? paper.description.bn
        : paper.description.en;
  const organization =
    locale === "bn" ? paper.organization.bn : paper.organization.en;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        href={`/banks/${paper.bank}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {locale === "bn"
          ? (bank?.title.bn ?? t("title"))
          : (bank?.title.en ?? t("title"))}
      </Link>

      <div className="mt-6 flex flex-wrap items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl",
            colorChip[bank?.color ?? "success"]
          )}
        >
          <FileText className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <Badge variant="secondary" className="font-mono text-[11px]">
              {paper.questionCount} {t("writtenQA")}
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/30 bg-primary/10 text-primary"
            >
              <Landmark className="size-3" />
              {paper.exam} · {paper.year}
            </Badge>
            <Badge variant="outline" className="font-mono text-[11px]">
              {organization}
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold sm:text-xl">
          {t("fullSolution")}
        </h2>
        <span className="text-xs text-muted-foreground">
          {t("answerStructure")}
        </span>
      </div>

      {content.exists && content.sections.length > 0 ? (
        <>
          {content.intro ? (
            <div className="mb-8">{content.intro}</div>
          ) : null}
          <SectionAccordion sections={content.sections} />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Full solution is on the way.
        </div>
      )}
    </section>
  );
}
