import type { ReactNode } from "react";

export type Locale = "bn" | "en";

export type Localized = { en: string; bn: string };

export type TopicDifficulty = "easy" | "medium" | "hard";

export type TopicColor =
  | "violet"
  | "lime"
  | "cyan"
  | "warning"
  | "success"
  | "danger";

export type Topic = {
  slug: string;
  title: Localized;
  description: Localized;
  icon: string;
  color: TopicColor;
  questionCount: number;
  chapters: number;
  difficulty: TopicDifficulty;
  /** How often this topic shows up in real govt IT exams, 0-100 */
  examWeight: number;
  related: string[];
};

export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: Localized }
  | { type: "paragraph"; text: Localized }
  | { type: "list"; items: Localized[] }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; tone: "tip" | "warning" | "info"; text: Localized };

export type TopicChapter = {
  slug: string;
  title: Localized;
  content: ContentBlock[];
};

export type MCQ = {
  id: string;
  topic: string;
  question: Localized;
  options: Localized[];
  answer: number;
  explanation: Localized;
  difficulty: TopicDifficulty;
  source?: string;
};

export type ExamStatus = "live" | "upcoming" | "past";

export type Exam = {
  id: string;
  title: Localized;
  description: Localized;
  status: ExamStatus;
  startsAt: string;
  durationMin: number;
  totalMarks: number;
  negativeMark: number;
  questionIds: string[];
  participants?: number;
  organization: Localized;
};

export type NewsItem = {
  id: string;
  title: Localized;
  summary: Localized;
  source: string;
  publishedAt: string;
  deadline?: string;
  url: string;
  tags: string[];
  hot?: boolean;
};

export type BankCategory = {
  slug: string;
  title: Localized;
  description: Localized;
  organization: Localized;
  icon: string;
  color: TopicColor;
};

export type WrittenQA = {
  id: string;
  bank: string;
  question: Localized;
  year: number;
  exam: string;
  group: string;
  answer?: string;
  paperSlug?: string;
  qNo?: number;
  detail?: ReactNode;
};

export type Guide = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: "aptitude" | "viva" | "strategy";
  minutes: number;
  author: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  xp: number;
  score: number;
  avatarHue: number;
};

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  image?: string;
};
