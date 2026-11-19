import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { getGuideMeta } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "17 guides on game security, reverse engineering and modding, grouped by where they fit in the learning curve.",
};

interface Track {
  id: string;
  title: string;
  description: string;
  slugs: string[];
}

const TRACKS: Track[] = [
  {
    id: "track-start",
    title: "Start here",
    description: "Get a working toolchain and build something before going deeper.",
    slugs: ["compile", "troubleshooting", "cheat-engine-beginners", "dev-environment-setup"],
  },
  {
    id: "track-memory",
    title: "Memory & offsets",
    description: "Locate structures, keep them working across patches, and read them from code.",
    slugs: [
      "updating-offsets",
      "finding-offsets-reclass",
      "basic-external-cheat-cpp",
      "pattern-scanning",
      "python-game-memory",
    ],
  },
  {
    id: "track-re",
    title: "Reverse engineering",
    description: "Read a binary you did not write, and understand what defends it.",
    slugs: [
      "x64dbg-reverse-engineering",
      "anti-cheat-overview",
      "dll-injection-overview",
      "ida-ghidra-reverse-engineering",
      "anti-debugging-techniques",
    ],
  },
  {
    id: "track-kernel",
    title: "Kernel & drivers",
    description: "Ring-0 work: building, signing and mapping drivers.",
    slugs: ["driver-compile", "map-driver", "windows-kernel-drivers"],
  },
];

export default function GuidesPage() {
  const guides = getGuideMeta();
  const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));

  return (
    <main className="page-offset-tight min-h-screen px-4 pb-10 md:px-8 md:pb-14">
      <div className="mx-auto w-full max-w-[100rem]">
        <PageHeader
          className="mb-8"
          title="Guides"
          description="17 guides on game security, reverse engineering and modding, grouped by where they fit in the learning curve."
          backLabel="Archive"
        />
        <div className="flex flex-col gap-8">
          {TRACKS.map((track) => {
            const items = track.slugs
              .map((slug) => bySlug.get(slug))
              .filter((item): item is NonNullable<typeof item> => Boolean(item));
            return (
              <section key={track.id} aria-labelledby={track.id}>
                <div className="mb-3 border-b border-border pb-2">
                  <h2 id={track.id} className="text-sm font-semibold text-foreground">
                    {track.title}
                    <span className="ml-2 font-normal text-muted-foreground">{items.length}</span>
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{track.description}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="glass group rounded-[20px] p-4 transition-transform duration-500 ease-spring hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-card-foreground transition-colors group-hover:text-primary">
                          {guide.title}
                        </p>
                        <span className="shrink-0 font-mono text-2xs lowercase text-muted-foreground">
                          {guide.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {guide.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
