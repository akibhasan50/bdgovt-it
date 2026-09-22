import type { NewsItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CalendarClock,
  ExternalLink,
  Flame,
  Newspaper,
} from "lucide-react";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

function daysUntil(date: string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / 86_400_000);
}

function DeadlineChip({
  deadline,
  label,
  light = false,
}: {
  deadline: string;
  label: string;
  light?: boolean;
}) {
  const daysLeft = daysUntil(deadline);
  const urgent = daysLeft <= 7;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        light
          ? "border-white/30 bg-white/15 text-white backdrop-blur"
          : urgent
            ? "border-danger/40 bg-danger/10 text-danger"
            : "border-border bg-surface text-muted-foreground"
      )}
    >
      <CalendarClock className="size-3" />
      {label}: {deadline}
      {urgent && daysLeft >= 0 ? ` · ${daysLeft}d left` : null}
      {daysLeft < 0 ? " · passed" : null}
    </span>
  );
}

export function NewsFeed({
  items,
  labels,
  locale = "en",
}: {
  items: NewsItem[];
  locale?: "bn" | "en";
  labels: {
    readMore: string;
    source: string;
    deadline: string;
    postedAgo: string;
    hot: string;
  };
}) {
  const sorted = [...items].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
  const featured = sorted.find((n) => n.hot) ?? sorted[0];
  const rest = sorted.filter((n) => n.id !== featured?.id);

  if (!featured) {
    return (
      <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
        No circulars right now — check back soon.
      </p>
    );
  }

  return (
    <div className="mt-8">
      {/* Featured hot item */}
      <article className="relative overflow-hidden rounded-3xl bg-gradient-brand p-6 text-white sm:p-8">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-20" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">
              <Flame className="size-3" />
              {labels.hot}
            </Badge>
            <Badge
              variant="secondary"
              className="border-transparent bg-white/15 text-white backdrop-blur"
            >
              {featured.source}
            </Badge>
          </div>

          <h2 className="font-display mt-4 max-w-3xl text-2xl leading-tight font-bold sm:text-3xl">
            {featured.title[locale]}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            {featured.summary[locale]}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="sm"
              className="border border-white/30 bg-white/15 text-white backdrop-blur hover:bg-white/25 hover:text-white"
            >
              <a href={featured.url} target="_blank" rel="noreferrer">
                {labels.readMore}
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
            <span className="text-xs text-white/75">
              {labels.postedAgo} {timeAgo(featured.publishedAt)}
            </span>
            {featured.deadline && (
              <DeadlineChip
                deadline={featured.deadline}
                label={labels.deadline}
                light
              />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Timeline list */}
      <ol className="relative mt-8 space-y-6 border-l border-border pl-6 sm:pl-8">
        {rest.map((item, i) => (
          <li
            key={item.id}
            className="animate-in-view relative"
            style={{ animationDelay: `${Math.min(i * 0.06, 0.4)}s` }}
          >
            <span
              className={cn(
                "absolute top-2 -left-[calc(1.5rem+5px)] grid size-2.5 place-items-center rounded-full ring-4 ring-background sm:-left-[calc(2rem+5px)]",
                item.hot ? "bg-danger" : "bg-primary/60"
              )}
              aria-hidden
            />

            <article className="card-hover rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={item.hot ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {item.hot ? (
                    <>
                      <Flame className="size-3" />
                      {labels.hot}
                    </>
                  ) : (
                    item.source
                  )}
                </Badge>
                {item.hot && (
                  <Badge variant="secondary" className="text-[10px]">
                    {item.source}
                  </Badge>
                )}
                <span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Newspaper className="size-3" />
                  {labels.postedAgo} {timeAgo(item.publishedAt)}
                </span>
              </div>

              <h3 className="font-display mt-3 text-base leading-snug font-semibold sm:text-lg">
                {item.title[locale]}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {item.summary[locale]}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {item.deadline && (
                  <DeadlineChip
                    deadline={item.deadline}
                    label={labels.deadline}
                  />
                )}
                {item.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="ml-auto"
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {labels.readMore}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
