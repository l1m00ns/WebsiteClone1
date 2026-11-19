import Link from "next/link";
import { Heart, Lock, LogIn } from "lucide-react";
import { DemoAction } from "@/components/site/DemoAction";

export function DonatorOnlyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="page-offset flex min-h-[80vh] items-center justify-center px-4 pb-10">
      <div className="glass w-full max-w-md rounded-[28px] p-7 text-center md:p-8">
        <span className="glass-well mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] text-primary">
          <Lock className="h-6 w-6" />
        </span>
        <p className="mt-5 font-display text-3xs uppercase tracking-widest text-muted-foreground">
          Donator only
        </p>
        <h1 className="mt-1 font-display text-2xl font-medium tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Sign in with Discord so we can check your access. Donators and server boosters get it.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <DemoAction
            as="inline"
            className="btn-liquid inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium"
            title="Discord sign-in unavailable"
            description="Authentication is not wired up in this static clone. The original site checks your Discord roles for donator access."
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </DemoAction>
          <Link
            className="glass-tint inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium"
            href="/donate"
          >
            <Heart className="h-4 w-4" />
            Donate
          </Link>
        </div>
      </div>
    </main>
  );
}
