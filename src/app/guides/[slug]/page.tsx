import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getGuideMeta, getGuidePage } from "@/lib/data";

export function generateStaticParams() {
  return getGuideMeta().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) return { title: "Guide not found" };
  return {
    title: page.meta.title,
    description: `${page.meta.eyebrow} — guide on paste-co.de`,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) notFound();

  return (
    <main className="page-offset-tight min-h-screen px-4 pb-10 md:px-8 md:pb-14">
      <div className="mx-auto w-full max-w-4xl">
        <div className="glass mb-6 flex flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
          <Link className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs" href="/guides">
            <ChevronLeft className="h-3.5 w-3.5" />
            Guides
          </Link>
          <div className="h-8 w-px bg-wash/10" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
              {page.meta.eyebrow}
            </p>
            <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-3xl">
              {page.meta.title}
            </h1>
          </div>
        </div>
        <div
          className="guide-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </main>
  );
}
