import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Bot,
  Clock3,
  Database,
  Gift,
  Globe,
  Lightbulb,
  Sparkles,
  Star,
  Wallet,
  Wrench,
} from "lucide-react";
import { DonateWallets } from "@/components/site/DonateWallets";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support paste-co.de — keep the archive online and unlock donator perks across the platform.",
};

const PERKS = [
  {
    icon: Clock3,
    title: "Early access",
    description: "Every new upload is yours 48 hours before everyone else.",
  },
  {
    icon: Sparkles,
    title: "Booster-only sources",
    description: "All the locked booster and donator downloads.",
  },
  {
    icon: Database,
    title: "Dumper offsets",
    description: "Full Roblox offsets from our own dumper, far more than the public set.",
    href: "/roblox#dumper",
  },
  {
    icon: Bot,
    title: "AI agent access",
    description: "Let Claude Code, Cursor and others search and download sources for you.",
    href: "/mcp",
  },
  {
    icon: Globe,
    title: "Web proxy",
    description: "Open any site with ads and redirects blocked, without showing your IP.",
    href: "/proxy",
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "64 browser utilities: formatters, encoders, converters and more.",
    href: "/tools",
  },
  {
    icon: Lightbulb,
    title: "Source requests",
    description: "Ask for a source; donator requests are filled first.",
    href: "/requests",
  },
  {
    icon: BadgeCheck,
    title: "Donator role",
    description: "The Donator role and badge, on the site and in Discord.",
  },
];

export default function DonatePage() {
  return (
    <main className="page-offset mx-auto max-w-2xl px-4 pb-12 md:pb-16">
      <header className="glass mb-8 flex animate-fade-in-up flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6">
        <span className="glass-well flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-primary">
          <Gift className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
            Support the project
          </p>
          <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
            Support paste-co.de
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Your contributions pay for hosting, the database and storage, and keep the site free of
            ads and monthly fees.
          </p>
        </div>
      </header>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-lg font-semibold text-foreground">What donators get</h2>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              const inner = (
                <div className="flex h-full gap-3 rounded-lg border border-border bg-card p-3.5 transition-colors group-hover:border-primary/40">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">{perk.title}</span>
                    <span className="block text-xs leading-relaxed text-muted-foreground">
                      {perk.description}
                    </span>
                  </span>
                </div>
              );
              return (
                <li key={perk.title}>
                  {perk.href ? (
                    <Link className="group block h-full" href={perk.href}>
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-5 rounded-lg border border-primary/30 bg-card p-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-md space-y-2">
              <p className="inline-flex items-center gap-1.5 font-display text-3xs uppercase tracking-wider text-primary">
                <Star className="h-3 w-3" />
                Recommended
              </p>
              <h2 className="text-lg font-semibold text-foreground">Cryptocurrency (Sell.app)</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Support the platform using your preferred cryptocurrency via Sell.app. Pay what you
                want, and you get the Donator role, which includes every booster perk,
                automatically.
              </p>
            </div>
            <button
              type="button"
              disabled
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground opacity-50"
            >
              <Wallet className="h-4 w-4" />
              Donate
            </button>
          </div>
        </section>

        <DonateWallets />
      </div>
    </main>
  );
}
