import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { NewsSection } from "@/components/home/news-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { TopicsGrid } from "@/components/home/topics-grid";
import { ExamCTA } from "@/components/home/exam-cta";
import { ProgressSection } from "@/components/home/progress-section";
import { LeaderboardSection } from "@/components/home/leaderboard-section";
import { GuidesTeaser } from "@/components/home/guides-teaser";

export const metadata: Metadata = {
  title: "IT Job Prep BD — Govt IT job exam preparation",
  description:
    "MCQ practice, timed mock exams and written Q&A archives for Bank IT, BPSC IT, Power Sector IT and every govt IT job exam in Bangladesh.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <NewsSection />
      <CategoriesSection />
      <ExamCTA />
      <TopicsGrid />
      <ProgressSection />
      <LeaderboardSection />
      <GuidesTeaser />
    </>
  );
}
