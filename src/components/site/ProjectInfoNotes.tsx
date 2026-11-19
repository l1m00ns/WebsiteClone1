"use client";

import { useState } from "react";
import { ChevronDown, Tag } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/format";
import { RISK_STYLES } from "@/lib/game-media";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-[12px] border border-wash/[0.06] bg-wash/[0.03] px-3 py-2.5">
      <dt className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 truncate font-mono text-xs text-foreground">{value}</dd>
    </div>
  );
}

export function ProjectInfoNotes({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const riskClass = RISK_STYLES[project.redflag_risk_level] ?? "text-muted-foreground";

  return (
    <div className="glass mb-8 overflow-hidden rounded-[22px]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Hide project details and notes" : "Show project details and notes"}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-wash/5"
      >
        <span className="flex items-center gap-2 font-display text-sm font-medium text-foreground">
          <Tag className="h-4 w-4 text-primary" />
          Info and Notes
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300 ease-liquid",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-liquid",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/30 px-5 py-4">
            <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Category" value={project.category || "—"} />
              <Field label="Game" value={project.game || "—"} />
              <Field label="Source type" value={project.source_type || "—"} />
              <Field label="File type" value={project.file_type || "—"} />
              <Field label="Access" value={project.access_level || "public"} />
              <Field label="Status" value={project.status || "—"} />
              <Field label="Uploaded" value={formatDate(project.created_at)} />
              <Field label="Updated" value={formatDateTime(project.updated_at)} />
              <Field
                label="RedFlag"
                value={
                  <span className={riskClass}>
                    {project.redflag_risk_level}
                    {project.redflag_threat_score > 0 ? ` · ${project.redflag_threat_score}` : ""}
                  </span>
                }
              />
            </dl>
            {project.notes ? (
              <div className="mt-4">
                <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                  Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {project.notes}
                </p>
              </div>
            ) : null}
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
              RedFlag scan status: <span className="font-mono">{project.redflag_scan_status}</span>.
              Download links and archive contents are not redistributed by this static clone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
