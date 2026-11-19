import type { Metadata } from "next";
import { RobloxClient } from "@/components/site/RobloxClient";
import { ROBLOX_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Roblox",
  description:
    "Roblox versions, offsets, FFlags and the deployment downloader, refreshed after every update.",
};

export default function RobloxPage() {
  return (
    <main className="page-offset min-h-screen px-4 pb-10 md:px-8 md:pb-14">
      <RobloxClient
        offsets={ROBLOX_DATA.offsets}
        offsetsMeta={ROBLOX_DATA.offsetsMeta}
        versions={ROBLOX_DATA.versions}
      />
      <section className="mx-auto mt-8 grid w-full max-w-[100rem] gap-6 rounded-[24px] border border-wash/10 p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-foreground">What are Roblox offsets?</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Offsets are memory addresses relative to the Roblox executable base, pointing to
              specific functions and structures. Researchers use them to study engine behavior and
              develop external tooling.
            </p>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-foreground">How are they updated?</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Roblox updates several times a week, shifting the memory layout each time. Offsets
              here are re-dumped shortly after each update.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-foreground">Understanding FFlags</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Fast Flags are runtime toggles Roblox engineers use to switch features on or off
              without a client update. Tracking them reveals upcoming features, performance changes
              and hidden diagnostics.
            </p>
          </div>
          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-foreground">Educational use</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              All data is provided for educational purposes, for people learning reverse
              engineering, memory management and platform security analysis.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
