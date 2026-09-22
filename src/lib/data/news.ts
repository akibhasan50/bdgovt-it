import type { NewsItem } from "@/lib/types";

function iso(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

function inDays(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const news: NewsItem[] = [
  {
    id: "news-01",
    title: {
      en: "BPSC Assistant Programmer (IT) circular — online form open",
      bn: "বিপিএসসি সহকারী প্রোগ্রামার (আইটি) বিজ্ঞপ্তি — অনলাইন ফর্ম চলছে",
    },
    summary: {
      en: "Application window for 46 Assistant Programmer posts under the ICT division is now open. Computer Science & Engineering background eligible.",
      bn: "আইসিটি বিভাগের ৪৬টি সহকারী প্রোগ্রামার পদে আবেদন চলছে। কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং ব্যাকগ্রাউন্ড যোগ্য।",
    },
    source: "BPSC",
    publishedAt: iso(0),
    deadline: inDays(12),
    url: "https://bpsc.gov.bd",
    tags: ["BPSC", "Circular", "IT"],
    hot: true,
  },
  {
    id: "news-02",
    title: {
      en: "Bangladesh Bank SB-13 IT Officer exam date announced",
      bn: "বাংলাদেশ ব্যাংক এসবি-১৩ আইটি অফিসার পরীক্ষার তারিখ ঘোষণা",
    },
    summary: {
      en: "Written exam for the SB-13 grade IT Officer posts scheduled for next month at Dhaka, Chattogram and Rajshahi centres.",
      bn: "এসবি-১৩ গ্রেডের আইটি অফিসার লিখিত পরীক্ষা আগামী মাসে ঢাকা, চট্টগ্রাম ও রাজশাহী কেন্দ্রে।",
    },
    source: "Bangladesh Bank",
    publishedAt: iso(1),
    deadline: inDays(20),
    url: "https://www.bb.org.bd",
    tags: ["Bank", "Exam Date"],
    hot: true,
  },
  {
    id: "news-03",
    title: {
      en: "NTRCA 10th registration renewal window opens for IT lecturers",
      bn: "এনটিআরসিএ ১০ম রেজিস্ট্রেশন নবায়নের উইন্ডো খুলেছে (আইটি লেকচারার)",
    },
    summary: {
      en: "Primary registration renewal for the 10th teacher registration exam — IT discipline applicants should complete KYC before the deadline.",
      bn: "১০ম শিক্ষক নিবন্ধন পরীক্ষার প্রাথমিক রেজিস্ট্রেশন নবায়ন — আইটি বিভাগের আবেদনকারীদের সময়সীমার আগে কেওয়াইসি সম্পন্ন করতে হবে।",
    },
    source: "NTRCA",
    publishedAt: iso(2),
    deadline: inDays(7),
    url: "https://ntrca.teletalk.com.bd",
    tags: ["NTRCA", "Registration"],
  },
  {
    id: "news-04",
    title: {
      en: "Power Sector (BPDB/REB) IT unit recruitment — 120 vacancies",
      bn: "পাওয়ার সেক্টর (বিপিডিবি/আরইবি) আইটি ইউনিট নিয়োগ — ১২০টি শূন্য পদ",
    },
    summary: {
      en: "Combined recruitment notice for Assistant Engineer (IT) and Sub-Assistant Engineer across the power distribution companies.",
      bn: "বিদ্যুৎ বিতরণ কোম্পানিগুলোতে সহকারী প্রকৌশলী (আইটি) ও উপ-সহকারী প্রকৌশলীর সমন্বিত বিজ্ঞপ্তি।",
    },
    source: "Bangladesh Power Development Board",
    publishedAt: iso(3),
    deadline: inDays(15),
    url: "https://bpdb.org.bd",
    tags: ["Power Sector", "Circular"],
  },
  {
    id: "news-05",
    title: {
      en: "A2I recruits IT officers for Digital Bangladesh initiative",
      bn: "এটুআই ডিজিটাল বাংলাদেশ উদ্যোগের জন্য আইটি অফিসার নিয়োগ দিচ্ছে",
    },
    summary: {
      en: "Access to Information (a2i) programme opening positions for full-stack and network engineers under the ICT Division.",
      bn: "তথ্যপ্রবেশ (এটুআই) প্রোগ্রামে আইসিটি বিভাগের অধীনে ফুল-স্ট্যাক ও নেটওয়ার্ক ইঞ্জিনিয়ারের পদ খুলেছে।",
    },
    source: "a2i",
    publishedAt: iso(5),
    deadline: inDays(9),
    url: "https://a2i.gov.bd",
    tags: ["a2i", "Circular"],
  },
  {
    id: "news-06",
    title: {
      en: "Gazipur/Sylhet Gas Fields IT assistant — viva schedule published",
      bn: "গাজীপুর/সিলেট গ্যাস ফিল্ডস আইটি সহকারী — ভিভা সূচি প্রকাশ",
    },
    summary: {
      en: "Viva-voce for the shortlisted IT assistant candidates starts next week; admit cards available on the official portal.",
      bn: "শর্টলিস্ট করা আইটি সহকারী প্রার্থীদের ভিভা-ভয়স আগামী সপ্তাহে শুরু; প্রবেশপত্র অফিসিয়াল পোর্টালে।",
    },
    source: "Sylhet Gas Fields Company",
    publishedAt: iso(6),
    url: "https://sgfcl.com.bd",
    tags: ["Gas Field", "Viva"],
  },
  {
    id: "news-07",
    title: {
      en: "ICT Division opens applications for Software Engineer (13th grade)",
      bn: "আইসিটি বিভাগে সফটওয়্যার ইঞ্জিনিয়ার (১৩তম গ্রেড) পদে আবেদন চলছে",
    },
    summary: {
      en: "Ministry recruitment for the e-Governance cell — CS/IT graduates with GPA requirements apply via the teletalk portal.",
      bn: "ই-গভর্ন্যান্স সেলের জন্য মন্ত্রণালয়ের নিয়োগ — সিএস/আইটি স্নাতক টেলিটক পোর্টালে আবেদন করবেন।",
    },
    source: "ICT Division",
    publishedAt: iso(8),
    deadline: inDays(4),
    url: "https://ict.gov.bd",
    tags: ["Government", "Circular"],
  },
  {
    id: "news-08",
    title: {
      en: "Teletalk application fee payment window extended by 3 days",
      bn: "টেলিটক আবেদন ফি পরিশোধের সময় ৩ দিন বাড়ল",
    },
    summary: {
      en: "Candidates who submitted forms but failed to pay can complete payment — most recent extension applies to all ongoing IT postings.",
      bn: "ফর্ম জমা দিয়ে ফি দিতে না পারা প্রার্থীরা এখন পরিশোধ করতে পারবেন — চলমান সব আইটি নিয়োগে প্রযোজ্য।",
    },
    source: "Teletalk",
    publishedAt: iso(9),
    url: "https://apply.teletalk.com.bd",
    tags: ["Fee", "Extension"],
  },
];

export function getNews(id: string) {
  return news.find((n) => n.id === id);
}
