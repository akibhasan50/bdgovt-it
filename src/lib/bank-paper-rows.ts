import "server-only";
import type { WrittenQA } from "@/lib/types";
import { compilePaperDetail, getBankPaperQuestions } from "@/lib/content";
import { getBankPaper } from "@/lib/data/banks";

export async function getPaperWrittenQAs(slug: string): Promise<WrittenQA[]> {
  const paper = getBankPaper(slug);
  if (!paper) return [];
  const questions = await getBankPaperQuestions(slug);
  return Promise.all(
    questions.map(async (q) => ({
      id: `paper-${slug}-q${q.qNo}`,
      bank: paper.bank,
      question: { en: `Q${q.qNo}. ${q.question}`, bn: `Q${q.qNo}. ${q.question}` },
      year: paper.year,
      exam: paper.exam,
      group: "MCQ",
      answer: q.answer,
      paperSlug: paper.slug,
      qNo: q.qNo,
      detail: await compilePaperDetail(q.detailSource),
    }))
  );
}
