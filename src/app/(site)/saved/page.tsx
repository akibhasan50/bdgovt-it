import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SavedView } from "@/components/dashboard/saved-view";

export const metadata: Metadata = {
  title: "Saved",
  description: "Your bookmarked questions — the revision list that comes first.",
};

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?from=/saved");

  return <SavedView />;
}
