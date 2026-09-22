"use client";

import { create } from "zustand";

type UIState = {
  commandOpen: boolean;
  mobileNavOpen: boolean;
  megaMenuOpen: string | null;
  reminders: string[];
  setCommandOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setMegaMenuOpen: (slug: string | null) => void;
  toggleReminder: (examId: string) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  commandOpen: false,
  mobileNavOpen: false,
  megaMenuOpen: null,
  reminders: [],

  setCommandOpen: (open) => set({ commandOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setMegaMenuOpen: (slug) => set({ megaMenuOpen: slug }),

  toggleReminder: (examId) => {
    const has = get().reminders.includes(examId);
    set((s) => ({
      reminders: has
        ? s.reminders.filter((id) => id !== examId)
        : [...s.reminders, examId],
    }));
  },
}));
