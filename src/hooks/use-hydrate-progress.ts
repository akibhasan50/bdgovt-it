"use client";

import { useEffect } from "react";
import { useProgressStore } from "@/stores/progress-store";

/** Rehydrates persisted progress state after mount (avoids SSR mismatch). */
export function useHydrateProgress() {
  const rehydrate = useProgressStore.persist.rehydrate;
  useEffect(() => {
    void rehydrate();
  }, [rehydrate]);
}
