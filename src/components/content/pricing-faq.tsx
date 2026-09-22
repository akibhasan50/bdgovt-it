"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does billing work?",
    a: "Pro is a simple ৳99/month subscription. Pay with bKash, Nagad, Rocket or card — cancel anytime from your dashboard and you keep Pro until the end of the billing period.",
  },
  {
    q: "Does the free plan really stay free?",
    a: "Yes. Core topic practice, bookmarks, streaks and the news feed are free forever. The free plan caps you at 3 mock exams per month — that's the only hard limit.",
  },
  {
    q: "What does Pro include beyond mocks?",
    a: "Unlimited mocks, offline PWA question packs for patchy connections, advanced weak-topic analytics, watermark-free shareable result cards and priority circular alerts.",
  },
  {
    q: "Can I use IT Job Prep BD offline?",
    a: "Install it as a PWA from your browser. Pro unlocks the full offline question packs; free users can still read saved chapter notes offline.",
  },
];

export function PricingFaq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((item, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="py-4 text-sm hover:no-underline sm:text-base">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
