import type { Metadata } from "next";
import { LogIn, Shield } from "lucide-react";
import { DemoAction } from "@/components/site/DemoAction";

export const metadata: Metadata = {
  title: "Source Scanner",
  description: "Scan source code or a zip for malware patterns, obfuscation, and known threats.",
};

export default function ScannerPage() {
  return (
    <main className="page-offset">
      <div className="mx-auto max-w-[100rem] px-4 py-6 md:px-6">
        <header className="glass mb-5 flex animate-fade-in-up flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
          <span className="glass-well flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-primary">
            <Shield className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Source Scanner
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Scan source code or a zip for malware patterns, obfuscation, and known threats.
            </p>
          </div>
        </header>

        <div className="space-y-4 rounded-xl border border-border bg-card p-8 text-center">
          <Shield className="mx-auto h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">Login required</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Log in with Discord to use the scanner.
            </p>
          </div>
          <DemoAction
            as="inline"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            title="Discord sign-in unavailable"
            description="Authentication is not wired up in this static clone. The original site scans uploaded files server-side after Discord login."
          >
            <LogIn className="h-4 w-4" />
            Login with Discord
          </DemoAction>
        </div>
      </div>
    </main>
  );
}
