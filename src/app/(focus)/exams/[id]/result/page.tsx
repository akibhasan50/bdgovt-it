import { notFound } from "next/navigation";
import { getExam } from "@/lib/data/exams";
import { ExamResult } from "@/components/exam/exam-result";

type Props = PageProps<"/exams/[id]/result">;

export default async function ExamResultPage({ params }: Props) {
  const { id } = await params;
  const exam = getExam(id);
  if (!exam) notFound();
  return <ExamResult exam={exam} />;
}
