import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { GuidesExplorer } from "@/components/content/guides-explorer";
import { guides } from "@/lib/data/banks";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("guides");
  return {
    title: `${t("title")} · IT Job Prep BD`,
    description: t("subtitle"),
  };
}

export default async function GuidesPage() {
  const t = await getTranslations("guides");

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {t("aptitude")} · {t("viva")} · {t("strategy")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <GuidesExplorer guides={guides} />
    </section>
  );
}
