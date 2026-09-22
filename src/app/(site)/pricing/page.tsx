import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PricingFaq } from "@/components/content/pricing-faq";
import { Check, Sparkles } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing · IT Job Prep BD",
    description:
      "Free forever for core prep. Pro unlocks unlimited mocks, offline packs and analytics — ৳99/month.",
  };
}

export default async function PricingPage() {
  const t = await getTranslations("subscription");
  const freeFeatures = t.raw("featuresFree") as string[];
  const proFeatures = t.raw("featuresPro") as string[];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {t("freeName")} · {t("proName")}
        </Badge>
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Simple pricing that <span className="text-gradient">respects</span>{" "}
          your stipend.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Start free. Upgrade when the exam date gets real — cancel anytime,
          no drama.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
        {/* Free */}
        <Card className="rounded-2xl py-6">
          <CardHeader className="px-6">
            <CardTitle className="font-display text-lg font-semibold">
              {t("freeName")}
            </CardTitle>
            <CardDescription>Core prep, forever free.</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <p className="font-display flex items-baseline gap-1 text-4xl font-bold">
              ৳0
            </p>
            <ul className="mt-6 space-y-3">
              {freeFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-2 px-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 w-full"
            >
              <Link href="/login">{t("ctaFree")}</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro */}
        <div className="rounded-2xl bg-gradient-brand p-[1.5px] ring-glow">
          <Card className="relative h-full rounded-2xl border-0 bg-card py-6 shadow-none">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-transparent bg-gradient-brand text-white">
              <Sparkles className="size-3" />
              {t("mostPopular")}
            </Badge>
            <CardHeader className="px-6 pt-4">
              <CardTitle className="font-display flex items-center gap-2 text-lg font-semibold">
                {t("proName")}
                <Badge
                  variant="secondary"
                  className="border-primary/30 bg-primary/10 text-primary"
                >
                  Pro
                </Badge>
              </CardTitle>
              <CardDescription>
                Unlimited mocks, offline packs, serious analytics.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <p className="font-display flex items-baseline gap-1 text-4xl font-bold">
                ৳99
                <span className="text-sm font-medium text-muted-foreground">
                  {t("perMonth")}
                </span>
              </p>
              <ul className="mt-6 space-y-3">
                {proFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-2 px-6">
              <Button
                asChild
                size="lg"
                className="h-11 w-full bg-gradient-brand text-base font-semibold text-white hover:opacity-90"
              >
                <Link href="/login?plan=pro">
                  {t("ctaPro")}
                  <Sparkles className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Separator className="mx-auto mt-14 max-w-3xl" />

      <div className="mx-auto mt-10 max-w-3xl">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-6 rounded-2xl border border-border bg-card px-5 py-2 sm:px-6">
          <PricingFaq />
        </div>
      </div>
    </section>
  );
}
