import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  CodeXml,
  Download,
  Eye,
  LogIn,
  MessageCircle,
  ShieldAlert,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { DemoAction } from "@/components/site/DemoAction";
import { GameIcon } from "@/components/site/GameIcon";
import { ProjectInfoNotes } from "@/components/site/ProjectInfoNotes";
import { TrafficChart } from "@/components/site/TrafficChart";
import { getProject } from "@/lib/data";
import { formatNumber, formatShortDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(Number(id));
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description:
      project.description ||
      `${project.category} project on paste-co.de — ${formatNumber(project.downloads)} downloads.`,
  };
}

const repClass =
  "inline-flex h-8 items-center gap-1 rounded-[11px] font-mono tabular-nums transition-[background-color,color,transform,border-radius] duration-500 ease-spring hover:rounded-[16px] active:scale-90 active:duration-100 border px-2 text-xs border-wash/10 text-muted-foreground hover:bg-wash/10 hover:text-foreground";

const ghostClass =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(Number(id));
  if (!project) notFound();

  return (
    <main className="page-offset min-h-screen px-3 pb-16 md:px-5">
      <div className="mx-auto max-w-[62.5rem]">
        <Link className="btn-icon-liquid mb-4 w-auto gap-1.5 px-3 text-xs" href="/">
          <ArrowLeft className="h-3.5 w-3.5" />
          Archive
        </Link>

        <section className="glass mb-6 flex flex-col justify-between gap-6 rounded-[28px] p-5 sm:flex-row sm:items-start md:p-6">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex items-start gap-4">
              <div className="glass-well flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] text-primary">
                <GameIcon className="h-7 w-7" name={project.game || project.category.split(" / ")[0]} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="mb-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-mono text-xs text-muted-foreground">{project.category}</span>
                  </div>
                  {project.source_type ? (
                    <span className="glass-pill rounded-full px-2.5 py-0.5 font-mono text-2xs text-secondary-foreground">
                      {project.source_type}
                    </span>
                  ) : null}
                  {project.file_type ? (
                    <span className="glass-pill rounded-full px-2.5 py-0.5 font-mono text-2xs text-secondary-foreground">
                      {project.file_type}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            {project.description ? (
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3 self-start">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <DemoAction
                  as="inline"
                  className={repClass}
                  title="Reputation is disabled"
                  description="Voting on projects requires a signed-in Discord session on the original paste-co.de. This static clone does not record reputation."
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{project.stars}</span>
                </DemoAction>
                <DemoAction
                  as="inline"
                  className={repClass}
                  title="Reputation is disabled"
                  description="Voting on projects requires a signed-in Discord session on the original paste-co.de. This static clone does not record reputation."
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span>0</span>
                </DemoAction>
              </div>
              <a className={ghostClass} href="#discussions-section" title="Jump to discussions">
                <MessageCircle className="h-3.5 w-3.5 text-primary" />
                <span>0</span>
              </a>
              <DemoAction
                as="inline"
                className="inline-flex h-8 animate-fade-in items-center gap-1.5 rounded-md border border-border px-2.5 text-xs text-muted-foreground transition-all duration-200 hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                title="Report source"
                description="Reports are reviewed by the original paste-co.de moderation team. This static clone does not submit reports."
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Report</span>
              </DemoAction>
            </div>
          </div>
        </section>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="grid grid-cols-3 gap-3 md:col-span-2">
            <div className="glass flex flex-col items-center justify-center gap-1 rounded-[20px] p-4">
              <Download className="mb-1 h-4 w-4 text-primary/80" />
              <span className="font-mono text-lg tabular-nums text-foreground">
                {project.downloads}
              </span>
              <span className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                Downloads
              </span>
            </div>
            <div className="glass flex flex-col items-center justify-center gap-1 rounded-[20px] p-4">
              <Eye className="mb-1 h-4 w-4 text-primary/80" />
              <span className="font-mono text-lg tabular-nums text-foreground">
                {project.views}
              </span>
              <span className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                Views
              </span>
            </div>
            <div className="glass flex flex-col items-center justify-center gap-1 rounded-[20px] p-4">
              <Calendar className="mb-1 h-4 w-4 text-primary/80" />
              <span className="w-full truncate text-center font-mono text-sm text-foreground">
                {formatShortDate(project.created_at)}
              </span>
              <span className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                Uploaded
              </span>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="glass flex h-full flex-col justify-between rounded-[20px] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                    Popularity &amp; traffic
                  </h3>
                  <p className="text-[9px] text-muted-foreground">
                    Traffic trend since it was added
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[9px]">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">DLs</span>
                  </div>
                </div>
              </div>
              <div className="relative mt-1 h-[70px] w-full">
                <TrafficChart createdAt={project.created_at} id={project.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <DemoAction
            as="inline"
            className="glass-tint flex h-11 items-center gap-2 rounded-[14px] px-5 text-sm font-medium transition-[border-radius,transform,filter,background-color] duration-500 ease-liquid hover:rounded-[22px] hover:brightness-110 active:scale-95"
            title="Download disabled"
            description="This static clone reproduces the paste-co.de interface only. It does not host or redistribute cheat archives, loaders or source files."
          >
            <Download className="h-4 w-4" />
            Download
          </DemoAction>
          <Link
            className="btn-icon-liquid h-11 w-auto gap-2 px-5 text-sm font-medium"
            href={`/project/${project.id}/source`}
          >
            <CodeXml className="h-4 w-4" />
            Browse Source
          </Link>
        </div>

        <ProjectInfoNotes project={project} />

        <section className="glass mb-8 rounded-[24px] p-5" id="discussions-section">
          <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-medium text-foreground">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span>Discussions</span>
          </h2>
          <div className="flex w-full flex-col gap-4">
            <div className="mt-2 space-y-2">
              <div className="rounded-md border border-border bg-secondary/30 p-3 text-xs text-muted-foreground">
                <p>Login with Discord to contribute feedback.</p>
                <DemoAction
                  as="inline"
                  className="glass-tint mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-3 py-2 text-sm font-medium transition-[border-radius,transform,filter] duration-500 ease-liquid hover:rounded-[18px] hover:brightness-110 active:scale-95"
                  title="Discord sign-in unavailable"
                  description="Authentication is not wired up in this static clone. The original site uses Discord OAuth to post project feedback."
                >
                  <LogIn className="h-4 w-4" />
                  Login with Discord
                </DemoAction>
              </div>
            </div>
            <div className="my-4 h-[1px] w-full shrink-0 bg-border/30" />
            <div className="space-y-4">
              <p className="py-8 text-center text-xs text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Link
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            href="/"
          >
            Back to the archive
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
