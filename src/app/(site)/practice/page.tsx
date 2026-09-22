import type { Metadata } from "next";
import { PracticeSetup } from "@/components/practice/practice-setup";

export const metadata: Metadata = {
  title: "MCQ Practice",
  description:
    "Topic-filtered MCQ drills with instant feedback, or a timed mock with auto-submit.",
};

export default function PracticePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <PracticeSetup />
    </div>
  );
}
