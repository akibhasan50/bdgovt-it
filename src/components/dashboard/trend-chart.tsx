"use client";

import { useTranslations } from "next-intl";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AttemptSummary } from "@/stores/progress-store";
import { shortDate } from "@/components/dashboard/utils";

export function TrendChart({
  attempts,
  locale,
}: {
  attempts: AttemptSummary[];
  locale: string;
}) {
  const t = useTranslations();

  const data = attempts
    .slice(0, 10)
    .reverse()
    .map((a, i) => ({
      label: shortDate(a.date, locale) || `#${attempts.length - i}`,
      accuracy: a.accuracy,
    }));

  const config = {
    accuracy: {
      label: t("common.accuracy"),
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={config}
      className="aspect-auto h-56 w-full sm:h-64"
    >
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="fillAccuracy" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-accuracy)"
              stopOpacity={0.35}
            />
            <stop
              offset="95%"
              stopColor="var(--color-accuracy)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
        />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="accuracy"
          type="monotone"
          fill="url(#fillAccuracy)"
          stroke="var(--color-accuracy)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--color-accuracy)", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
