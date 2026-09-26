import type { BankCategory, Guide, LeaderboardEntry, WrittenQA } from "@/lib/types";

export type BankPaper = {
  slug: string;
  bank: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  year: number;
  exam: string;
  organization: { en: string; bn: string };
  questionCount: number;
};

export const bankPapers: BankPaper[] = [
  {
    slug: "combined-bank-officer-it-2026-mcq",
    bank: "bank-it",
    title: {
      en: "Combined Bank Officer (IT) 2026 (Based Year 2022) — MCQ Solutions",
      bn: "কম্বাইন্ড ব্যাংক অফিসার (আইটি) ২০২৬ (বেসড বছর ২০২২) — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 99 MCQs of Combined Bank Officer (IT) (2026) with options, correct answers and explanations where the source provides them.",
      bn: "Combined Bank Officer (IT) (2026) এর 99টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2026,
    exam: "Combined Bank Officer (IT)",
    organization: {
      en: "Combined Bank",
      bn: "কম্বাইন্ড ব্যাংক",
    },
    questionCount: 99,
  },
  {
    slug: "49-bcs-computer-science-2025-mcq",
    bank: "bpsc-it",
    title: {
      en: "49th BCS Computer Science 2025 — MCQ Solutions",
      bn: "৪৯তম বিসিএস কম্পিউটার বিজ্ঞান ২০২৫ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 100 MCQs of 49th BCS — Computer Science (2025) with options, correct answers and explanations where the source provides them.",
      bn: "49th BCS — Computer Science (2025) এর 100টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2025,
    exam: "49th BCS — Computer Science",
    organization: {
      en: "Bangladesh Public Service Commission",
      bn: "বাংলাদেশ সরকারি কর্ম কমিশন",
    },
    questionCount: 100,
  },
  {
    slug: "bangladesh-bank-assistant-director-ict-2025-mcq",
    bank: "bank-it",
    title: {
      en: "Bangladesh Bank Assistant Director (ICT) 2025 — MCQ Solutions",
      bn: "বাংলাদেশ ব্যাংক সহকারী পরিচালক (আইসিটি) ২০২৫ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 49 MCQs of Bangladesh Bank Assistant Director (ICT) (2025) with options, correct answers and explanations where the source provides them.",
      bn: "Bangladesh Bank Assistant Director (ICT) (2025) এর 49টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2025,
    exam: "Bangladesh Bank Assistant Director (ICT)",
    organization: {
      en: "Bangladesh Bank",
      bn: "বাংলাদেশ ব্যাংক",
    },
    questionCount: 49,
  },
  {
    slug: "combined-bank-senior-officer-it-2025-mcq",
    bank: "bank-it",
    title: {
      en: "Combined Bank Senior Officer (IT) 2025 — MCQ Solutions",
      bn: "কম্বাইন্ড ব্যাংক সিনিয়র অফিসার (আইটি) ২০২৫ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 25 MCQs of Combined Bank Senior Officer (IT) (2025) with options, correct answers and explanations where the source provides them.",
      bn: "Combined Bank Senior Officer (IT) (2025) এর 25টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2025,
    exam: "Combined Bank Senior Officer (IT)",
    organization: {
      en: "Combined Bank",
      bn: "কম্বাইন্ড ব্যাংক",
    },
    questionCount: 25,
  },
  {
    slug: "combined-bank-assistant-programmer-2024-mcq",
    bank: "bank-it",
    title: {
      en: "Combined Bank Assistant Programmer 2024 — MCQ Solutions",
      bn: "কম্বাইন্ড ব্যাংক সহকারী প্রোগ্রামার ২০২৪ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 43 MCQs of Combined Bank Assistant Programmer (2024) with options, correct answers and explanations where the source provides them.",
      bn: "Combined Bank Assistant Programmer (2024) এর 43টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2024,
    exam: "Combined Bank Assistant Programmer",
    organization: {
      en: "Combined Bank",
      bn: "কম্বাইন্ড ব্যাংক",
    },
    questionCount: 43,
  },
  {
    slug: "combined-bank-senior-officer-it-2024-mcq",
    bank: "bank-it",
    title: {
      en: "Combined Bank Senior Officer (IT) 2024 — MCQ Solutions",
      bn: "কম্বাইন্ড ব্যাংক সিনিয়র অফিসার (আইটি) ২০২৪ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 100 MCQs of Combined Bank Senior Officer (IT) (2024) with options, correct answers and explanations where the source provides them.",
      bn: "Combined Bank Senior Officer (IT) (2024) এর 100টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2024,
    exam: "Combined Bank Senior Officer (IT)",
    organization: {
      en: "Combined Bank",
      bn: "কম্বাইন্ড ব্যাংক",
    },
    questionCount: 100,
  },
  {
    slug: "bangladesh-bank-assistant-maintenance-engineer-2023-mcq",
    bank: "bank-it",
    title: {
      en: "Bangladesh Bank Assistant Maintenance Engineer 2023 — MCQ Solutions",
      bn: "বাংলাদেশ ব্যাংক সহকারী মেইনটেন্যান্স ইঞ্জিনিয়ার ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 26 MCQs of Bangladesh Bank Assistant Maintenance Engineer (2023) with options, correct answers and explanations where the source provides them.",
      bn: "Bangladesh Bank Assistant Maintenance Engineer (2023) এর 26টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "Bangladesh Bank Assistant Maintenance Engineer",
    organization: {
      en: "Bangladesh Bank",
      bn: "বাংলাদেশ ব্যাংক",
    },
    questionCount: 26,
  },
  {
    slug: "bangladesh-bank-assistant-programmer-2023-mcq",
    bank: "bank-it",
    title: {
      en: "Bangladesh Bank Assistant Programmer 2023 — MCQ Solutions",
      bn: "বাংলাদেশ ব্যাংক সহকারী প্রোগ্রামার ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 25 MCQs of Bangladesh Bank Assistant Programmer (2023) with options, correct answers and explanations where the source provides them.",
      bn: "Bangladesh Bank Assistant Programmer (2023) এর 25টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "Bangladesh Bank Assistant Programmer",
    organization: {
      en: "Bangladesh Bank",
      bn: "বাংলাদেশ ব্যাংক",
    },
    questionCount: 25,
  },
  {
    slug: "bdccl-assistant-manager-transmission-2023-mcq",
    bank: "others",
    title: {
      en: "BDCCL Assistant Manager (Transmission) 2023 — MCQ Solutions",
      bn: "বিডিসিসিএল সহকারী ব্যবস্থাপক (ট্রান্সমিশন) ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 26 MCQs of BDCCL Assistant Manager (Transmission) (2023) with options, correct answers and explanations where the source provides them.",
      bn: "BDCCL Assistant Manager (Transmission) (2023) এর 26টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "BDCCL Assistant Manager (Transmission)",
    organization: {
      en: "BDCCL",
      bn: "বিডিসিসিএল",
    },
    questionCount: 26,
  },
  {
    slug: "bpdb-assistant-engineer-cse-2023-mcq",
    bank: "power-sector-it",
    title: {
      en: "BPDB Assistant Engineer (CSE) 2023 — MCQ Solutions",
      bn: "বিপিডিবি সহকারী প্রকৌশলী (সিএসই) ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 23 MCQs of BPDB Assistant Engineer (CSE) (2023) with options, correct answers and explanations where the source provides them.",
      bn: "BPDB Assistant Engineer (CSE) (2023) এর 23টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "BPDB Assistant Engineer (CSE)",
    organization: {
      en: "Bangladesh Power Development Board",
      bn: "বাংলাদেশ পাওয়ার ডেভেলপমেন্ট বোর্ড",
    },
    questionCount: 23,
  },
  {
    slug: "breb-assistant-programmer-2023-mcq",
    bank: "power-sector-it",
    title: {
      en: "BREB Assistant Programmer 2023 — MCQ Solutions",
      bn: "বিআরইবি সহকারী প্রোগ্রামার ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 18 MCQs of BREB Assistant Programmer (2023) with options, correct answers and explanations where the source provides them.",
      bn: "BREB Assistant Programmer (2023) এর 18টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "BREB Assistant Programmer",
    organization: {
      en: "Bangladesh Rural Electrification Board",
      bn: "বাংলাদেশ গ্রামীণ বিদ্যুৎায়ন বোর্ড",
    },
    questionCount: 18,
  },
  {
    slug: "npcbl-executive-trainee-software-2023-mcq",
    bank: "power-sector-it",
    title: {
      en: "NPCBL Executive Trainee (Software) 2023 — MCQ Solutions",
      bn: "এনপিসিবিএল এক্সিকিউটিভ ট্রেইনি (সফটওয়্যার) ২০২৩ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 41 MCQs of NPCBL Executive Trainee (Software) (2023) with options, correct answers and explanations where the source provides them.",
      bn: "NPCBL Executive Trainee (Software) (2023) এর 41টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2023,
    exam: "NPCBL Executive Trainee (Software)",
    organization: {
      en: "NPCBL",
      bn: "এনপিসিবিএল",
    },
    questionCount: 41,
  },
  {
    slug: "bcic-assistant-programmer-2022",
    bank: "others",
    title: {
      en: "BCIC Assistant Programmer 2022 — MCQ Solutions",
      bn: "বিসিআইসি সহকারী প্রোগ্রামার ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 46 MCQs of BCIC Assistant Programmer (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BCIC Assistant Programmer (2022) এর 46টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BCIC Assistant Programmer",
    organization: {
      en: "BCIC",
      bn: "বিসিআইসি",
    },
    questionCount: 46,
  },
  {
    slug: "bcpcl-assistant-engineer-2022",
    bank: "others",
    title: {
      en: "BCPCL Assistant Engineer 2022 — MCQ Solutions",
      bn: "বিসিপিসিএল সহকারী প্রকৌশলী ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 16 MCQs of BCPCL Assistant Engineer (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BCPCL Assistant Engineer (2022) এর 16টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BCPCL Assistant Engineer",
    organization: {
      en: "BCPCL",
      bn: "বিসিপিসিএল",
    },
    questionCount: 16,
  },
  {
    slug: "bdccl-assistant-manager-cloud-2022",
    bank: "others",
    title: {
      en: "BDCCL Assistant Manager (Cloud) 2022 — MCQ Solutions",
      bn: "বিডিসিসিএল সহকারী ব্যবস্থাপক (ক্লাউড) ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 14 MCQs of BDCCL Assistant Manager (Cloud) (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BDCCL Assistant Manager (Cloud) (2022) এর 14টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BDCCL Assistant Manager (Cloud)",
    organization: {
      en: "BDCCL",
      bn: "বিডিসিসিএল",
    },
    questionCount: 14,
  },
  {
    slug: "bdccl-assistant-manager-transmission-2022",
    bank: "others",
    title: {
      en: "BDCCL Assistant Manager (Transmission) 2022 — MCQ Solutions",
      bn: "বিডিসিসিএল সহকারী ব্যবস্থাপক (ট্রান্সমিশন) ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 26 MCQs of BDCCL Assistant Manager (Transmission) (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BDCCL Assistant Manager (Transmission) (2022) এর 26টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BDCCL Assistant Manager (Transmission)",
    organization: {
      en: "BDCCL",
      bn: "বিডিসিসিএল",
    },
    questionCount: 26,
  },
  {
    slug: "bpsc-different-ministry-ame-2022",
    bank: "bpsc-it",
    title: {
      en: "BPSC Different Ministry AME 2022 — MCQ Solutions",
      bn: "বিপিএসসি বিভিন্ন মন্ত্রণালয় এএমই ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 100 MCQs of BPSC Different Ministry — AME (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BPSC Different Ministry — AME (2022) এর 100টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BPSC Different Ministry — AME",
    organization: {
      en: "Bangladesh Public Service Commission",
      bn: "বাংলাদেশ সরকারি কর্ম কমিশন",
    },
    questionCount: 100,
  },
  {
    slug: "bpsc-different-ministry-ap-2022",
    bank: "bpsc-it",
    title: {
      en: "BPSC Different Ministry AP 2022 — MCQ Solutions",
      bn: "বিপিএসসি বিভিন্ন মন্ত্রণালয় এপি ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 100 MCQs of BPSC Different Ministry — AP (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BPSC Different Ministry — AP (2022) এর 100টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BPSC Different Ministry — AP",
    organization: {
      en: "Bangladesh Public Service Commission",
      bn: "বাংলাদেশ সরকারি কর্ম কমিশন",
    },
    questionCount: 100,
  },
  {
    slug: "bpsc-instructor-technical-training-centers-2022",
    bank: "bpsc-it",
    title: {
      en: "BPSC Instructor (Technical Training Centers) 2022 — MCQ Solutions",
      bn: "বিপিএসসি ইন্সট্রাক্টর (টেকনিক্যাল ট্রেনিং সেন্টার) ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 96 MCQs of BPSC Instructor — Technical Training Centers (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BPSC Instructor — Technical Training Centers (2022) এর 96টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BPSC Instructor — Technical Training Centers",
    organization: {
      en: "Bangladesh Public Service Commission",
      bn: "বাংলাদেশ সরকারি কর্ম কমিশন",
    },
    questionCount: 96,
  },
  {
    slug: "btcl-junior-assistant-manager-2022",
    bank: "others",
    title: {
      en: "BTCL Junior Assistant Manager 2022 — MCQ Solutions",
      bn: "বিটিসিএল জুনিয়র সহকারী ব্যবস্থাপক ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 44 MCQs of BTCL Junior Assistant Manager (2022) with options, correct answers and explanations where the source provides them.",
      bn: "BTCL Junior Assistant Manager (2022) এর 44টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "BTCL Junior Assistant Manager",
    organization: {
      en: "BTCL",
      bn: "বিটিসিএল",
    },
    questionCount: 44,
  },
  {
    slug: "npcbl-assistant-engineer-2022",
    bank: "power-sector-it",
    title: {
      en: "NPCBL Assistant Engineer 2022 — MCQ Solutions",
      bn: "এনপিসিবিএল সহকারী প্রকৌশলী ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 10 MCQs of NPCBL Assistant Engineer (2022) with options, correct answers and explanations where the source provides them.",
      bn: "NPCBL Assistant Engineer (2022) এর 10টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "NPCBL Assistant Engineer",
    organization: {
      en: "NPCBL",
      bn: "এনপিসিবিএল",
    },
    questionCount: 10,
  },
  {
    slug: "petrobangla-assistant-engineer-2022",
    bank: "gas-field-it",
    title: {
      en: "PetroBangla Assistant Engineer 2022 — MCQ Solutions",
      bn: "পেট্রোবাংলা সহকারী প্রকৌশলী ২০২২ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 12 MCQs of PetroBangla Assistant Engineer (2022) with options, correct answers and explanations where the source provides them.",
      bn: "PetroBangla Assistant Engineer (2022) এর 12টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2022,
    exam: "PetroBangla Assistant Engineer",
    organization: {
      en: "PetroBangla",
      bn: "পেট্রোবাংলা",
    },
    questionCount: 12,
  },
  {
    slug: "6-banks-financial-institutions-assistant-programmer-2021-mcq",
    bank: "bank-it",
    title: {
      en: "6 Bank & Financial Institution Assistant Programmer 2021 — MCQ Solutions",
      bn: "৬টি ব্যাংক ও আর্থিক প্রতিষ্ঠান সহকারী প্রোগ্রামার ২০২১ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 40 MCQs of 6 Bank & Financial Institution Assistant Programmer (2021) with options, correct answers and explanations where the source provides them.",
      bn: "6 Bank & Financial Institution Assistant Programmer (2021) এর 40টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2021,
    exam: "6 Bank & Financial Institution Assistant Programmer",
    organization: {
      en: "Bangladesh Bank & Associates",
      bn: "বাংলাদেশ ব্যাংকসহ অন্যান্য",
    },
    questionCount: 40,
  },
  {
    slug: "rupali-bank-ane-2021-mcq",
    bank: "bank-it",
    title: {
      en: "Rupali Bank ANE 2021 — MCQ Solutions",
      bn: "রূপালী ব্যাংক এএনই ২০২১ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 40 MCQs of Rupali Bank ANE (2021) with options, correct answers and explanations where the source provides them.",
      bn: "Rupali Bank ANE (2021) এর 40টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2021,
    exam: "Rupali Bank ANE",
    organization: {
      en: "Rupali Bank",
      bn: "রূপালী ব্যাংক",
    },
    questionCount: 40,
  },
  {
    slug: "sonali-janata-bank-ada-2021-mcq",
    bank: "bank-it",
    title: {
      en: "Sonali & Janata Bank ADA 2021 — MCQ Solutions",
      bn: "সোনালী ও জনতা ব্যাংক এডিএ ২০২১ — এমসিকিউ সমাধান",
    },
    description: {
      en: "All 56 MCQs of Sonali & Janata Bank ADA (2021) with options, correct answers and explanations where the source provides them.",
      bn: "Sonali & Janata Bank ADA (2021) এর 56টি এমসিকিউ — অপশন, সঠিক উত্তর এবং যেখানে সোর্সে আছে ব্যাখ্যাসহ।",
    },
    year: 2021,
    exam: "Sonali & Janata Bank ADA",
    organization: {
      en: "Sonali & Janata Bank",
      bn: "সোনালী ও জনতা ব্যাংক",
    },
    questionCount: 56,
  },
  {
    slug: "pyq-cloud-computing",
    bank: "others",
    title: {
      en: "Cloud Computing — Solved Questions & PYQ",
      bn: "ক্লাউড কম্পিউটিং — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "8 questions from the IT Job QnS Cloud Computing topic — 8 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Cloud Computing টপিকের 8টি প্রশ্ন — 8টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Cloud Computing (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 8,
  },
  {
    slug: "pyq-computer-network",
    bank: "others",
    title: {
      en: "Computer Network — Solved Questions & PYQ",
      bn: "কম্পিউটার নেটওয়ার্ক — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "85 questions from the IT Job QnS Computer Network topic — 80 with worked answers and explanations, 5 without a text solution in the source.",
      bn: "IT Job QnS-এর Computer Network টপিকের 85টি প্রশ্ন — 80টির সমাধান ও ব্যাখ্যা, 5টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Computer Network (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 85,
  },
  {
    slug: "pyq-computer-security",
    bank: "others",
    title: {
      en: "Computer Security — Solved Questions & PYQ",
      bn: "কম্পিউটার সিকিউরিটি — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "39 questions from the IT Job QnS Computer Security topic — 39 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Computer Security টপিকের 39টি প্রশ্ন — 39টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Computer Security (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 39,
  },
  {
    slug: "pyq-data-center-and-virtualization",
    bank: "others",
    title: {
      en: "Data Center & Virtualization — Solved Questions & PYQ",
      bn: "ডেটা সেন্টার ও ভার্চুয়ালাইজেশন — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "30 questions from the IT Job QnS Data Center & Virtualization topic — 30 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Data Center & Virtualization টপিকের 30টি প্রশ্ন — 30টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Data Center & Virtualization (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 30,
  },
  {
    slug: "pyq-data-structure",
    bank: "others",
    title: {
      en: "Data Structure — Solved Questions & PYQ",
      bn: "ডেটা স্ট্রাকচার — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "25 questions from the IT Job QnS Data Structure topic — 25 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Data Structure টপিকের 25টি প্রশ্ন — 25টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Data Structure (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 25,
  },
  {
    slug: "pyq-database-management-system",
    bank: "others",
    title: {
      en: "Database Management System (DBMS) — Solved Questions & PYQ",
      bn: "ডেটাবেস ম্যানেজমেন্ট সিস্টেম (ডিবিএমএস) — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "14 questions from the IT Job QnS Database Management System (DBMS) topic — 14 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Database Management System (DBMS) টপিকের 14টি প্রশ্ন — 14টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Database Management System (DBMS) (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 14,
  },
  {
    slug: "pyq-design-and-analysis-of-algorithm",
    bank: "others",
    title: {
      en: "Design & Analysis of Algorithm — Solved Questions & PYQ",
      bn: "অ্যালগরিদম ডিজাইন ও অ্যানালাইসিস — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "9 questions from the IT Job QnS Design & Analysis of Algorithm topic — 9 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Design & Analysis of Algorithm টপিকের 9টি প্রশ্ন — 9টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Design & Analysis of Algorithm (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 9,
  },
  {
    slug: "pyq-dl",
    bank: "others",
    title: {
      en: "Digital Logic Design — Solved Questions & PYQ",
      bn: "ডিজিটাল লজিক ডিজাইন — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "50 questions from the IT Job QnS Digital Logic Design topic — 13 with worked answers and explanations, 8 without a text solution in the source, 9 previous-year questions with exam tags, 20 MCQ practice-quiz questions with answer keys.",
      bn: "IT Job QnS-এর Digital Logic Design টপিকের 50টি প্রশ্ন — 13টির সমাধান ও ব্যাখ্যা, 8টির টেক্সট সমাধান সোর্সে নেই, 9টি পূর্ববর্তী পরীক্ষার প্রশ্ন, 20টি এমসিকিউ প্র্যাকটিস কুইজ।",
    },
    year: 2026,
    exam: "Digital Logic Design (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 50,
  },
  {
    slug: "pyq-linux-command",
    bank: "others",
    title: {
      en: "Linux Command — Solved Questions & PYQ",
      bn: "লিনাক্স কমান্ড — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "6 questions from the IT Job QnS Linux Command topic — 6 with worked answers and explanations.",
      bn: "IT Job QnS-এর Linux Command টপিকের 6টি প্রশ্ন — 6টির সমাধান ও ব্যাখ্যা।",
    },
    year: 2026,
    exam: "Linux Command (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 6,
  },
  {
    slug: "pyq-microprocessor-and-computer-architecture",
    bank: "others",
    title: {
      en: "Microprocessor & Computer Architecture — Solved Questions & PYQ",
      bn: "মাইক্রোপ্রসেসর ও কম্পিউটার আর্কিটেকচার — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "27 questions from the IT Job QnS Microprocessor & Computer Architecture topic — 24 with worked answers and explanations, 3 without a text solution in the source.",
      bn: "IT Job QnS-এর Microprocessor & Computer Architecture টপিকের 27টি প্রশ্ন — 24টির সমাধান ও ব্যাখ্যা, 3টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Microprocessor & Computer Architecture (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 27,
  },
  {
    slug: "pyq-ml-ai-big-data",
    bank: "others",
    title: {
      en: "Machine Learning, AI & Big Data — Solved Questions & PYQ",
      bn: "মেশিন লার্নিং, এআই ও বিগ ডেটা — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "17 questions from the IT Job QnS Machine Learning, AI & Big Data topic — 10 with worked answers and explanations, 7 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Machine Learning, AI & Big Data টপিকের 17টি প্রশ্ন — 10টির সমাধান ও ব্যাখ্যা, 7টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Machine Learning, AI & Big Data (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 17,
  },
  {
    slug: "pyq-object-oriented-programming",
    bank: "others",
    title: {
      en: "Object Oriented Programming (OOP) — Solved Questions & PYQ",
      bn: "অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং (ওওপি) — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "46 questions from the IT Job QnS Object Oriented Programming (OOP) topic — 15 with worked answers and explanations, 1 without a text solution in the source, 30 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Object Oriented Programming (OOP) টপিকের 46টি প্রশ্ন — 15টির সমাধান ও ব্যাখ্যা, 1টির টেক্সট সমাধান সোর্সে নেই, 30টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Object Oriented Programming (OOP) (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 46,
  },
  {
    slug: "pyq-operating-system",
    bank: "others",
    title: {
      en: "Operating System — Solved Questions & PYQ",
      bn: "অপারেটিং সিস্টেম — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "32 questions from the IT Job QnS Operating System topic — 29 with worked answers and explanations, 3 without a text solution in the source.",
      bn: "IT Job QnS-এর Operating System টপিকের 32টি প্রশ্ন — 29টির সমাধান ও ব্যাখ্যা, 3টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Operating System (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 32,
  },
  {
    slug: "pyq-programming-question",
    bank: "others",
    title: {
      en: "Programming Question — Solved Questions & PYQ",
      bn: "প্রোগ্রামিং প্রশ্ন — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "45 questions from the IT Job QnS Programming Question topic — 41 with worked answers and explanations, 4 without a text solution in the source.",
      bn: "IT Job QnS-এর Programming Question টপিকের 45টি প্রশ্ন — 41টির সমাধান ও ব্যাখ্যা, 4টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Programming Question (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 45,
  },
  {
    slug: "pyq-software-engineering",
    bank: "others",
    title: {
      en: "Software Engineering — Solved Questions & PYQ",
      bn: "সফটওয়্যার ইঞ্জিনিয়ারিং — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "20 questions from the IT Job QnS Software Engineering topic — 20 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Software Engineering টপিকের 20টি প্রশ্ন — 20টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Software Engineering (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 20,
  },
  {
    slug: "pyq-structured-query-language",
    bank: "others",
    title: {
      en: "Structured Query Language (SQL) — Solved Questions & PYQ",
      bn: "স্ট্রাকচার্ড কোয়েরি ল্যাংগুয়েজ (এসকিউএল) — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "24 questions from the IT Job QnS Structured Query Language (SQL) topic — 22 with worked answers and explanations, 2 without a text solution in the source.",
      bn: "IT Job QnS-এর Structured Query Language (SQL) টপিকের 24টি প্রশ্ন — 22টির সমাধান ও ব্যাখ্যা, 2টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Structured Query Language (SQL) (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 24,
  },
  {
    slug: "pyq-theory-of-computation",
    bank: "others",
    title: {
      en: "Theory of Computation — Solved Questions & PYQ",
      bn: "কম্পিউটেশনের তত্ত্ব — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "15 questions from the IT Job QnS Theory of Computation topic — 14 with worked answers and explanations, 1 without a text solution in the source.",
      bn: "IT Job QnS-এর Theory of Computation টপিকের 15টি প্রশ্ন — 14টির সমাধান ও ব্যাখ্যা, 1টির টেক্সট সমাধান সোর্সে নেই।",
    },
    year: 2026,
    exam: "Theory of Computation (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 15,
  },
  {
    slug: "pyq-web-technologies",
    bank: "others",
    title: {
      en: "Web Technologies — Solved Questions & PYQ",
      bn: "ওয়েব টেকনোলজিস — সমাধান ও পূর্ববর্তী প্রশ্ন",
    },
    description: {
      en: "9 questions from the IT Job QnS Web Technologies topic — 9 previous-year questions with exam tags.",
      bn: "IT Job QnS-এর Web Technologies টপিকের 9টি প্রশ্ন — 9টি পূর্ববর্তী পরীক্ষার প্রশ্ন।",
    },
    year: 2026,
    exam: "Web Technologies (topic-wise)",
    organization: {
      en: "IT Job QnS (topic-wise)",
      bn: "আইটি জবকিউএনএস (টপিক-ওয়াইজ)",
    },
    questionCount: 9,
  },
  {
    slug: "bkkb-ap-2026",
    bank: "bank-it",
    title: {
      en: "BKKB Assistant Programmer 2026 — Full Solution",
      bn: "বিকেকেবি সহকারী প্রোগ্রামার ২০২৬ — সম্পূর্ণ সমাধান",
    },
    description: {
      en: "All 62 released questions with Answer → Explanation → Related info → Exam tip.",
      bn: "প্রকাশিত ৬২টি প্রশ্ন — উত্তর → ব্যাখ্যা → সম্পর্কিত তথ্য → পরীক্ষার টিপ।",
    },
    year: 2026,
    exam: "BKKB AP",
    organization: {
      en: "Bangladesh Karmachari Kallyan Board",
      bn: "বাংলাদেশ কর্মচারী কল্যাণ বোর্ড",
    },
    questionCount: 62,
  },
  {
    slug: "combined-bank-officer-it-2026",
    bank: "bank-it",
    title: {
      en: "Combined Bank Officer IT 2026 — Full Solution",
      bn: "কম্বাইন্ড ব্যাংক অফিসার আইটি ২০২৬ — সম্পূর্ণ সমাধান",
    },
    description: {
      en: "Technical Q2–Q16 from Combined Bank Officer (IT) 2026 (based year 2024) with Answer → Explanation → Related info → Exam tip.",
      bn: "কম্বাইন্ড ব্যাংক অফিসার (আইটি) ২০২৬ (বেসড বছর ২০২৪) টেকনিক্যাল Q2–Q16 — উত্তর → ব্যাখ্যা → সম্পর্কিত তথ্য → পরীক্ষার টিপ।",
    },
    year: 2026,
    exam: "Combined Bank Officer IT",
    organization: {
      en: "Combined Bank (based year 2024)",
      bn: "কম্বাইন্ড ব্যাংক (বেসড বছর ২০২৪)",
    },
    questionCount: 15,
  },
  {
    slug: "combined-bank-ap-ame-so-it-o-it-2026-based-2023",
    bank: "bank-it",
    title: {
      en: "Combined Bank AP/AME/SO-IT/O-IT 2026 — Full Solution",
      bn: "কম্বাইন্ড ব্যাংক (এপি/এএমই/এসও-আইটি/ও-আইটি) ২০২৬ — সম্পূর্ণ সমাধান",
    },
    description: {
      en: "All 65 technical questions across 5 posts (SO-IT, Officer, AME/AE, AP, DBA) with Answer → Explanation → Related info → Exam tip.",
      bn: "৫টি পদের (এসও-আইটি, অফিসার, এএমই/এই, এপি, ডিবিএ) সব ৬৫টি টেকনিক্যাল প্রশ্ন — উত্তর → ব্যাখ্যা → সম্পর্কিত তথ্য → পরীক্ষার টিপ।",
    },
    year: 2026,
    exam: "Combined Bank AP/AME/SO-IT/O-IT",
    organization: {
      en: "Combined Bank (based year 2023)",
      bn: "কম্বাইন্ড ব্যাংক (বেসড বছর ২০২৩)",
    },
    questionCount: 65,
  },
];

export function getBankPaper(slug: string) {
  return bankPapers.find((p) => p.slug === slug);
}

export function getBankPapersByBank(bankSlug: string) {
  return bankPapers.filter((p) => p.bank === bankSlug);
}

export const bankCategories: BankCategory[] = [
  {
    slug: "bank-it",
    title: { en: "Bank IT", bn: "ব্যাংক আইটি" },
    description: {
      en: "Bangladesh Bank, Sonali, Rupali, Agrani & private bank IT officer archives.",
      bn: "বাংলাদেশ ব্যাংক, সোনালী, রূপালী, অগ্রণী ও বেসরকারি ব্যাংক আইটি অফিসার আর্কাইভ।",
    },
    organization: { en: "Bangladesh Bank & others", bn: "বাংলাদেশ ব্যাংক ও অন্যান্য" },
    icon: "Landmark",
    color: "success",
  },
  {
    slug: "bpsc-it",
    title: { en: "BPSC IT", bn: "বিপিএসসি আইটি" },
    description: {
      en: "Assistant Programmer, IT Officer and ADC circular-based written archives.",
      bn: "সহকারী প্রোগ্রামার, আইটি অফিসার ও এডিসি বিজ্ঞপ্তিভিত্তিক লিখিত প্রশ্নের আর্কাইভ।",
    },
    organization: { en: "Public Service Commission", bn: "সরকারি কর্ম কমিশন" },
    icon: "Building2",
    color: "violet",
  },
  {
    slug: "power-sector-it",
    title: { en: "Power Sector IT", bn: "পাওয়ার সেক্টর আইটি" },
    description: {
      en: "BPDB, REB, PBSA and gas distribution IT unit papers.",
      bn: "বিপিডিবি, আরইবি, পিবিএসএ ও গ্যাস বিতরণ ইউনিটের আইটি পেপার।",
    },
    organization: { en: "Power & Energy ministries", bn: "বিদ্যুৎ ও জ্বালানি মন্ত্রণালয়" },
    icon: "Zap",
    color: "warning",
  },
  {
    slug: "gas-field-it",
    title: { en: "Gas Field IT", bn: "গ্যাস ফিল্ড আইটি" },
    description: {
      en: "BAPEX, Sylhet Gas Fields and E&P IT assistant archives.",
      bn: "ব্যাপেক্স, সিলেট গ্যাস ফিল্ডস ও ইঅ্যাপি-র আইটি সহকারী আর্কাইভ।",
    },
    organization: { en: "Energy & Mineral Resources", bn: "জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়" },
    icon: "Flame",
    color: "danger",
  },
  {
    slug: "ntrca",
    title: { en: "NTRCA", bn: "এনটিআরসিএ" },
    description: {
      en: "School & college IT lecturer registration MCQ + written archives.",
      bn: "স্কুল ও কলেজ আইটি লেকচারার নিবন্ধন এমসিকিউ + লিখিত আর্কাইভ।",
    },
    organization: { en: "Teacher Registration Council", bn: "শিক্ষক নিবন্ধন কাউন্সিল" },
    icon: "GraduationCap",
    color: "cyan",
  },
  {
    slug: "others",
    title: { en: "Others", bn: "অন্যান্য" },
    description: {
      en: "a2i, ICT Division, health/defence IT and non-cadre postings.",
      bn: "এটুআই, আইসিটি বিভাগ, স্বাস্থ্য/প্রতিরক্ষা আইটি ও নন-ক্যাডার নিয়োগ।",
    },
    organization: { en: "Various ministries", bn: "বিভিন্ন মন্ত্রণালয়" },
    icon: "LayoutGrid",
    color: "lime",
  },
];

const questions: Array<[string, string, number, string, string]> = [
  // [bank, question-bn, year, exam, group]
  ["bank-it", "বাংলাদেশ ব্যাংকের সদর দপ্তরে কতটি জোন আছে?", 2023, "BB IT Officer", "A"],
  ["bank-it", "SQL-এ একটি টেবিলের সব কলাম নির্বাচন করতে কোন সিনট্যাক্স ব্যবহার হয়?", 2023, "BB IT Officer", "A"],
  ["bank-it", "কোন প্রোটোকল ওয়েব পেজ ট্রান্সফার করে?", 2022, "Sonali Bank IT", "B"],
  ["bank-it", "রিলেশনাল ডেটাবেসে প্রাইমারি কির বৈশিষ্ট্য কী?", 2022, "Sonali Bank IT", "A"],
  ["bank-it", "192.168.1.0/24 নেটওয়ার্কে কতটি হোস্ট ঠিকানা পাওয়া যায়?", 2024, "Agrani Bank IT", "A"],
  ["bank-it", "TCP/IP মডেলে কয়টি লেয়ার আছে?", 2024, "Rupali Bank IT", "A"],
  ["bank-it", "ইনফ্লেশন কমাতে বাংলাদেশ ব্যাংকের প্রধান হাতিয়ার কোনটি?", 2023, "BB General", "B"],
  ["bank-it", "কোনটি নন-ভোলাটাইল মেমরি?", 2021, "BB IT Officer", "A"],
  ["bank-it", "MySQL-এ AUTO_INCREMENT কী করে?", 2024, "BB IT Officer", "A"],
  ["bank-it", "ডেবিট কার্ডের সাথে ক্রেডিট কার্ডের মূল পার্থক্য কী?", 2022, "Janata Bank IT", "B"],
  ["bank-it", "ISO ৯০০১ কী ধরনের স্ট্যান্ডার্ড?", 2023, "Sonali Bank IT", "A"],
  ["bank-it", "ব্যাংকিং সফটওয়্যারে SWIFT কী কাজে লাগে?", 2024, "BB IT Officer", "A"],
  ["bpsc-it", "সহকারী প্রোগ্রামার পরীক্ষায় নেগেটিভ মার্কিংয়ের হার কত?", 2023, "AP Written", "A"],
  ["bpsc-it", "বাংলাদেশের সংবিধান কত নম্বর সংশোধনীতে সংশোধিত হয়েছে?", 2023, "ADCS General", "B"],
  ["bpsc-it", "কোন ডেটা স্ট্রাকচারে FIFO নীতি প্রযোজ্য?", 2022, "AP Written", "A"],
  ["bpsc-it", "বাংলা ভাষায় প্রথম সাহিত্য নিদর্শন কোনটি?", 2022, "ADCS General", "B"],
  ["bpsc-it", "ISO/OSI মডেলে রুটিং কোন লেয়ারে হয়?", 2024, "AP IT", "A"],
  ["bpsc-it", "১৯৭১ সালের মুক্তিযুদ্ধে মুজিবনগর সরকার গঠন কবে?", 2024, "ADCS General", "B"],
  ["bpsc-it", "নর্মালাইজেশনের ৩য় ধাপে কী দূর করা হয়?", 2021, "AP Written", "A"],
  ["bpsc-it", "কোন বিভাগে বাংলাদেশের সর্বোচ্চ পরিমাণ চা উৎপাদন হয়?", 2021, "ADCS General", "B"],
  ["bpsc-it", "8086 প্রসেসরের রেজিস্টার প্রস্থ কত বিট?", 2023, "AP IT", "A"],
  ["bpsc-it", "পঞ্চম পঞ্চবার্ষিকী পরিকল্পনার মেয়াদ কত ছিল?", 2020, "ADCS General", "B"],
  ["bpsc-it", "গ্রাফের DFS ট্রাভারসালে কোন ডেটা স্ট্রাকচার ব্যবহৃত হয়?", 2024, "AP IT", "A"],
  ["power-sector-it", "বিপিডিবি-র সদর দপ্তর কোথায়?", 2023, "AE IT", "A"],
  ["power-sector-it", "সাবনেট মাস্ক /25 কয়টি হোস্ট দেয়?", 2023, "SAE IT", "A"],
  ["power-sector-it", "কোনটি রিনিউয়েবল এনার্জি সোর্স?", 2022, "AE IT", "B"],
  ["power-sector-it", "Linux-এ ফাইল অনুমতি 755 মানে কী?", 2024, "SAE IT", "A"],
  ["power-sector-it", "গ্রিড সিঙ্ক্রোনাইজেশনের শর্ত কোনটি নয়?", 2022, "AE Electrical", "A"],
  ["power-sector-it", "UPS কোন ধরনের ডিভাইস?", 2021, "SAE IT", "A"],
  ["power-sector-it", "কোন টপোলজিতে একটি কেবল কাট গেলে পুরো নেটওয়ার্ক বন্ধ হয়?", 2024, "AE IT", "A"],
  ["power-sector-it", "কারাদোঘার পারমাণবিক কেন্দ্র কোন জেলায়?", 2021, "General", "B"],
  ["power-sector-it", "সার্ভারের RAID ১ কী নিশ্চিত করে?", 2023, "SAE IT", "A"],
  ["power-sector-it", "জ্যামিতিক অগ্রগতির সমষ্টি সূত্র কী?", 2020, "General", "A"],
  ["gas-field-it", "সিলেট গ্যাস ফিল্ডস কোন সালে প্রতিষ্ঠিত?", 2022, "IT Assistant", "A"],
  ["gas-field-it", "প্রাকৃতিক গ্যাসের প্রধান উপাদান কোনটি?", 2023, "IT Assistant", "A"],
  ["gas-field-it", "কোন কমান্ড লিনাক্সে ডিস্ক ব্যবহার দেখায়?", 2024, "IT Assistant", "A"],
  ["gas-field-it", "কাজিরাঙ্গা জাতীয় উদ্যান কোথায়?", 2021, "General", "B"],
  ["gas-field-it", "ব্যাপেক্স কোন মন্ত্রণালয়ের অধীনে?", 2023, "IT Assistant", "A"],
  ["gas-field-it", "মিথেনের রাসায়নিক সংকেত কী?", 2022, "IT Assistant", "A"],
  ["gas-field-it", "DNS কী করে?", 2024, "IT Assistant", "A"],
  ["ntrca", "শিক্ষক নিবন্ধন কাউন্সিল প্রতিষ্ঠার বছর কোনটি?", 2023, "Lecturer MCQ", "A"],
  ["ntrca", "কোনটি প্রাথমিক শিক্ষার বাধ্যতামূলক বিষয়?", 2022, "Lecturer MCQ", "B"],
  ["ntrca", "Object-oriented programming-এ কোড পুনর্ব্যবহারের প্রধান মাধ্যম কোনটি?", 2024, "IT Lecturer", "A"],
  ["ntrca", "Theory of computation-এ রেগুলার ভাষা কোন অটোমেটা দিয়ে প্রকাশযোগ্য?", 2024, "IT Lecturer", "A"],
  ["ntrca", "Bangabandhu কবে ভাষা আন্দোলনে নেতৃত্ব দেন?", 2021, "Lecturer MCQ", "B"],
  ["ntrca", "DBMS-এ ACID-এর 'D' কী নির্দেশ করে?", 2023, "IT Lecturer", "A"],
  ["ntrca", "শিক্ষা সম্পর্কে বাংলা প্রবন্ধের লেখক কে?", 2020, "Lecturer MCQ", "B"],
  ["ntrca", "Quick sort-এর গড় সময় জটিলতা কত?", 2024, "IT Lecturer", "A"],
  ["others", "a2i প্রোগ্রামটি কোন মন্ত্রণালয়ের অধীনে কাজ করে?", 2023, "a2i IT", "A"],
  ["others", "ই-গভর্ন্যান্সের প্রধান উদ্দেশ্য কী?", 2024, "ICT Division", "A"],
  ["others", "NID সফটওয়্যারটি কোন সংস্থা পরিচালনা করে?", 2022, "ICT Division", "A"],
  ["others", "স্বাস্থ্য বাতায়নের হটলাইন নম্বর কত?", 2023, "Health IT", "B"],
  ["others", "প্রতিরক্ষা মন্ত্রণালয়ের অধীনে কোন সেনাবাহিনীর ইউনিট?", 2021, "Defence IT", "A"],
  ["others", "স্মার্ট ফোনে IMEI কী?", 2024, "ICT Division", "A"],
  ["others", "Cyber Security Act কত সালে প্রণয়ন হয়?", 2023, "ICT Division", "B"],
  ["others", "Data Center বলতে কী বোঝায়?", 2022, "a2i IT", "A"],
  ["others", "কোনটি বাংলাদেশের জাতীয় সংসদের নির্বাচন সংক্রান্ত কমিশন?", 2020, "General", "B"],
  ["others", "Cloud computing-এ ' elasticity' মানে কী?", 2024, "ICT Division", "A"],
  ["others", "প্রজেক্ট ম্যানেজমেন্টে Gantt chart কী দেখায়?", 2023, "a2i IT", "A"],
  ["others", "বাংলাদেশের সর্বোচ্চ পরিমাণ ইন্টারনেট সংযোগ আসে কোন মাধ্যমে?", 2024, "ICT Division", "A"],
  ["others", "HTTP vs HTTPS-এর মূল পার্থক্য কী?", 2022, "Health IT", "A"],
  ["others", "Project scope statement-এ কী থাকে?", 2023, "a2i IT", "A"],
  ["others", "কোনটি ভবিষ্যদ্বাণীমূলক অ্যানালিটিক্সের উদাহরণ?", 2024, "ICT Division", "A"],
];

export const writtenQAs: WrittenQA[] = questions.map(([bank, q, year, exam, group], i) => ({
  id: `wqa-${String(i + 1).padStart(3, "0")}`,
  bank,
  question: { en: q, bn: q },
  year,
  exam,
  group,
}));

export function getBank(slug: string) {
  return bankCategories.find((b) => b.slug === slug);
}

export function getWrittenByBank(slug: string) {
  return writtenQAs.filter((w) => w.bank === slug);
}

export const guides: Guide[] = [
  {
    slug: "aptitude-shortcut-methods",
    title: {
      en: "Aptitude shortcuts that actually appear in IT officer exams",
      bn: "আইটি অফিসার পরীক্ষায় আসা প্রকৃত অ্যাপটিটিউড শর্টকাট",
    },
    excerpt: {
      en: "Profit-loss ratios, time-speed-distance templates and the five percentage tricks worth memorizing.",
      bn: "লাভ-ক্ষতি অনুপাত, সময়-গতি-দূরত্বের টেমপ্লেট ও মনে রাখার মতো পাঁচটি শতাংশ কৌশল।",
    },
    category: "aptitude",
    minutes: 7,
    author: "Tanvir H.",
  },
  {
    slug: "viva-transcript-bank-it",
    title: {
      en: "Real viva transcript: Bank IT Officer, Dhaka board",
      bn: "প্রকৃত ভিভা ট্রানস্ক্রিপ্ট: ব্যাংক আইটি অফিসার, ঢাকা বোর্ড",
    },
    excerpt: {
      en: "They asked about SQL joins, core banking, and 'why banking?'. Here's the full flow with answers that landed.",
      bn: "এসকিউএল জয়েন, কোর ব্যাংকিং আর 'কেন ব্যাংকিং?' — প্রশ্নের পুরো ধারা ও যে উত্তরে পাস হয়েছিল।",
    },
    category: "viva",
    minutes: 9,
    author: "Sadia R.",
  },
  {
    slug: "six-month-study-plan",
    title: {
      en: "The 6-month plan for working professionals",
      bn: "চাকররতদের জন্য ৬ মাসের প্ল্যান",
    },
    excerpt: {
      en: "Ninety minutes a day, topic order that minimizes rework, and when to start full mocks.",
      bn: "দিনে নব্বই মিনিট, পুনরায় কাজ কমানোর টপিক ক্রম আর ফুল মক শুরু করার সঠিক সময়।",
    },
    category: "strategy",
    minutes: 6,
    author: "Rakib A.",
  },
  {
    slug: "ntrca-screening-hacks",
    title: {
      en: "NTRCA screening: how to choose answers when unsure",
      bn: "এনটিআরসিএ স্ক্রিনিং: নিশ্চিত না হলে উত্তর বাছাইয়ের কৌশল",
    },
    excerpt: {
      en: "Elimination order, negative-marking math, and why 60 confident attempts beat 100 guesses.",
      bn: "বাদ দেওয়ার ক্রম, নেগেটিভ মার্কের হিসাব আর ১০০ অনুমানের চেয়ে ৬০ নিশ্চিত উত্তর কেন ভালো।",
    },
    category: "strategy",
    minutes: 5,
    author: "Imran K.",
  },
  {
    slug: "viva-common-questions-it",
    title: {
      en: "25 viva questions every IT candidate should rehearse",
      bn: "প্রতিটি আইটি প্রার্থীর মুখস্থ করা উচিত ২৫টি ভিভা প্রশ্ন",
    },
    excerpt: {
      en: "From 'explain normal forms' to 'where do you see yourself' — with one-line answers that sound sharp.",
      bn: "'নরমাল ফর্ম ব্যাখ্যা করুন' থেকে 'নিজেকে কোথায় দেখছেন' — স্পষ্ট ও সংক্ষিপ্ত উত্তরসহ।",
    },
    category: "viva",
    minutes: 8,
    author: "Sadia R.",
  },
  {
    slug: "aptitude-mixed-practice-set",
    title: {
      en: "Mixed aptitude set: 20 problems with the fastest solving path",
      bn: "মিশ্র অ্যাপটিটিউড সেট: দ্রুত সমাধানের পথে ২০ সমস্যা",
    },
    excerpt: {
      en: "Work-rate, permutation and average problems — solved the way top scorers actually approach them.",
      bn: "কাজের হার, পারমিউটেশন ও গড়ের সমস্যা — টপ স্কোরাররা যেভাবে সমাধান করে।",
    },
    category: "aptitude",
    minutes: 10,
    author: "Tanvir H.",
  },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Afsana Karim", xp: 14820, score: 23, avatarHue: 280 },
  { rank: 2, name: "Rakib Hasan", xp: 13940, score: 22, avatarHue: 150 },
  { rank: 3, name: "Sadia Rahman", xp: 13110, score: 21, avatarHue: 200 },
  { rank: 4, name: "Tanvir Ahmed", xp: 12480, score: 21, avatarHue: 40 },
  { rank: 5, name: "Nusrat Jahan", xp: 11920, score: 20, avatarHue: 330 },
  { rank: 6, name: "Imran Kabir", xp: 11340, score: 20, avatarHue: 100 },
  { rank: 7, name: "Farhana Islam", xp: 10870, score: 19, avatarHue: 20 },
  { rank: 8, name: "Shuvo Das", xp: 10430, score: 19, avatarHue: 250 },
  { rank: 9, name: "Mehedi Chowdhury", xp: 9980, score: 18, avatarHue: 180 },
  { rank: 10, name: "Tania Akter", xp: 9640, score: 18, avatarHue: 310 },
];
