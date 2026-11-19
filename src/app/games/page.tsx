import type { Metadata } from "next";
import { GamesGrid } from "@/components/site/GamesGrid";
import { GAMES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Game updates",
  description: "Current game versions and anti-cheat builds, refreshed automatically.",
};

export default function GamesPage() {
  const games = [...GAMES].sort((a, b) => {
    const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bt - at;
  });

  return (
    <main className="page-offset min-h-screen px-3 pb-12 md:px-5">
      <div className="mx-auto max-w-[100rem] space-y-4">
        <GamesGrid games={games} />
      </div>
    </main>
  );
}
