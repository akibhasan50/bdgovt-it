import Link from "next/link";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/layout/logo";
import { topics } from "@/lib/data/topics";
import { bankCategories } from "@/lib/data/banks";

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="mt-auto border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          <FooterCol
            title={t("footer.product")}
            links={[
              { href: "/practice", label: t("nav.practice") },
              { href: "/exams", label: t("nav.exams") },
              { href: "/banks", label: t("nav.banks") },
              { href: "/pricing", label: t("subscription.proName") },
            ]}
          />
          <FooterCol
            title={t("footer.resources")}
            links={[
              { href: "/topics", label: t("nav.topics") },
              { href: "/news", label: t("nav.news") },
              { href: "/guides", label: t("nav.guides") },
              { href: `/topics/${topics[0].slug}`, label: t("topics.startTopic") },
            ]}
          />
          <FooterCol
            title={t("footer.company")}
            links={[
              { href: "/news", label: bankCategories[1].title.en },
              { href: "/guides", label: t("guides.strategy") },
              { href: "/dashboard", label: t("common.dashboard") },
              { href: "/login", label: t("nav.login") },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} IT Job Prep BD. {t("footer.rights")}
          </p>
          <p>{t("footer.builtFor")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">
        {title}
      </p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
