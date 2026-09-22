"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const next = locale === "bn" ? "en" : "bn";
  const label = locale === "bn" ? "EN" : "বাং";

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      aria-label="Switch language"
      className="px-2.5 font-semibold tracking-wide"
      onClick={() => {
        startTransition(() => {
          document.cookie = `locale=${next};path=/;max-age=31536000;samesite=lax`;
          router.refresh();
        });
      }}
    >
      {label}
    </Button>
  );
}
