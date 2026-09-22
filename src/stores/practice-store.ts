"use client";

import { create } from "zustand";
import type { MCQ } from "@/lib/types";

export type SessionMode = "practice" | "mock";
export type SessionStatus = "idle" | "running" | "finished";

export type SessionResult = {
  score: number;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  accuracy: number;
  xpEarned: number;
  timeTakenSec: number;
  topicSlugs: string[];
  perQuestion: Array<{ id: string; chosen: number | null; correct: number }>;
  title: string;
};

type PracticeState = {
  status: SessionStatus;
  mode: SessionMode;
  title: string;
  examId: string | null;
  questions: MCQ[];
  currentIndex: number;
  answers: Record<string, number | null>;
  flagged: string[];
  revealed: Record<string, boolean>;
  topicSlugs: string[];
  timeLimitSec: number | null;
  timeLeftSec: number;
  startedAt: number | null;
  result: SessionResult | null;

  startSession: (opts: {
    questions: MCQ[];
    mode: SessionMode;
    topicSlugs: string[];
    timeLimitSec?: number | null;
    title?: string;
    examId?: string | null;
  }) => void;
  answer: (questionId: string, optionIndex: number, reveal?: boolean) => void;
  clearAnswer: (questionId: string) => void;
  toggleFlag: (questionId: string) => void;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  tick: (by?: number) => void;
  finish: (auto?: boolean) => SessionResult | null;
  reset: () => void;
};

const initial = {
  status: "idle" as SessionStatus,
  mode: "practice" as SessionMode,
  title: "",
  examId: null as string | null,
  questions: [] as MCQ[],
  currentIndex: 0,
  answers: {} as Record<string, number | null>,
  flagged: [] as string[],
  revealed: {} as Record<string, boolean>,
  topicSlugs: [] as string[],
  timeLimitSec: null as number | null,
  timeLeftSec: 0,
  startedAt: null as number | null,
  result: null as SessionResult | null,
};

export const usePracticeStore = create<PracticeState>((set, get) => ({
  ...initial,

  startSession: ({
    questions,
    mode,
    topicSlugs,
    timeLimitSec = null,
    title,
    examId = null,
  }) =>
    set({
      ...initial,
      status: "running",
      mode,
      questions,
      topicSlugs,
      timeLimitSec,
      timeLeftSec: timeLimitSec ?? 0,
      startedAt: Date.now(),
      examId,
      title:
        title ??
        (mode === "mock" ? "Mock exam" : "Practice session"),
    }),

  answer: (questionId, optionIndex, reveal = true) =>
    set((s) => ({
      answers: { ...s.answers, [questionId]: optionIndex },
      revealed: reveal ? { ...s.revealed, [questionId]: true } : s.revealed,
    })),

  clearAnswer: (questionId) =>
    set((s) => {
      const answers = { ...s.answers };
      delete answers[questionId];
      const revealed = { ...s.revealed };
      delete revealed[questionId];
      return { answers, revealed };
    }),

  toggleFlag: (questionId) =>
    set((s) => ({
      flagged: s.flagged.includes(questionId)
        ? s.flagged.filter((id) => id !== questionId)
        : [...s.flagged, questionId],
    })),

  goTo: (index) =>
    set((s) => ({
      currentIndex: Math.max(0, Math.min(index, s.questions.length - 1)),
    })),

  next: () => {
    const s = get();
    if (s.currentIndex < s.questions.length - 1)
      set({ currentIndex: s.currentIndex + 1 });
  },

  prev: () => {
    const s = get();
    if (s.currentIndex > 0) set({ currentIndex: s.currentIndex - 1 });
  },

  tick: (by = 1) => {
    const s = get();
    if (s.status !== "running" || s.timeLimitSec === null) return;
    const timeLeftSec = Math.max(0, s.timeLeftSec - by);
    set({ timeLeftSec });
    if (timeLeftSec === 0) get().finish(true);
  },

  finish: (auto = false) => {
    const s = get();
    if (s.status === "finished") return s.result;

    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    const perQuestion = s.questions.map((q) => {
      const chosen = s.answers[q.id] ?? null;
      if (chosen === null) skipped += 1;
      else if (chosen === q.answer) correct += 1;
      else wrong += 1;
      return { id: q.id, chosen, correct: q.answer };
    });

    const total = s.questions.length;
    const accuracy = total ? Math.round((correct / total) * 100) : 0;
    const xpEarned = correct * (s.mode === "mock" ? 6 : 4) + (auto ? 0 : 10);

    const result: SessionResult = {
      score: correct,
      total,
      correct,
      wrong,
      skipped,
      accuracy,
      xpEarned,
      timeTakenSec: s.startedAt
        ? Math.round((Date.now() - s.startedAt) / 1000)
        : 0,
      topicSlugs: s.topicSlugs,
      perQuestion,
      title: s.title,
    };

    set({ status: "finished", result });
    return result;
  },

  reset: () => set({ ...initial }),
}));
