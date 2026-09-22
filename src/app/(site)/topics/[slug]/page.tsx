import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Gauge,
  Layers,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { difficultyStyles } from "@/components/content/accents";
import { getTopicContent } from "@/lib/content";
import { getMCQsByTopic } from "@/lib/data/mcqs";
import { getRelatedTopics, getTopic, topics } from "@/lib/data/topics";
import { cn } from "@/lib/utils";
import { McqVirtualList } from "@/components/topics/mcq-virtual-list";
import { ReadingProgress } from "@/components/topics/reading-progress";
import { RelatedTopics } from "@/components/topics/related-topics";
import { TopicProgress } from "@/components/topics/topic-progress";
import { TopicIcon } from "@/components/topics/topic-icons";

export async function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata(
  props: PageProps<"/topics/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const topic = getTopic(slug);
  if (!topic) return { title: "Topic not found · IT Job Prep BD" };

  const locale = await getLocale();
  const content = await getTopicContent(slug);
  const title = locale === "bn" ? topic.title.bn : topic.title.en;
  const description = content.frontmatter
    ? locale === "bn"
      ? content.frontmatter.summary_bn
      : content.frontmatter.summary_en
    : locale === "bn"
      ? topic.description.bn
      : topic.description.en;

  return {
    title: `${title} · IT Job Prep BD`,
    description,
  };
}

export default async function TopicPage(props: PageProps<"/topics/[slug]">) {
  const { slug } = await props.params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const [t, locale, content] = await Promise.all([
    getTranslations("topics"),
    getLocale(),
    getTopicContent(slug),
  ]);

  const mcqs = getMCQsByTopic(slug);
  const related = getRelatedTopics(slug);
  const title = locale === "bn" ? topic.title.bn : topic.title.en;
  const description =
    content.frontmatter && content.exists
      ? locale === "bn"
        ? content.frontmatter.summary_bn || topic.description.bn
        : content.frontmatter.summary_en || topic.description.en
      : locale === "bn"
        ? topic.description.bn
        : topic.description.en;

  return (
    <>
      <ReadingProgress />

      <section className="relative overflow-hidden">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-violet/15 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 pt-8 pb-12 sm:px-6">
          <Link
            href="/topics"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t("title")}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary">
              <TopicIcon name={topic.icon} className="size-6" />
            </span>
            <Badge
              variant="outline"
              className={cn("uppercase", difficultyStyles[topic.difficulty])}
            >
              {topic.difficulty}
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 border-lime/30 bg-lime/10 text-lime-foreground"
            >
              <Gauge className="size-3" />
              {topic.examWeight}% exam weight
            </Badge>
          </div>

          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-4 text-primary" />
              <dt className="sr-only">{t("questionBank")}</dt>
              <dd>
                <strong className="font-semibold">{topic.questionCount}</strong>{" "}
                <span className="text-muted-foreground">
                  {t("questionBank")}
                </span>
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-cyan" />
              <dt className="sr-only">{t("chapters")}</dt>
              <dd>
                <strong className="font-semibold">{topic.chapters}</strong>{" "}
                <span className="text-muted-foreground">{t("chapters")}</span>
              </dd>
            </div>
            <TopicProgress slug={slug} />
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-10 px-5">
              <Link href={`/practice?topics=${slug}`}>
                <Play className="size-4" />
                {t("practiceTopic")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-10 px-5">
              <a href="#chapter">
                <BookOpen className="size-4" />
                {t("startTopic")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl" />

      <article
        id="chapter"
        className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6"
      >
        <h2 className="font-display mb-6 text-2xl font-bold tracking-tight">
          {t("readChapter")}
        </h2>
        {content.exists && content.content ? (
          content.content
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">
              {t("keyConcepts")}
            </p>
            <p className="mt-2">{description}</p>
            <p className="mt-4 text-xs">
              Full chapter notes for this topic are on the way — the question
              bank below is ready now.
            </p>
          </div>
        )}
      </article>

      <section className="mx-auto max-w-5xl px-4 pb-6 sm:px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              {t("questionBank")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mcqs.length} {t("questionBank").toLowerCase()}
            </p>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={`/practice?topics=${slug}`}>
              <Play className="size-3.5" />
              {t("practiceTopic")}
            </Link>
          </Button>
        </div>
        <McqVirtualList mcqs={mcqs} />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h2 className="font-display mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          {t("relatedTopics")}
        </h2>
        <RelatedTopics topics={related} slug={slug} />
      </section>
    </>
  );
}
