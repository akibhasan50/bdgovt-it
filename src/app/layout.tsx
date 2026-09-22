import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Noto_Sans_Bengali } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itjobprep.bd"),
  title: {
    default: "IT Job Prep BD — Govt IT job exam preparation",
    template: "%s · IT Job Prep BD",
  },
  description:
    "Topic-wise MCQ drills, timed mock exams and written Q&A archives for Bank IT, BPSC IT, Power Sector IT and all govt IT job exams in Bangladesh.",
  keywords: [
    "IT job prep Bangladesh",
    "BPSC IT MCQ",
    "Bank IT officer exam",
    "govt IT job exam",
    "NTRCA IT",
    "MCQ practice BD",
  ],
  openGraph: {
    type: "website",
    siteName: "IT Job Prep BD",
    title: "IT Job Prep BD — Govt IT job exam preparation",
    description:
      "MCQ practice, timed mocks and question-bank archives for Bangladesh govt IT job exams.",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Job Prep BD",
    description: "Govt IT job exam prep — fast, gamified, mobile-first.",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "IT Job Prep BD",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#151220" },
    { media: "(prefers-color-scheme: light)", color: "#faf7fc" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${bengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
