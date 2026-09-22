import { SiteShell } from "@/components/layout/site-shell";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell>
      {children}
      <SiteFooter />
    </SiteShell>
  );
}
