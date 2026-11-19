"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  FileCode2,
  Flag,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Upload,
} from "lucide-react";
import type { CommunityOffset } from "@/types";
import { cn } from "@/lib/utils";
import { DemoAction } from "@/components/site/DemoAction";
import { PageHeader } from "@/components/site/PageHeader";

function OffsetCard({ offset }: { offset: CommunityOffset }) {
  const [up, setUp] = useState(offset.up);
  const [down, setDown] = useState(offset.down);
  const [vote, setVote] = useState<-1 | 0 | 1>(0);

  const upvote = () => {
    if (vote === 1) return;
    setUp((value) => value + 1);
    if (vote === -1) setDown((value) => value - 1);
    setVote(1);
  };
  const downvote = () => {
    if (vote === -1) return;
    setDown((value) => value + 1);
    if (vote === 1) setUp((value) => value - 1);
    setVote(-1);
  };

  return (
    <article className="relative rounded-lg border border-border/60 bg-background/50 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-secondary/20">
      <div className="absolute right-3 top-3 z-10">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={upvote}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-[11px] border border-wash/10 px-1.5 font-mono text-2xs tabular-nums transition-[background-color,color,transform,border-radius] duration-500 ease-spring hover:rounded-[16px] hover:bg-wash/10 active:scale-90",
              vote === 1 ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
            title="+rep"
            aria-label="+rep"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{up}</span>
          </button>
          <button
            type="button"
            onClick={downvote}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-[11px] border border-wash/10 px-1.5 font-mono text-2xs tabular-nums transition-[background-color,color,transform,border-radius] duration-500 ease-spring hover:rounded-[16px] hover:bg-wash/10 active:scale-90",
              vote === -1 ? "text-destructive" : "text-muted-foreground hover:text-foreground",
            )}
            title="-rep"
            aria-label="-rep"
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>{down}</span>
          </button>
        </div>
      </div>
      <div className="min-w-0 pr-28">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
            {offset.game}
          </span>
          <span className="truncate text-xs text-muted-foreground">{offset.date}</span>
        </div>
        <p className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
          <FileCode2 className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{offset.fileName}</span>
        </p>
        <p className="mt-1 truncate text-xs text-muted-foreground">{offset.meta}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <DemoAction
            as="inline"
            className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-2 text-xs text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
            title="Comments"
            description="Comments are disabled in this static clone."
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{offset.comments}</span>
          </DemoAction>
          <DemoAction
            as="inline"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-muted-foreground transition-all duration-200 hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
            title="Report source"
            description="Reporting is disabled in this static clone."
          >
            <Flag className="h-3.5 w-3.5" />
            <span>Report</span>
          </DemoAction>
        </div>
        <DemoAction
          as="inline"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          title="Download file"
          description="Offset files are not redistributed in this static clone."
        >
          <Download className="h-3.5 w-3.5" />
        </DemoAction>
      </div>
    </article>
  );
}

export function CommunityOffsets({ offsets }: { offsets: CommunityOffset[] }) {
  const [game, setGame] = useState("all");
  const [uploadGame, setUploadGame] = useState("");

  const games = useMemo(
    () => [...new Set(offsets.map((offset) => offset.game))].sort(),
    [offsets],
  );
  const filtered = game === "all" ? offsets : offsets.filter((offset) => offset.game === game);

  return (
    <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col space-y-8">
      <PageHeader
        title="Community offsets"
        description="Upload and browse community-contributed game offsets (JSON, C++, C#)."
        backLabel="Archive"
      />

      <div className="flex animate-fade-in-up flex-col gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <span className="whitespace-nowrap text-sm text-muted-foreground">Filter by Game:</span>
            <div className="relative">
              <select
                aria-label="Filter by game"
                value={game}
                onChange={(event) => setGame(event.target.value)}
                className="flex h-10 w-[180px] appearance-none items-center justify-between rounded-xl border border-input bg-background/85 px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">All Games</option>
                {games.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <span className="whitespace-nowrap text-sm text-muted-foreground">Upload to:</span>
            <div className="relative">
              <select
                aria-label="Upload to game"
                value={uploadGame}
                onChange={(event) => setUploadGame(event.target.value)}
                className="flex h-10 w-[160px] appearance-none items-center justify-between rounded-xl border border-input bg-background/85 px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select Game</option>
                {games.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <DemoAction
            className="h-9 gap-1.5 px-4 text-sm"
            title="Upload offset file"
            description="Uploads require a signed-in Discord session on the original paste-co.de. This static clone does not accept files."
          >
            <Upload className="h-3.5 w-3.5" />
            Upload File
          </DemoAction>
        </div>
      </div>

      <div className="animate-fade-in-up overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Offset Files
          </span>
          <span className="text-xs text-muted-foreground">{filtered.length}</span>
        </div>
        <div className="grid max-h-[700px] grid-cols-1 gap-4 overflow-y-auto p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((offset) => (
            <OffsetCard key={offset.id} offset={offset} />
          ))}
          {filtered.length === 0 ? (
            <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No offset files for this game yet.
            </p>
          ) : null}
        </div>
      </div>

      <p className="pb-4 text-center font-mono text-xs text-muted-foreground">
        Looking for the full Roblox dump?{" "}
        <Link href="/roblox" className="text-primary hover:underline">
          Open Roblox offsets
        </Link>
      </p>
    </div>
  );
}
