"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { news } from "@/lib/data/news";

async function fetchNews() {
  await new Promise((r) => setTimeout(r, 600));
  return news.slice(0, 4);
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "1d ago";
  return `${days}d ago`;
}

export function NewsSection() {
  const t = useTranslations();
  const { data, isLoading } = useQuery({
    queryKey: ["news", "home"],
    queryFn: fetchNews,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t("home.newsTitle")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("home.newsSubtitle")}
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <Link href="/news">
            {t("common.viewAll")}
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="h-44">
                <CardContent className="space-y-3 pt-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          : data?.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="card-hover group h-full">
                  <CardContent className="flex h-full flex-col">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.hot ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {item.source}
                      </Badge>
                      {item.hot && (
                        <span className="text-[10px] font-bold text-danger uppercase">
                          ● live
                        </span>
                      )}
                    </div>
                    <h3 className="font-display mt-2 line-clamp-3 text-sm leading-snug font-semibold group-hover:text-primary">
                      {item.title.en}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                      {item.summary.en}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarClock className="size-3" />
                        {timeAgo(item.publishedAt)}
                      </span>
                      {item.deadline && (
                        <span className="font-medium text-danger">
                          due {item.deadline.slice(5)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>
    </section>
  );
}
