import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import { DemoAction } from "@/components/site/DemoAction";

export const metadata: Metadata = {
  title: "Source Requests",
  description: "Ask for a source you can't find. Donator requests are filled first.",
};

export default function RequestsPage() {
  return (
    <main className="page-offset min-h-screen px-4 pb-10 md:px-8 md:pb-14">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="glass flex flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
          <Link className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs" href="/">
            <ArrowLeft className="h-3.5 w-3.5" />
            Archive
          </Link>
          <div className="hidden h-8 w-px bg-wash/10 sm:block" aria-hidden="true" />
          <span className="glass-well flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-primary">
            <MessageSquarePlus className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Source requests
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Ask for a source you can&apos;t find. Donator requests are filled first.
            </p>
          </div>
        </header>

        <section className="glass rounded-[24px] p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Sign in with Discord to request a source.
            </p>
            <DemoAction
              as="inline"
              className="btn-liquid inline-flex h-10 items-center rounded-full px-4 text-sm font-medium"
              title="Discord sign-in unavailable"
              description="Authentication is not wired up in this static clone. The original site lets signed-in users post source requests."
            >
              Sign in
            </DemoAction>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-medium text-foreground">Open (0)</h2>
          <p className="text-sm text-muted-foreground">No open requests.</p>
        </section>
      </div>
    </main>
  );
}
