"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AttemptSummary = {
  id: string;
  title: string;
  date: string;
  score: number;
  total: number;
  accuracy: number;
  timeTakenSec: number;
  xpEarned: number;
  topicAccuracies: Record<string, { correct: number; total: number }>;
};

type ProgressState = {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  history: string[];
  bookmarks: string[];
  topicStats: Record<string, { correct: number; attempted: number }>;
  attempts: AttemptSummary[];

  touchStreak: () => number;
  addXp: (amount: number) => void;
  recordAnswer: (topic: string, correct: boolean) => void;
  toggleBookmark: (questionId: string) => boolean;
  recordAttempt: (attempt: AttemptSummary) => void;
  level: () => number;
  levelProgress: () => number;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const d1 = new Date(a + "T00:00:00");
  const d2 = new Date(b + "T00:00:00");
  return Math.round((d2.getTime() - d1.getTime()) / 86_400_000);
}

export const XP_PER_LEVEL = 500;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      history: [],
      bookmarks: [],
      topicStats: {},
      attempts: [],

      touchStreak: () => {
        const today = todayKey();
        const { streak, lastActiveDate } = get();
        if (lastActiveDate === today) return streak;

        let next = 1;
        if (lastActiveDate) {
          const gap = daysBetween(lastActiveDate, today);
          next = gap === 1 ? streak + 1 : 1;
        }
        set((s) => ({
          streak: next,
          lastActiveDate: today,
          history: [...s.history.slice(-89), today],
        }));
        return next;
      },

      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),

      recordAnswer: (topic, correct) =>
        set((s) => {
          const prev = s.topicStats[topic] ?? { correct: 0, attempted: 0 };
          return {
            topicStats: {
              ...s.topicStats,
              [topic]: {
                correct: prev.correct + (correct ? 1 : 0),
                attempted: prev.attempted + 1,
              },
            },
          };
        }),

      toggleBookmark: (questionId) => {
        const has = get().bookmarks.includes(questionId);
        set((s) => ({
          bookmarks: has
            ? s.bookmarks.filter((id) => id !== questionId)
            : [...s.bookmarks, questionId],
        }));
        return !has;
      },

      recordAttempt: (attempt) =>
        set((s) => ({
          attempts: [attempt, ...s.attempts].slice(0, 50),
          xp: s.xp + attempt.xpEarned,
        })),

      level: () => Math.floor(get().xp / XP_PER_LEVEL) + 1,

      levelProgress: () => (get().xp % XP_PER_LEVEL) / XP_PER_LEVEL,
    }),
    {
      name: "bditjobs-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        xp: s.xp,
        streak: s.streak,
        lastActiveDate: s.lastActiveDate,
        history: s.history,
        bookmarks: s.bookmarks,
        topicStats: s.topicStats,
        attempts: s.attempts,
      }),
      skipHydration: true,
    }
  )
);

/** Weak topics: lowest accuracy first, min 3 attempts */
export function getWeakTopics(
  topicStats: ProgressState["topicStats"],
  limit = 4
) {
  return Object.entries(topicStats)
    .filter(([, v]) => v.attempted >= 3)
    .map(([slug, v]) => ({
      slug,
      accuracy: Math.round((v.correct / v.attempted) * 100),
      attempted: v.attempted,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}
