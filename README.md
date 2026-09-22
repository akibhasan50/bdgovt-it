# IT Job Prep BD

A modern, mobile-first Bangladesh government IT job exam preparation platform — MCQ drills, timed mock exams, written Q&amp;A archives, news circulars and strategy guides.

> Improvement of [it.jobqns.com](https://it.jobqns.com) built with Next.js App Router, shadcn/ui, Tailwind v4 and a Gen-Z dark-first design system.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js **16** (App Router, Turbopack) |
| UI | shadcn/ui (radix-nova), Tailwind CSS v4, Framer Motion |
| State | Zustand (ui / practice / progress stores, persisted) |
| Data | TanStack Query + Table + Virtual, local typed data layer |
| Forms | React Hook Form + Zod |
| Auth | Auth.js (NextAuth v5 beta) |
| i18n | next-intl (bn / en, cookie-based) |
| Charts | Recharts |
| Content | MDX (`next-mdx-remote`) |
| PWA | manifest + service worker |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo account: `demo@itjobprep.bd` / `demo1234`.

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # serve production build
pnpm lint     # eslint
```

Type-check:

```bash
pnpm exec next typegen
pnpm exec tsc --noEmit
```

## Project structure

```
src/
  app/
    (site)/       # marketing + content routes (header/footer shell)
    (focus)/      # focus-mode routes (exam intro, results, practice session)
    api/          # Auth.js route handler
    layout.tsx    # root layout, fonts, next-intl provider
    sitemap.ts    # dynamic sitemap
    robots.ts     # robots.txt
    manifest.ts   # PWA manifest
  components/     # feature + ui components
  lib/            # types, utils, data layer, server actions
  hooks/          # useMounted, useHydrateProgress
  stores/         # ui, practice, progress (Zustand)
  i18n/           # next-intl request config
messages/         # bn / en translation catalogs
content/topics/   # MDX chapter content
public/           # PWA icons, service worker
```

## Features

- **Topic-wise MCQ practice** with instant feedback and explanations (practice mode)
- **Timed mock sessions** with countdown, auto-submit and scoring (mock mode)
- **Mock exams** directory with live / upcoming / past states and result pages
- **Written Q&amp;A archives** with TanStack Table (sort, filter, paginate)
- **Dashboard** with XP, streaks, weak topics, bookmarks and score trend
- **Command palette** (⌘K) across topics, questions, exams, banks and news
- **News circulars**, **strategy guides** and **pricing** pages
- **bn / en** locale toggle, dark-first theme, PWA installable

## Data

All content lives in typed local modules under `src/lib/data/`:

- `mcqs.ts` — MCQ bank + helpers (`getMCQTopics`, `getMCQsByIds`, `shuffle`)
- `topics.ts` — 19 CS fundamentals topics
- `exams.ts` — live / upcoming / past mock exams
- `banks.ts` — job bank categories, written Q&amp;A, guides, leaderboard
- `news.ts` — circulars &amp; announcements

MDX chapter content lives in `content/topics/*.mdx`.

## Deploy

```bash
pnpm build
pnpm start
```

Or deploy the repo to Vercel / any Node host. Set `AUTH_SECRET` (and optional `AUTH_*` providers) for production Auth.js.

## License

Private / all rights reserved unless otherwise noted.
