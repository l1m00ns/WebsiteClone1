"use client";

import { useState } from "react";
import { Activity, ExternalLink, RefreshCw, ShieldCheck } from "lucide-react";
import type { GameUpdate } from "@/types";
import { gameIcon, invertClass } from "@/lib/game-media";
import { cn } from "@/lib/utils";

function formatUpdated(iso: string | null) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatFull(iso: string | null) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function GamesGrid({ games }: { games: GameUpdate[] }) {
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 900);
  };

  return (
    <>
      <header className="glass flex flex-wrap items-center justify-between gap-4 rounded-[24px] p-5 md:p-6">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-foreground">
            Game updates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Current versions and anti-cheat builds, refreshed automatically.
          </p>
        </div>
        <button type="button" className="btn-liquid h-9 gap-1.5 px-4 text-xs" onClick={refresh}>
          <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
          Refresh
        </button>
      </header>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {games.map((game) => {
          const icon = gameIcon(game.game);
          const summary = game.summary && !/^Version:\s*/.test(game.summary) ? game.summary : null;

          return (
            <article key={game.slug} className="glass group flex flex-col gap-4 rounded-[24px] p-5">
              <div className="flex items-center gap-3">
                <span className="glass-well flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] transition-transform duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110">
                  {icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={icon.src}
                      alt=""
                      width={24}
                      height={24}
                      loading="lazy"
                      className={cn("h-6 w-6 object-contain", invertClass(icon))}
                    />
                  ) : (
                    <Activity className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-medium text-foreground">{game.game}</h2>
                  <p className="text-xs text-muted-foreground" title={formatFull(game.updatedAt)}>
                    Updated {formatUpdated(game.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-3xs uppercase tracking-widest text-muted-foreground">Version</p>
                <p
                  className="mt-1 truncate font-mono text-lg text-foreground"
                  title={game.version ?? undefined}
                >
                  {game.version ?? "—"}
                </p>
                {summary ? (
                  <p className="mt-1 truncate font-mono text-2xs text-muted-foreground" title={summary}>
                    {summary}
                  </p>
                ) : null}
              </div>
              {game.eacStatus || game.sourceUrl ? (
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-wash/[0.06] pt-3 text-xs">
                  <span
                    className="flex min-w-0 items-center gap-1.5 text-muted-foreground"
                    title="Anti-cheat build"
                  >
                    {game.eacStatus ? (
                      <>
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="truncate">
                          Anti-cheat{" "}
                          <span className="font-mono text-foreground">{game.eacStatus}</span>
                        </span>
                      </>
                    ) : null}
                  </span>
                  {game.sourceUrl ? (
                    <a
                      href={game.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {game.sourceName ?? game.provider}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>
    </>
  );
}
