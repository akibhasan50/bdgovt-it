import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { NewsFeed } from "@/components/content/news-feed";
import { news } from "@/lib/data/news";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("news");
  return {
    title: `${t("title")} · IT Job Prep BD`,
    description: t("subtitle"),
  };
}

export default async function NewsPage() {
  const [t, th, locale] = await Promise.all([
    getTranslations("news"),
    getTranslations("common"),
    getLocale(),
  ]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-2xl">
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {th("new")} · {th("hot")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient">{t("title")}</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <NewsFeed
        items={news}
        locale={locale === "bn" ? "bn" : "en"}
        labels={{
          readMore: t("readMore"),
          source: t("source"),
          deadline: t("deadline"),
          postedAgo: t("postedAgo"),
          hot: th("hot"),
        }}
      />
    </section>
  );
}
