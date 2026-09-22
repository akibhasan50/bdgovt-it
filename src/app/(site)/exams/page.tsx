import type { Metadata } from "next";
import { ExamsDirectory } from "@/components/exam/exams-directory";

export const metadata: Metadata = {
  title: "Mock Exams",
  description:
    "Live, upcoming and archived timed mock exams for BPSC IT, Bank IT, Power Sector IT and every govt IT job exam in Bangladesh.",
};

export default function ExamsPage() {
  return <ExamsDirectory />;
}
