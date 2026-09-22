import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Free forever — streaks, XP, bookmarks and mock exams for BD govt IT job prep.",
};

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID);

  return <RegisterForm googleEnabled={googleEnabled} />;
}
