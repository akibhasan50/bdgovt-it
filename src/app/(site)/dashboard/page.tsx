import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your prep at a glance — streak, XP, score trend and weak topics.",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?from=/dashboard");

  return (
    <DashboardView
      user={{
        name: session.user.name ?? "Aspirant",
        email: session.user.email ?? "",
      }}
    />
  );
}
