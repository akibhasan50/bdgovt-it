"use client";

import { useEffect, useRef } from "react";
import { PracticeRunner } from "@/components/practice/practice-runner";
import { usePracticeStore } from "@/stores/practice-store";

export default function PracticeSessionPage() {
  const status = usePracticeStore((s) => s.status);
  const mode = usePracticeStore((s) => s.mode);
  const finish = usePracticeStore((s) => s.finish);
  const recordedRef = useRef(false);

  // Safety net: if the component unmounts mid-session (e.g. tab close),
  // nothing critical is lost — progress-store records on finish only.
  useEffect(() => {
    if (status === "finished" && mode === "mock") {
      if (recordedRef.current) return;
      recordedRef.current = true;
      finish(false);
    }
  }, [status, mode, finish]);

  return <PracticeRunner />;
}
