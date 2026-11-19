import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getLegalContent } from "@/lib/data";
import type { LegalSlug } from "@/types";

const META: Record<LegalSlug, { title: string; updated: string }> = {
  privacy: { title: "Privacy Policy", updated: "2 April 2026" },
  terms: { title: "Terms of Service", updated: "2 April 2026" },
  cookies: { title: "Cookie Policy", updated: "2 April 2026" },
  safety: { title: "Safety & Scanning", updated: "2 April 2026" },
};

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const meta = META[slug];
  const content = getLegalContent(slug);

  return (
    <main className="page-offset">
      <div className="min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <header className="glass mb-6 flex flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
            <Link className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs" href="/">
              <ChevronLeft className="h-3.5 w-3.5" />
              Archive
            </Link>
            <div className="hidden h-8 w-px bg-wash/10 sm:block" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                paste-co.de
              </p>
              <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {meta.title}
              </h1>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Last updated: {meta.updated}
              </p>
            </div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <footer className="mt-16 border-t border-border pt-6">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <Link className="transition-colors hover:text-foreground" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/terms">
                Terms of Service
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/cookies">
                Cookie Policy
              </Link>
              <Link className="transition-colors hover:text-foreground" href="/safety">
                Safety &amp; Scanning
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
