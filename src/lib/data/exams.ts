import type { Exam } from "@/lib/types";

/** question pools are ids from the MCQ bank — see src/lib/data/mcqs.ts */
const bankPool = [
  "oop-01", "oop-02", "oop-03", "sql-01", "sql-02", "db-02", "db-03",
  "net-01", "net-02", "net-04", "os-01", "os-03", "prog-02", "prog-04",
  "linux-01", "sec-01", "sec-02", "web-01",
];

const bpscPool = [
  "dl-01", "dl-02", "dl-04", "mp-01", "mp-04", "ds-01", "ds-02",
  "daa-01", "daa-03", "db-01", "sql-03", "net-03", "os-02", "os-04",
  "sec-03", "toc-01", "toc-02", "cloud-01", "prog-01", "prog-05",
  "dm-01", "dm-02", "dc-01", "dc-03",
];

const powerPool = [
  "dl-03", "ds-03", "ds-04", "ds-05", "daa-02", "daa-04", "db-04",
  "sql-04", "prog-03", "mp-02", "mp-03", "linux-02", "linux-03", "linux-04",
  "net-05", "se-01", "se-02", "se-03", "sec-04", "cloud-02", "cloud-03",
  "ml-01", "web-02", "web-04",
];

function daysFromNow(days: number, hour = 10) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const exams: Exam[] = [
  {
    id: "live-full-mock-01",
    title: {
      en: "BPSC IT Officer — Full Mock #12",
      bn: "বিপিএসসি আইটি অফিসার — ফুল মক #১২",
    },
    description: {
      en: "Live now: 24 MCQs, 30 minutes, BPSC-style negative marking.",
      bn: "এখন চলছে: ২৪টি এমসিকিউ, ৩০ মিনিট, বিপিএসসি ধাঁচের নেগেটিভ মার্কিং।",
    },
    status: "live",
    startsAt: daysFromNow(0, new Date().getHours()),
    durationMin: 30,
    totalMarks: 24,
    negativeMark: 0.5,
    questionIds: bpscPool,
    participants: 342,
    organization: { en: "BPSC", bn: "বিপিএসসি" },
  },
  {
    id: "upcoming-bank-it-08",
    title: {
      en: "Bank IT Officer — Weekly Mock #08",
      bn: "ব্যাংক আইটি অফিসার — সাপ্তাহিক মক #০৮",
    },
    description: {
      en: "DBMS, SQL, networking and programming heavy — the bank exam mix.",
      bn: "ডিবিএমএস, এসকিউএল, নেটওয়ার্কিং ও প্রোগ্রামিং বেশি — ব্যাংক পরীক্ষার মিশ্রণ।",
    },
    status: "upcoming",
    startsAt: daysFromNow(2, 20),
    durationMin: 25,
    totalMarks: 18,
    negativeMark: 0.25,
    questionIds: bankPool,
    organization: { en: "Bangladesh Bank / Sonali", bn: "বাংলাদেশ ব্যাংক / সোনালী" },
  },
  {
    id: "upcoming-power-05",
    title: {
      en: "Power Sector IT — Mock #05",
      bn: "পাওয়ার সেক্টর আইটি — মক #০৫",
    },
    description: {
      en: "Data structures, algorithms, Linux and systems — BPDB/REB style.",
      bn: "ডেটা স্ট্রাকচার, অ্যালগরিদম, লিনাক্স ও সিস্টেমস — বিপিডিবি/আরইবি ধাঁচে।",
    },
    status: "upcoming",
    startsAt: daysFromNow(5, 11),
    durationMin: 40,
    totalMarks: 24,
    negativeMark: 0.5,
    questionIds: powerPool,
    organization: { en: "BPDB / REB / PBSA", bn: "বিপিডিবি / আরইবি / পিবিএসএ" },
  },
  {
    id: "upcoming-ntrca-03",
    title: {
      en: "NTRCA IT Lecturer — Screening Mock",
      bn: "এনটিআরসিএ আইটি লেকচারার — স্ক্রিনিং মক",
    },
    description: {
      en: "MCQ screening practice across the full CS fundamentals syllabus.",
      bn: "সম্পূর্ণ সিএস ফান্ডামেন্টাল সিলেবাসে এমসিকিউ স্ক্রিনিং প্র্যাকটিস।",
    },
    status: "upcoming",
    startsAt: daysFromNow(8, 10),
    durationMin: 60,
    totalMarks: 40,
    negativeMark: 0,
    questionIds: [...bpscPool, ...bankPool],
    organization: { en: "NTRCA", bn: "এনটিআরসিএ" },
  },
  {
    id: "past-full-mock-11",
    title: {
      en: "BPSC IT Officer — Full Mock #11",
      bn: "বিপিএসসি আইটি অফিসার — ফুল মক #১১",
    },
    description: {
      en: "Completed last week — 1,204 participants, avg score 14.6.",
      bn: "গত সপ্তাহে শেষ — ১,২০৪ জন অংশগ্রহণ, গড় স্কোর ১৪.৬।",
    },
    status: "past",
    startsAt: daysFromNow(-7, 10),
    durationMin: 30,
    totalMarks: 24,
    negativeMark: 0.5,
    questionIds: bpscPool,
    participants: 1204,
    organization: { en: "BPSC", bn: "বিপিএসসি" },
  },
  {
    id: "past-bank-it-07",
    title: {
      en: "Bank IT Officer — Weekly Mock #07",
      bn: "ব্যাংক আইটি অফিসার — সাপ্তাহিক মক #০৭",
    },
    description: {
      en: "Completed — top score 17/18. Review answers now open.",
      bn: "শেষ — সর্বোচ্চ স্কোর ১৭/১৮। উত্তর রিভিউ খোলা।",
    },
    status: "past",
    startsAt: daysFromNow(-14, 20),
    durationMin: 25,
    totalMarks: 18,
    negativeMark: 0.25,
    questionIds: bankPool,
    participants: 876,
    organization: { en: "Bangladesh Bank", bn: "বাংলাদেশ ব্যাংক" },
  },
  {
    id: "past-gas-field-02",
    title: {
      en: "Gas Field IT — Mock #02",
      bn: "গ্যাস ফিল্ড আইটি — মক #০২",
    },
    description: {
      en: "Completed — systems, security and networking focus.",
      bn: "শেষ — সিস্টেমস, সিকিউরিটি ও নেটওয়ার্কিং ফোকাস।",
    },
    status: "past",
    startsAt: daysFromNow(-21, 11),
    durationMin: 30,
    totalMarks: 20,
    negativeMark: 0,
    questionIds: [...bankPool.slice(0, 10), ...powerPool.slice(0, 10)],
    participants: 512,
    organization: { en: "BAPEX / Sylhet Gas", bn: "ব্যাপেক্স / সিলেট গ্যাস" },
  },
];

export function getExam(id: string) {
  return exams.find((e) => e.id === id);
}

export function getExamsByStatus(status: Exam["status"]) {
  return exams.filter((e) => e.status === status);
}
