import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TopicsExplorer } from "@/components/topics/topics-explorer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("topics");
  return {
    title: `${t("title")} · IT Job Prep BD`,
    description: t("subtitle"),
  };
}

export default function TopicsPage() {
  return <TopicsExplorer />;
}
