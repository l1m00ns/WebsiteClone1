"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Apple,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileCode2,
  Flag,
  History,
  Link2,
  Monitor,
  Search,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import type { RobloxEntry, RobloxFile } from "@/types";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DemoAction } from "@/components/site/DemoAction";

type Tab = "offsets" | "fflags" | "dumper" | "versions" | "downloader";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "offsets", label: "Offsets", icon: <FileCode2 className="h-4 w-4 text-primary" /> },
  { id: "fflags", label: "FFlags", icon: <Flag className="h-4 w-4" /> },
  { id: "dumper", label: "Dumper offsets", icon: <Sparkles className="h-4 w-4" /> },
  { id: "versions", label: "Versions", icon: <History className="h-4 w-4" /> },
  { id: "downloader", label: "Downloader", icon: <Download className="h-4 w-4" /> },
];

const PAGE_SIZE = 100;

const EXPLOITS = [
  "Potassium",
  "Xeno",
  "SirHurt",
  "Volt",
  "Velocity",
  "Solara",
  "Wave",
  "Volcano",
];

function FileChips({ prefix }: { prefix: "Offsets" | "FFlags" }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {["hpp", "cs", "json", "txt"].map((extension) => (
        <a
          key={extension}
          href={`https://imtheo.lol/Offsets/${prefix}.${extension}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-wash/10 bg-wash/[0.04] px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <FileCode2 className="h-4 w-4 text-primary" />
          {prefix}.{extension}
        </a>
      ))}
    </div>
  );
}

function DataTable({
  entries,
  label,
  meta,
  prefix,
  files,
}: {
  entries: RobloxEntry[];
  label: string;
  meta: { robloxVersion: string; totalOffsets: number; dumpedAt: string; source: string };
  prefix: "Offsets" | "FFlags";
  files: boolean;
}) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);

  const groups = useMemo(
    () => [...new Set(entries.map((entry) => entry.group))].sort(),
    [entries],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (group !== "all" && entry.group !== group) return false;
      if (!needle) return true;
      return (
        entry.path.toLowerCase().includes(needle) ||
        entry.group.toLowerCase().includes(needle)
      );
    });
  }, [entries, query, group]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {label}
          </h2>
        </div>
        <div className="break-words font-mono text-xs text-muted-foreground">
          {meta.robloxVersion} · {formatNumber(meta.totalOffsets)}{" "}
          {prefix === "FFlags" ? "flags" : "offsets"} · dumped {meta.dumpedAt} ·{" "}
          <a href={meta.source} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            source
          </a>
        </div>
      </div>

      {files ? (
        <div className="space-y-3">
          <h3 className="font-display text-base font-medium text-foreground">Files</h3>
          <FileChips prefix={prefix} />
        </div>
      ) : null}

      <div className="space-y-3">
        <h3 className="font-display text-base font-medium text-foreground">Browse</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className="bezel-control flex h-9 w-full rounded-md border border-input bg-background/85 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                placeholder={`Search ${label.toLowerCase()} paths...`}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="relative">
              <select
                aria-label="Filter by group"
                className="h-9 w-auto min-w-[10rem] appearance-none rounded-md border border-input bg-background/85 px-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={group}
                onChange={(event) => {
                  setGroup(event.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All groups</option>
                {groups.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatNumber(filtered.length)} results</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="px-2 tabular-nums">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)_2rem] gap-2 border-b border-border bg-secondary/50 px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              <span>Path</span>
              <span>Value</span>
              <span>Hex</span>
              <span />
            </div>
            <div className="max-h-[28rem] divide-y divide-border/50 overflow-y-auto">
              {rows.map((entry) => (
                <div
                  key={entry.path}
                  className="group grid grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)_minmax(0,1fr)_2rem] gap-2 px-3 py-2 text-sm transition-colors hover:bg-secondary/30"
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs text-foreground">{entry.path}</p>
                    <p className="font-mono text-[10px] text-muted-foreground/60">{entry.group}</p>
                  </div>
                  <p className="self-center truncate font-mono text-xs text-muted-foreground">
                    {entry.valueText}
                  </p>
                  <p className="self-center truncate font-mono text-xs text-primary">{entry.hexValue}</p>
                  <button
                    type="button"
                    onClick={() => copy(`${entry.path} = ${entry.hexValue}`)}
                    className="flex h-6 w-6 items-center justify-center self-center rounded text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100"
                    title="Copy"
                  >
                    {copied === `${entry.path} = ${entry.hexValue}` ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
              {rows.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No results for “{query}”.
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Download raw:</span>
            {[
              ["JSON", "json"],
              ["TXT", "txt"],
              ["C#", "cs"],
              ["C++", "hpp"],
            ].map(([label, extension]) => (
              <a
                key={extension}
                href={`https://imtheo.lol/Offsets/${prefix}.${extension}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Download className="h-2.5 w-2.5" />
                {label}
              </a>
            ))}
            <a
              href="https://offsets.imtheo.lol"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ExternalLink className="h-2.5 w-2.5" />
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VersionsPanel({ versions }: { versions: RobloxFile["versions"] }) {
  const current = [
    { name: "Windows", icon: <Monitor className="h-4 w-4" />, value: versions.current.Windows, date: versions.current.WindowsDate },
    { name: "Mac", icon: <Apple className="h-4 w-4" />, value: versions.current.Mac, date: versions.current.MacDate },
    { name: "Android", icon: <Smartphone className="h-4 w-4" />, value: versions.current.Android, date: versions.current.AndroidDate },
    { name: "iOS", icon: <Smartphone className="h-4 w-4" />, value: versions.current.iOS, date: versions.current.iOSDate },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Versions
        </h2>
        <div className="break-words font-mono text-xs text-muted-foreground">
          Current builds per platform, plus the future and past channels.
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {current.map((platform) => (
          <div key={platform.name} className="glass-well flex items-center gap-3 rounded-[18px] p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-wash/[0.06] text-primary">
              {platform.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{platform.name}</p>
              <p className="truncate font-mono text-xs text-muted-foreground">{platform.value}</p>
              <p className="text-3xs text-muted-foreground/70">{platform.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Future", data: versions.future },
          { label: "Past", data: versions.past },
        ].map((channel) => (
          <div key={channel.label} className="glass-well space-y-2 rounded-[18px] p-4">
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
              {channel.label}
            </p>
            {Object.entries(channel.data)
              .filter(([key]) => !key.endsWith("Date"))
              .map(([platform, value]) => (
                <div key={platform} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-foreground">{platform}</span>
                  <span className="truncate font-mono text-xs text-muted-foreground">{value}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DownloaderPanel() {
  const [binary, setBinary] = useState("WindowsPlayer");
  const [compress, setCompress] = useState(false);
  const [launcher, setLauncher] = useState(true);
  const [parallel, setParallel] = useState(true);
  const [exploit, setExploit] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="space-y-1.5">
        <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Downloader
        </h2>
        <div className="break-words font-mono text-xs text-muted-foreground">
          Download any Roblox build straight from the deployment CDN.
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-soft">
        <div className="border-b border-border px-5 py-3.5">
          <p className="text-xs font-semibold text-foreground">RDD — Roblox Deployment Downloader</p>
          <p className="text-[11px] text-muted-foreground">
            Powered by{" "}
            <a
              href="https://github.com/latte-soft/rdd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              latte-soft/rdd
            </a>{" "}
            — maintained for <span className="font-medium text-foreground">paste-co.de</span>
          </p>
        </div>
        <div className="p-5">
          <div className="grid items-center gap-x-4 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
            <label className="whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-binary">
              Binary Type
            </label>
            <div className="relative">
              <select
                id="rdd-binary"
                value={binary}
                onChange={(event) => setBinary(event.target.value)}
                className="flex h-8 w-full min-w-[140px] appearance-none items-center rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground transition-colors hover:border-primary/40 focus:outline-none"
              >
                {["WindowsPlayer", "WindowsStudio", "MacPlayer", "MacStudio"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <label className="whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-channel">
              Channel
            </label>
            <input
              id="rdd-channel"
              placeholder="LIVE"
              className="h-8 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              type="text"
            />
            <label className="whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-version">
              Version Hash
            </label>
            <div className="flex items-center gap-2">
              <input
                id="rdd-version"
                placeholder="e.g. version-abc123"
                className="h-8 min-w-0 flex-1 rounded-md border border-input bg-background px-3 font-mono text-xs text-foreground placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                type="text"
              />
              <span className="shrink-0 text-[10px] font-medium text-muted-foreground/50">Optional</span>
            </div>
            <div className="col-span-2 my-1 h-px bg-border" />
            <label className="cursor-pointer whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-compress">
              Compress Zip
            </label>
            <input
              id="rdd-compress"
              className="h-3.5 w-3.5 cursor-pointer justify-self-start accent-primary"
              type="checkbox"
              checked={compress}
              onChange={(event) => setCompress(event.target.checked)}
            />
            <label className="cursor-pointer whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-launcher">
              Include Launcher
            </label>
            <input
              id="rdd-launcher"
              className="h-3.5 w-3.5 cursor-pointer justify-self-start accent-primary"
              type="checkbox"
              checked={launcher}
              onChange={(event) => setLauncher(event.target.checked)}
            />
            <label className="cursor-pointer whitespace-nowrap text-xs text-muted-foreground" htmlFor="rdd-parallel">
              Parallel Downloads
            </label>
            <input
              id="rdd-parallel"
              className="h-3.5 w-3.5 cursor-pointer justify-self-start accent-primary"
              type="checkbox"
              checked={parallel}
              onChange={(event) => setParallel(event.target.checked)}
            />
            <div className="col-span-2 my-1 h-px bg-border" />
            <label className="self-start pt-1 text-xs text-muted-foreground">Exploit</label>
            <div>
              <div className="flex flex-wrap gap-1.5">
                {EXPLOITS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setExploit(exploit === name ? null : name)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                      exploit === name
                        ? "border-primary/50 bg-primary/15 text-primary"
                        : "border-border bg-secondary/60 text-foreground hover:border-primary/40 hover:bg-secondary",
                    )}
                  >
                    <Sparkles className="h-3 w-3" />
                    {name}
                  </button>
                ))}
                <DemoAction
                  as="inline"
                  className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                  title="Exploit builds"
                  description="This static clone does not link to third-party exploit builds."
                >
                  +16 more
                </DemoAction>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Current
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Needs downgrade
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
              Very outdated
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <DemoAction
              className="h-9 gap-1.5 px-4 text-xs"
              title="Roblox downloads are disabled"
              description="This static clone does not download or redistribute Roblox builds. Use the original paste-co.de site for the live deployment downloader."
            >
              <Download className="h-3.5 w-3.5" />
              Download Latest
            </DemoAction>
            <DemoAction
              className="h-9 gap-1.5 px-4 text-xs"
              title="Roblox downloads are disabled"
              description="This static clone does not download or redistribute Roblox builds."
            >
              <History className="h-3.5 w-3.5" />
              Download Previous
            </DemoAction>
            <DemoAction
              className="h-9 gap-1.5 px-4 text-xs"
              title="Roblox downloads are disabled"
              description="This static clone does not download or redistribute Roblox builds."
            >
              <Link2 className="h-3.5 w-3.5" />
              Download Specified
            </DemoAction>
            <DemoAction
              className="h-9 gap-1.5 px-4 text-xs"
              title="Copy link"
              description="Deployment links are not generated in this static clone."
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </DemoAction>
            <a
              href="https://github.com/latte-soft/rdd"
              target="_blank"
              rel="noreferrer"
              className="btn-icon-liquid h-9 w-auto px-4 text-xs"
            >
              Usage Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RobloxClient({
  offsets,
  offsetsMeta,
  versions,
}: {
  offsets: RobloxEntry[];
  offsetsMeta: { robloxVersion: string; totalOffsets: number; dumpedAt: string; source: string };
  versions: RobloxFile["versions"];
}) {
  const [tab, setTab] = useState<Tab>("offsets");
  const [fflags, setFflags] = useState<RobloxEntry[] | null>(null);

  useEffect(() => {
    if (tab !== "fflags" || fflags) return;
    let cancelled = false;
    import("@/data/fflags.json").then((module) => {
      if (cancelled) return;
      const data = module.default as unknown as { entries: RobloxEntry[] };
      setFflags(data.entries);
    });
    return () => {
      cancelled = true;
    };
  }, [tab, fflags]);

  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div className="glass rounded-[24px] p-3">
          <div className="hidden px-3 pb-3 pt-2 lg:block">
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">Roblox</p>
            <p className="mt-1 truncate font-mono text-xs text-foreground">{offsetsMeta.robloxVersion}</p>
          </div>
          <nav
            className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible"
            aria-label="Roblox sections"
          >
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-sm transition-colors",
                  tab === item.id
                    ? "glass-pill font-medium text-foreground"
                    : "text-muted-foreground hover:bg-wash/[0.05] hover:text-foreground",
                )}
              >
                {item.icon}
                {item.label}
                {item.id === "dumper" ? (
                  <Sparkles className="ml-auto h-3 w-3 text-primary" aria-label="Donators" />
                ) : null}
              </button>
            ))}
            <div className="mx-2 my-1 hidden h-px bg-wash/10 lg:block" />
            <Link
              href="/community-offsets"
              className="flex shrink-0 items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-wash/[0.05] hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Community offsets
            </Link>
          </nav>
        </div>
      </aside>

      <main className="glass min-w-0 rounded-[28px] p-5 md:p-8">
        {tab === "offsets" ? (
          <DataTable
            entries={offsets}
            label="Offsets"
            meta={offsetsMeta}
            prefix="Offsets"
            files
          />
        ) : null}
        {tab === "fflags" ? (
          fflags ? (
            <DataTable
              entries={fflags}
              label="FFlags"
              meta={{
                ...offsetsMeta,
                totalOffsets: fflags.length,
              }}
              prefix="FFlags"
              files
            />
          ) : (
            <div className="flex min-h-[16rem] items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse text-primary" />
              Loading FFlags…
            </div>
          )
        ) : null}
        {tab === "dumper" ? (
          <div className="space-y-8">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Dumper offsets
                </h2>
                <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 font-mono text-3xs uppercase tracking-widest text-primary">
                  Donator
                </span>
              </div>
              <div className="break-words font-mono text-xs text-muted-foreground">
                Straight from our own dumper after every Roblox update, with far more than the
                public set: native structures, RakNet and the Luau VM.
              </div>
            </div>
            <div className="glass-well flex flex-col items-center justify-center gap-2 rounded-[20px] px-6 py-16 text-center">
              <Database className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Nothing here yet. The first dump lands after the next Roblox update.
              </p>
              <Link href="/donate" className="btn-liquid mt-2 h-9 px-4 text-xs">
                Unlock donator access
              </Link>
            </div>
          </div>
        ) : null}
        {tab === "versions" ? <VersionsPanel versions={versions} /> : null}
        {tab === "downloader" ? <DownloaderPanel /> : null}
      </main>
    </div>
  );
}
