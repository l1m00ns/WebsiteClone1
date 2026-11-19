"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Download,
  Eye,
  Flag,
  FolderOpen,
  MoreHorizontal,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import type { ProjectCardData } from "@/types";
import { RISK_STYLES } from "@/lib/game-media";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DemoAction } from "@/components/site/DemoAction";

function riskClass(level: string) {
  return RISK_STYLES[level.toUpperCase()] ?? "text-muted-foreground";
}

export function ProjectCard({
  project,
  index = 0,
  layout = "grid",
}: {
  project: ProjectCardData;
  index?: number;
  layout?: "grid" | "list";
}) {
  const [rep, setRep] = useState(project.stars);
  const [voted, setVoted] = useState<-1 | 0 | 1>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const category = project.category.toLowerCase().replace(" / ", "/");
  const preview = project.previewImage || "/brand/placeholder.svg";
  const risk = project.riskLevel && project.riskLevel !== "N/A" ? project.riskLevel.toUpperCase() : null;
  const delay = `${Math.min(index * 30, 420)}ms`;

  const up = () => {
    if (voted === 1) return;
    setRep((value) => value + 1);
    setVoted(1);
  };
  const down = () => {
    if (voted === -1) return;
    setRep((value) => value - 1);
    setVoted(-1);
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/project/${project.id}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
    setMenuOpen(false);
  };

  const actions = (
    <div className="relative z-20 flex items-center gap-1 pt-1.5">
      <DemoAction
        className="h-9 flex-1 gap-1.5 text-xs"
        title="Downloads are disabled"
        description="This is a static visual clone of paste-co.de. Project archives are not redistributed here."
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </DemoAction>
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={up}
          className={cn(
            "inline-flex h-8 items-center gap-1 rounded-[11px] px-1.5 font-mono text-2xs tabular-nums transition-[background-color,color,transform,border-radius] duration-500 ease-spring hover:rounded-[16px] hover:bg-wash/10 active:scale-90",
            voted === 1 ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
          title="+rep"
          aria-label="+rep"
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>{rep}</span>
        </button>
        <button
          type="button"
          onClick={down}
          className={cn(
            "inline-flex h-8 items-center gap-1 rounded-[11px] px-1.5 font-mono text-2xs tabular-nums transition-[background-color,color,transform,border-radius] duration-500 ease-spring hover:rounded-[16px] hover:bg-wash/10 active:scale-90",
            voted === -1 ? "text-destructive" : "text-muted-foreground hover:text-foreground",
          )}
          title="-rep"
          aria-label="-rep"
        >
          <ThumbsDown className="h-3.5 w-3.5" />
          <span>0</span>
        </button>
      </div>
      <div className="relative">
        <button
          type="button"
          aria-label={`More options for ${project.name}`}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="btn-icon-liquid"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-30 cursor-default"
              onClick={() => setMenuOpen(false)}
            />
            <div className="glass-thick absolute bottom-10 right-0 z-40 w-48 rounded-[14px] p-1.5">
              <Link
                href={`/project/${project.id}`}
                className="flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-wash/[0.07]"
              >
                <FolderOpen className="h-3.5 w-3.5" /> Open project
              </Link>
              <Link
                href={`/project/${project.id}/source`}
                className="flex items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-wash/[0.07]"
              >
                <Eye className="h-3.5 w-3.5" /> Browse source
              </Link>
              <button
                type="button"
                onClick={copyLink}
                className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-left text-xs text-foreground transition-colors hover:bg-wash/[0.07]"
              >
                <Star className="h-3.5 w-3.5" /> {copied ? "Link copied" : "Copy link"}
              </button>
              <DemoAction
                as="inline"
                className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-1.5 text-left text-xs text-destructive transition-colors hover:bg-destructive/10"
                title="Report source"
                description="Reporting is disabled in this static clone. Use the original paste-co.de site for moderation actions."
              >
                <Flag className="h-3.5 w-3.5" /> Report
              </DemoAction>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  if (layout === "list") {
    return (
      <article
        className="glass group relative isolate flex items-center gap-3 rounded-[22px] p-2.5 animate-fade-in-up"
        style={{ animationDelay: delay, animationFillMode: "backwards" }}
      >
        <Link
          href={`/project/${project.id}`}
          className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-[14px] bg-wash/[0.04] sm:w-40"
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" className="h-full w-full object-cover" loading="lazy" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="flex items-center gap-1.5 font-mono text-2xs text-muted-foreground">
            <span className="truncate">{category}</span>
            <span>· {project.fileType}</span>
          </p>
          <h3 className="min-w-0">
            <Link href={`/project/${project.id}`} className="line-clamp-1 text-sm font-medium text-card-foreground hover:text-primary">
              {project.name}
            </Link>
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">{project.description || "No description."}</p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-2xs text-muted-foreground">
            <span className="flex items-center gap-1" title={`${project.downloads} downloads`}>
              <Download className="h-3 w-3" /> {formatNumber(project.downloads)}
            </span>
            <span className="flex items-center gap-1" title={`${project.views} views`}>
              <Eye className="h-3 w-3" /> {formatNumber(project.views)}
            </span>
            <span className="flex items-center gap-1" title={project.createdAt}>
              <Clock className="h-3 w-3" /> {project.age}
            </span>
            {risk ? (
              <span className={cn("rounded-full px-2 py-0.5 font-mono text-3xs uppercase tracking-wider", riskClass(risk))} title={`Security scan: ${risk}`}>
                {risk}
              </span>
            ) : null}
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <DemoAction
            className="h-9 gap-1.5 px-3 text-xs"
            title="Downloads are disabled"
            description="This is a static visual clone of paste-co.de. Project archives are not redistributed here."
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </DemoAction>
          <Link href={`/project/${project.id}`} className="btn-icon-liquid" aria-label={`Open ${project.name}`}>
            <FolderOpen className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className="glass group relative isolate flex h-full flex-col rounded-[26px] p-2 animate-fade-in-up"
      style={{ animationDelay: delay, animationFillMode: "backwards" }}
    >
      <Link
        href={`/project/${project.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-[20px] bg-wash/[0.04]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt={`Preview of ${project.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-liquid group-hover:scale-[1.07]"
        />
        <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgb(var(--wash)/0.08)]" />
        {risk ? (
          <span
            className={cn(
              "glass-thick absolute right-2 top-2 rounded-full px-2 py-0.5 font-mono text-3xs uppercase tracking-wider transition-transform duration-500 ease-spring group-hover:scale-110",
              riskClass(risk),
            )}
            title={`Security scan: ${risk} (score ${project.riskScore})`}
          >
            {risk}
          </span>
        ) : null}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2 px-2 pb-1 pt-3">
        <p className="flex min-w-0 items-center gap-1.5 font-mono text-2xs text-muted-foreground">
          <span className="truncate">{category}</span>
          <span className="shrink-0">· {project.fileType}</span>
        </p>
        <h3 className="min-w-0">
          <Link
            href={`/project/${project.id}`}
            className="line-clamp-1 font-medium leading-snug text-card-foreground transition-colors hover:text-primary"
          >
            {project.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description || "No description."}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-1 font-mono text-2xs text-muted-foreground">
          <span className="flex items-center gap-1" title={`${project.downloads} downloads`}>
            <Download className="h-3 w-3" /> {formatNumber(project.downloads)}
          </span>
          <span className="flex items-center gap-1" title={`${project.views} views`}>
            <Eye className="h-3 w-3" /> {formatNumber(project.views)}
          </span>
          <span title={project.createdAt}>{project.age}</span>
        </div>
        {actions}
      </div>
    </article>
  );
}

export function ProjectGrid({
  projects,
  layout = "grid",
}: {
  projects: ProjectCardData[];
  layout?: "grid" | "list";
}) {
  return (
    <div
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[2600px]:grid-cols-6"
          : "flex flex-col gap-3",
      )}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} layout={layout} />
      ))}
    </div>
  );
}
