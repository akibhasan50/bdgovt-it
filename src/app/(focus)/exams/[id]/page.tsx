import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExam } from "@/lib/data/exams";
import { ExamIntro } from "@/components/exam/exam-intro";

type Props = PageProps<"/exams/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) return { title: "Mock Exam" };
  return { title: exam.title.en, description: exam.description.en };
}

export default async function ExamIntroPage({ params }: Props) {
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) notFound();
  return <ExamIntro exam={exam} />;
}
