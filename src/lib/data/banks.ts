import type { BankCategory, Guide, LeaderboardEntry, WrittenQA } from "@/lib/types";

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
