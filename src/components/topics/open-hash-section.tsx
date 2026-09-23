"use client";

import * as React from "react";

/** Opens a matching `<details>` after idle so it never races the RSC stream. */
export function OpenHashSection({ ids }: { ids: string[] }) {
  const key = ids.join("|");

  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !ids.includes(id)) return;

    const open = () => {
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = true;
      el?.scrollIntoView({ block: "start" });
    };

    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      }
    ).requestIdleCallback;

    if (typeof ric === "function") {
      const handle = ric(open, { timeout: 500 });
      return () => {
        (
          window as Window & { cancelIdleCallback?: (h: number) => void }
        ).cancelIdleCallback?.(handle);
      };
    }

    const timer = window.setTimeout(open, 300);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids joined into key
  }, [key]);

  return null;
}
