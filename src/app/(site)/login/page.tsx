import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to keep your streak, XP and bookmarks in sync.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const sp = await searchParams;
  const from = typeof sp.from === "string" ? sp.from : undefined;
  const initialError = sp.error === "CredentialsSignin";
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID);

  return (
    <LoginForm
      googleEnabled={googleEnabled}
      from={from}
      initialError={initialError}
    />
  );
}
