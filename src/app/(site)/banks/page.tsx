import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BankGrid } from "@/components/banks/bank-grid";
import { bankCategories, writtenQAs } from "@/lib/data/banks";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("banks");
  return {
    title: `${t("title")} · IT Job Prep BD`,
    description: t("subtitle"),
  };
}

export default async function BanksPage() {
  const t = await getTranslations("banks");
  const firstBank = bankCategories[0];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {t("writtenQA")} · {t("pastPapers")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-8">
        <BankGrid />
      </div>

      <div className="mt-6">
        <Link
          href={`/banks/${firstBank.slug}`}
          className="card-hover group flex items-center gap-4 rounded-2xl border border-border bg-gradient-brand p-5 text-white sm:gap-6 sm:p-6"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Archive className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-wide uppercase opacity-80">
              Browse all archived questions
            </p>
            <p className="font-display mt-1 text-2xl font-bold sm:text-3xl">
              {writtenQAs.length}{" "}
              <span className="text-sm font-medium opacity-80 sm:text-base">
                {t("writtenQA")} · {t("pastPapers")}
              </span>
            </p>
          </div>
          <ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
