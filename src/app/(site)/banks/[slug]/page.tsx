import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArchiveTable } from "@/components/banks/archive-table";
import { colorChip } from "@/components/content/accents";
import { bankCategories, getBank, getWrittenByBank } from "@/lib/data/banks";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return bankCategories.map((bank) => ({ slug: bank.slug }));
}

export async function generateMetadata(
  props: PageProps<"/banks/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const bank = getBank(slug);
  if (!bank) return { title: "Question bank not found · IT Job Prep BD" };

  const locale = await getLocale();
  return {
    title: `${locale === "bn" ? bank.title.bn : bank.title.en} · IT Job Prep BD`,
    description:
      locale === "bn" ? bank.description.bn : bank.description.en,
  };
}

export default async function BankPage(props: PageProps<"/banks/[slug]">) {
  const { slug } = await props.params;
  const bank = getBank(slug);
  if (!bank) notFound();

  const [t, locale] = await Promise.all([
    getTranslations("banks"),
    getLocale(),
  ]);
  const rows = getWrittenByBank(slug);
  const title = locale === "bn" ? bank.title.bn : bank.title.en;
  const description =
    locale === "bn" ? bank.description.bn : bank.description.en;
  const organization =
    locale === "bn" ? bank.organization.bn : bank.organization.en;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        href="/banks"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("title")}
      </Link>

      <div className="mt-6 flex flex-wrap items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl",
            colorChip[bank.color]
          )}
        >
          <Building2 className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <Badge variant="secondary" className="font-mono text-[11px]">
              {rows.length} {t("writtenQA")}
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          <Badge
            variant="outline"
            className="mt-3 border-primary/30 bg-primary/10 text-primary"
          >
            <Building2 className="size-3" />
            {t("organization")}: {organization}
          </Badge>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold sm:text-xl">
          {t("writtenQA")} · {t("pastPapers")}
        </h2>
        <span className="text-xs text-muted-foreground">
          {t("showing")} {rows.length} {t("ofEntries")}
        </span>
      </div>

      <ArchiveTable rows={rows} />
    </section>
  );
}
