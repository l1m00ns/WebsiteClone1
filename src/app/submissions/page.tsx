import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Community Submissions",
  description:
    "Submit a project to the paste-co.de archive. Submissions go into a review queue, and an admin publishes them.",
};

export default function SubmissionsPage() {
  return (
    <main className="page-offset min-h-screen px-4 pb-12 md:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="glass mb-6 flex animate-fade-in-up flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
          <Link className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs" href="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            Archive
          </Link>
          <div className="hidden h-8 w-px bg-wash/10 sm:block" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Submit a project
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Fill in the fields below. Submissions go into a review queue, and an admin publishes
              them.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm">
          <div className="glass-well rounded-[16px] border border-transparent px-3.5 py-3">
            <p className="text-sm text-muted-foreground/80">
              Login with Discord from the header, then come back here to submit.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
