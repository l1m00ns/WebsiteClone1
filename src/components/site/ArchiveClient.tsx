"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  List,
  Megaphone,
  X,
} from "lucide-react";
import type { CategoryGroup } from "@/lib/data";
import { formatNumber } from "@/lib/format";
import type { ArchiveProject } from "@/lib/archive";
import { cn } from "@/lib/utils";
import { GameIcon } from "@/components/site/GameIcon";
import { ProjectGrid } from "@/components/site/ProjectCard";

const PAGE_SIZE = 24;

const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "downloads", label: "Most downloaded" },
  { id: "views", label: "Most viewed" },
  { id: "az", label: "A – Z" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function ChevronIcon({ className }: { className?: string }) {
  return <ChevronDown className={className} aria-hidden="true" />;
}

function Stat({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div className="px-1">
      <dt className="flex items-center gap-1 text-3xs text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

function CategorySidebar({
  groups,
  total,
  selected,
  onSelect,
}: {
  groups: CategoryGroup[];
  total: number;
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const activeGroup = selected?.includes(" / ") ? selected.split(" / ")[0] : selected;

  return (
    <aside
      className="sticky-below-status sticky hidden w-64 shrink-0 lg:block"
      style={{
        height:
          "calc(100vh - var(--status-bar-height, 68px) - var(--status-bar-gap, 12px) - 12px)",
      }}
    >
      <div className="glass flex h-full flex-col overflow-hidden rounded-[28px]">
        <nav
          className="scrollbar-none min-h-0 flex-1 overflow-y-auto overscroll-contain p-2.5"
          aria-label="Categories"
        >
          <p className="px-3 pb-2 pt-2 font-display text-3xs uppercase tracking-widest text-muted-foreground">
            Categories
          </p>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={cn(
              "relative isolate mb-1 flex h-10 w-full items-center justify-between rounded-[12px] px-3 text-left text-sm transition-colors",
              selected === null ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={selected === null ? "page" : undefined}
          >
            {selected === null ? (
              <span className="glass-pill absolute inset-0 -z-10 rounded-[12px]" />
            ) : null}
            <span>All projects</span>
            <span className="font-mono text-2xs tabular-nums text-muted-foreground">
              {formatNumber(total)}
            </span>
          </button>
          <ul className="flex flex-col">
            {groups.map((group) => {
              const isOpen = expanded === group.name;
              const isActive = activeGroup === group.name;
              const hasSubs = group.subcategories.length > 0;
              return (
                <li key={group.name}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => {
                      if (hasSubs) setExpanded(isOpen ? null : group.name);
                      onSelect(group.name);
                    }}
                    className={cn(
                      "group/row relative isolate flex h-9 w-full items-center gap-2.5 rounded-[12px] px-3 text-left text-sm transition-colors",
                      isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && !selected?.includes(" / ") ? (
                      <span className="glass-pill absolute inset-0 -z-10 rounded-[12px]" />
                    ) : null}
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center transition-transform duration-500 ease-spring group-hover/row:scale-125 group-hover/row:-rotate-6">
                      <GameIcon name={group.name} className="h-4 w-4" />
                    </span>
                    <span className="flex-1 truncate">{group.name}</span>
                    <span className="font-mono text-2xs tabular-nums text-muted-foreground">
                      {formatNumber(group.count)}
                    </span>
                    {hasSubs ? (
                      <span
                        className={cn(
                          "flex text-muted-foreground transition-transform duration-500 ease-liquid",
                          isOpen && "rotate-180",
                        )}
                      >
                        <ChevronIcon className="h-3.5 w-3.5" />
                      </span>
                    ) : null}
                  </button>
                  {hasSubs && isOpen ? (
                    <ul className="mb-1 ml-[1.65rem] mt-0.5 flex flex-col gap-0.5 border-l border-wash/[0.07] pl-2">
                      {group.subcategories.map((sub) => (
                        <li key={sub.full}>
                          <button
                            type="button"
                            onClick={() => onSelect(sub.full)}
                            className={cn(
                              "relative isolate flex h-8 w-full items-center justify-between rounded-[10px] px-2.5 text-left text-xs transition-colors",
                              selected === sub.full
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span className="truncate">{sub.name}</span>
                            <span className="font-mono text-2xs tabular-nums text-muted-foreground/70">
                              {formatNumber(sub.count)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-wash/[0.06] p-3">
          <dl className="glass-well mb-3 grid grid-cols-3 gap-1 rounded-[16px] p-2.5">
            <Stat label="Projects" value="2.8k" />
            <Stat label="Downloads" value="135.5k" />
            <Stat
              label={
                <span className="flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Online
                </span>
              }
              value="32"
            />
          </dl>
          <div className="flex items-center justify-between gap-2 px-1">
            <p className="text-2xs leading-snug text-muted-foreground">
              Runs on donations.
              <br />
              Donors get booster perks.
            </p>
            <Link className="btn-liquid h-8 shrink-0 px-3 text-xs" href="/donate">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function ArchiveClient({
  projects,
  groups,
  total,
  announcement,
  initialCategory = null,
  children,
}: {
  projects: ArchiveProject[];
  groups: CategoryGroup[];
  total: number;
  announcement: string;
  initialCategory?: string | null;
  children?: React.ReactNode;
}) {
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [sort, setSort] = useState<SortId>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const base = category
      ? projects.filter((project) =>
          category.includes(" / ") ? project.category === category : project.game === category,
        )
      : projects;
    const sorted = [...base];
    switch (sort) {
      case "oldest":
        sorted.sort((a, b) => a.createdMs - b.createdMs);
        break;
      case "downloads":
        sorted.sort((a, b) => b.downloads - a.downloads);
        break;
      case "views":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "az":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => b.createdMs - a.createdMs);
    }
    return sorted;
  }, [projects, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const selectCategory = (value: string | null) => {
    setCategory(value);
    setPage(1);
  };

  const pageWindow = useMemo(() => {
    const pages: number[] = [];
    const start = Math.max(1, Math.min(safePage - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    for (let index = start; index <= end; index += 1) pages.push(index);
    return pages;
  }, [safePage, totalPages]);

  return (
    <div className="page-offset-tight">
      <div className="flex gap-5 px-3">
        <CategorySidebar
          groups={groups}
          total={total}
          selected={category}
          onSelect={selectCategory}
        />
        <div className="min-w-0 flex-1">
          <div className="lg:hidden">
            <div className="scrollbar-none -mx-3 flex gap-1 overflow-x-auto px-3 py-1">
              <button
                type="button"
                onClick={() => selectCategory(null)}
                className={cn(
                  "relative isolate shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors",
                  category === null ? "text-white" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-0 -z-10 rounded-full",
                    category === null ? "glass-tint" : "bg-wash/[0.06]",
                  )}
                />
                All
              </button>
              {groups.map((group) => (
                <button
                  key={group.name}
                  type="button"
                  onClick={() => selectCategory(group.name)}
                  className={cn(
                    "relative isolate shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors",
                    category === group.name ? "text-white" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full",
                      category === group.name ? "glass-tint" : "bg-wash/[0.06]",
                    )}
                  />
                  {group.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pb-12 pt-5 md:px-2 md:pt-6">
            <h1 className="sr-only">paste-co.de archive</h1>

            <div className="glass flex flex-wrap items-center gap-2 rounded-[22px] p-2 pl-4">
              <p className="text-sm text-muted-foreground">
                <span className="inline-block font-mono text-foreground">
                  {formatNumber(filtered.length)}
                </span>{" "}
                projects
              </p>
              <div className="ml-auto flex shrink-0 items-center gap-1.5">
                <div className="relative">
                  <button
                    type="button"
                    className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs"
                    aria-haspopup="menu"
                    aria-expanded={sortOpen}
                    onClick={() => setSortOpen((value) => !value)}
                  >
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    <span className="text-foreground">
                      {SORTS.find((option) => option.id === sort)?.label}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {sortOpen ? (
                    <>
                      <button
                        type="button"
                        aria-label="Close sort menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setSortOpen(false)}
                      />
                      <div className="glass-thick absolute right-0 top-[calc(100%+8px)] z-50 w-48 rounded-[14px] p-1.5">
                        {SORTS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              setSort(option.id);
                              setPage(1);
                              setSortOpen(false);
                            }}
                            className={cn(
                              "flex w-full items-center rounded-[10px] px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-wash/[0.07]",
                              sort === option.id
                                ? "text-primary"
                                : "text-foreground",
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                <div
                  className="glass-well flex h-9 items-center rounded-[14px] p-1"
                  role="group"
                  aria-label="Layout"
                >
                  <button
                    type="button"
                    className={cn(
                      "relative isolate flex h-full items-center rounded-[10px] px-2.5 transition-colors",
                      layout === "grid" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-label="Grid view"
                    aria-pressed={layout === "grid"}
                    onClick={() => setLayout("grid")}
                  >
                    {layout === "grid" ? (
                      <span className="glass-pill absolute inset-0 -z-10 rounded-[10px]" />
                    ) : null}
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "relative isolate flex h-full items-center rounded-[10px] px-2.5 transition-colors",
                      layout === "list" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-label="List view"
                    aria-pressed={layout === "list"}
                    onClick={() => setLayout("list")}
                  >
                    {layout === "list" ? (
                      <span className="glass-pill absolute inset-0 -z-10 rounded-[10px]" />
                    ) : null}
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="glass mt-4 flex items-center gap-3 rounded-[20px] px-4 py-3">
              <span className="glass-tint flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px]">
                <Megaphone className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm leading-snug text-foreground">{announcement}</p>
            </div>

            <a
              href="https://imgui.fun"
              target="_blank"
              rel="noopener sponsored noreferrer"
              className="glass group mt-4 flex flex-col gap-4 overflow-hidden rounded-[24px] p-3 transition-transform duration-500 ease-spring hover:-translate-y-0.5 sm:flex-row sm:items-center sm:p-3 sm:pr-5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                width={1200}
                height={630}
                loading="lazy"
                className="aspect-[40/21] w-full shrink-0 rounded-[18px] object-cover shadow-[0_0_0_1px_var(--glass-hairline)] sm:w-60"
                src="/sponsors/imgui-fun.jpg"
              />
              <div className="hidden min-w-0 flex-1 px-1 pb-1 sm:block sm:px-0 sm:pb-0">
                <span className="text-3xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Sponsored — imgui.fun
                </span>
                <p className="mt-1 font-display text-lg font-medium leading-snug tracking-tight text-foreground">
                  Dear ImGui menus with full C++ source
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  30+ designs · Visual Studio solution · DX11
                </p>
              </div>
              <span className="glass-tint mx-1 mb-1 inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium transition-[filter] duration-300 group-hover:brightness-110 sm:m-0">
                Visit imgui.fun
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>

            <div className="mt-6">
              <ProjectGrid projects={visible} layout={layout} />
            </div>

            {visible.length === 0 ? (
              <div className="glass mt-6 flex flex-col items-center gap-3 rounded-[24px] p-10 text-center">
                <X className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No projects in this category.</p>
                <button type="button" className="btn-liquid h-9 px-4 text-xs" onClick={() => selectCategory(null)}>
                  Show all projects
                </button>
              </div>
            ) : null}

            <nav
              className="mt-10 flex flex-wrap items-center justify-between gap-3"
              aria-label="Pagination"
            >
              <p className="font-mono text-xs text-muted-foreground">
                page {safePage} of {totalPages}
              </p>
              <div className="glass flex items-center gap-0.5 rounded-[20px] p-1.5">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="btn-icon-liquid w-auto gap-1 px-3 text-xs disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Previous
                </button>
                {pageWindow.map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-current={number === safePage ? "page" : undefined}
                    onClick={() => setPage(number)}
                    className={cn(
                      "relative isolate h-9 min-w-9 rounded-[12px] px-2 font-mono text-xs transition-[color,transform] duration-300 ease-spring active:scale-90",
                      number === safePage
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {number === safePage ? (
                      <span className="glass-tint absolute inset-0 -z-10 rounded-[12px]" />
                    ) : null}
                    {number}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  className="btn-icon-liquid w-auto gap-1 px-3 text-xs disabled:pointer-events-none disabled:opacity-30"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </nav>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}



