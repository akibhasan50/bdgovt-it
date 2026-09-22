import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { news } from "@/lib/data/news";

export function Ticker() {
  const items = news.slice(0, 6);

  return (
    <div className="bg-gradient-lime relative overflow-hidden py-2 text-lime-foreground">
      <div className="flex w-max animate-ticker gap-12 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((item, i) => (
          <Link
            key={`${item.id}-${i}`}
            href="/news"
            className="flex items-center gap-2 text-xs font-semibold tracking-wide"
          >
            <span className="rounded-full bg-black/15 px-2 py-0.5 text-[10px] font-bold uppercase">
              {item.hot ? "Hot" : "News"}
            </span>
            {item.title.en}
            <ArrowRight className="size-3 opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
}
