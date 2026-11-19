import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CodeXml,
  Download,
  FileArchive,
  FileCode2,
  FolderTree,
} from "lucide-react";
import { DemoAction } from "@/components/site/DemoAction";
import { getProject } from "@/lib/data";
import { formatNumber, formatShortDate } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(Number(id));
  if (!project) return { title: "Source not found" };
  return {
    title: `Source Code Explorer - ${project.name}`,
    description: `Source explorer preview for ${project.name} on paste-co.de.`,
  };
}

function archiveName(name: string, fileType: string): string {
  const base = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const extension = fileType && fileType !== "—" ? fileType.replace(/^\./, "") : "bin";
  return `${base || "archive"}.${extension}`;
}

export default async function ProjectSourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(Number(id));
  if (!project) notFound();

  const fileName = archiveName(project.name, project.file_type);
  const isCode = [".cpp", ".hpp", ".h", ".c", ".cs", ".py", ".lua", ".js", ".ts"].includes(
    project.file_type,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="glass sticky top-3 z-40 mx-3 mt-3 rounded-[22px]">
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 md:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              className="btn-icon-liquid w-auto shrink-0 gap-1.5 px-3 text-xs"
              href={`/project/${project.id}`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Project
            </Link>
            <span className="max-w-xs truncate font-display text-sm font-medium text-foreground md:max-w-md">
              {project.name}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 font-display text-3xs uppercase tracking-widest text-primary">
            <CodeXml className="h-4 w-4" />
            Source explorer
          </div>
        </div>
      </header>

      <main className="mx-auto mt-4 flex w-full max-w-7xl flex-1 flex-col p-4 md:p-8">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[22px] border border-border/20 bg-secondary/10 backdrop-blur-sm md:min-h-[32rem] md:flex-row">
            <aside className="hidden w-64 shrink-0 border-r border-border/20 bg-secondary/[0.06] p-3 md:block">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                  Archive
                </p>
                <span className="glass-pill rounded-full px-2 py-0.5 font-mono text-3xs text-secondary-foreground">
                  {project.file_type ? project.file_type.replace(/^\./, "").toUpperCase() : "BIN"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-1 pb-2 text-xs text-muted-foreground">
                <FolderTree className="h-3.5 w-3.5 text-primary" />
                <span className="truncate font-mono">{fileName}</span>
              </div>
              <div className="flex w-full items-center gap-2 rounded-[10px] border border-primary/20 bg-primary/10 px-2.5 py-2 text-left">
                {isCode ? (
                  <FileCode2 className="h-4 w-4 shrink-0 text-primary" />
                ) : (
                  <FileArchive className="h-4 w-4 shrink-0 text-primary" />
                )}
                <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
                  {fileName}
                </span>
              </div>
              <p className="mt-3 px-1 text-[10px] leading-relaxed text-muted-foreground/60">
                Archive listing captured from the project record. File contents are not included in
                this static clone.
              </p>
            </aside>

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/20 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-2">
                  <FileArchive className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate font-mono text-xs text-foreground">{fileName}</span>
                  <span className="glass-pill hidden rounded-full px-2 py-0.5 font-mono text-3xs text-secondary-foreground sm:inline">
                    binary
                  </span>
                </div>
                <DemoAction
                  as="inline"
                  className="btn-icon-liquid h-8 w-auto gap-1.5 px-3 text-xs"
                  title="Download disabled"
                  description="This static clone reproduces the paste-co.de interface only. It does not host or redistribute cheat archives, loaders or source files."
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </DemoAction>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-wash/10 bg-wash/[0.04] text-primary">
                  {isCode ? <FileCode2 className="h-6 w-6" /> : <FileArchive className="h-6 w-6" />}
                </div>
                <div>
                  <h2 className="font-display text-sm font-medium text-foreground">
                    No text preview available
                  </h2>
                  <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground">
                    This entry is a {project.file_type || "binary archive"} file. Archive contents
                    are not extracted or redistributed by the static clone, so there is no source
                    listing to display here.
                  </p>
                </div>
                <dl className="grid w-full max-w-md grid-cols-2 gap-2 text-left">
                  <div className="rounded-[12px] border border-wash/[0.06] bg-wash/[0.03] px-3 py-2">
                    <dt className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                      Category
                    </dt>
                    <dd className="mt-0.5 truncate font-mono text-xs text-foreground">
                      {project.category}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-wash/[0.06] bg-wash/[0.03] px-3 py-2">
                    <dt className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                      File type
                    </dt>
                    <dd className="mt-0.5 truncate font-mono text-xs text-foreground">
                      {project.file_type || "binary"}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-wash/[0.06] bg-wash/[0.03] px-3 py-2">
                    <dt className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                      Downloads
                    </dt>
                    <dd className="mt-0.5 truncate font-mono text-xs text-foreground">
                      {formatNumber(project.downloads)}
                    </dd>
                  </div>
                  <div className="rounded-[12px] border border-wash/[0.06] bg-wash/[0.03] px-3 py-2">
                    <dt className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
                      Uploaded
                    </dt>
                    <dd className="mt-0.5 truncate font-mono text-xs text-foreground">
                      {formatShortDate(project.created_at)}
                    </dd>
                  </div>
                </dl>
                <Link
                  className="btn-icon-liquid h-9 w-auto gap-1.5 px-4 text-xs"
                  href={`/project/${project.id}`}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
