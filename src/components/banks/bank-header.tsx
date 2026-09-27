import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { colorChip } from "@/components/content/accents";
import type { BankCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type BankHeaderProps = {
  bank: BankCategory;
  locale: string;
  writtenCount: number;
};

export async function BankHeader({
  bank,
  locale,
  writtenCount,
}: BankHeaderProps) {
  const t = await getTranslations("banks");
  const title = locale === "bn" ? bank.title.bn : bank.title.en;
  const description =
    locale === "bn" ? bank.description.bn : bank.description.en;
  const organization =
    locale === "bn" ? bank.organization.bn : bank.organization.en;

  return (
    <>
      <Link
        href="/banks"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("title")}
      </Link>

      <div className="mt-6 flex flex-wrap items-start gap-4">
        <span
          className={cn(
            "grid size-12 shrink-0 place-items-center rounded-2xl",
            colorChip[bank.color]
          )}
        >
          <Building2 className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <Badge variant="secondary" className="font-mono text-[11px]">
              {writtenCount} {t("writtenQA")}
            </Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          <Badge
            variant="outline"
            className="mt-3 border-primary/30 bg-primary/10 text-primary"
          >
            <Building2 className="size-3" />
            {t("organization")}: {organization}
          </Badge>
        </div>
      </div>

      <Separator className="my-6" />
    </>
  );
}
