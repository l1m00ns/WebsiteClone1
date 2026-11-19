import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Lock, MessageSquare, Pin } from "lucide-react";
import { getForumCategory, getForumTopics, FORUM_CATEGORIES } from "@/lib/data";
import { timeAgo } from "@/lib/format";

export function generateStaticParams() {
  return FORUM_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = getForumCategory(category);
  if (!found) return { title: "Forum category not found" };
  return { title: found.name, description: found.description };
}

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getForumCategory(slug);
  if (!category) notFound();

  const topics = [...getForumTopics(slug)].sort((a, b) => {
    const at = new Date(a.last_post_at ?? a.created_at).getTime();
    const bt = new Date(b.last_post_at ?? b.created_at).getTime();
    return bt - at;
  });

  return (
    <main className="page-offset min-h-screen px-4 pb-12 md:px-8">
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-5">
        <section className="glass animate-fade-in-up rounded-[24px] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link className="btn-icon-liquid mb-3 w-auto gap-1.5 px-3 text-xs" href="/forums">
                <ArrowLeft className="h-3 w-3" />
                Back to Forums
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {category.icon}
                </span>
                <div>
                  <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                    {category.name}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground/70">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 border-t border-border/20 pt-3">
            <span className="font-mono text-[11px] text-muted-foreground/50">
              {topics.length} topic{topics.length === 1 ? "" : "s"}
            </span>
          </div>
        </section>

        <div className="rounded-2xl border border-border/25 bg-card/30 px-5 py-4 text-center backdrop-blur-sm">
          <p className="text-sm text-muted-foreground/70">
            Login with Discord using the header button to create topics and reply.
          </p>
        </div>

        <section className="space-y-2">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
            >
              <Link
                href={`/forums/topic/${topic.id}`}
                className="glass-well group flex items-center gap-3 rounded-[16px] border border-transparent px-4 py-3 transition-all duration-200 hover:border-border/40 hover:bg-background/50 md:gap-4"
              >
                {topic.discord_avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={topic.discord_display_name}
                    className="h-9 w-9 shrink-0 rounded-full ring-1 ring-border/20"
                    src={topic.discord_avatar}
                  />
                ) : (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-muted-foreground">
                    {topic.discord_display_name.slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {topic.is_pinned ? <Pin className="h-3.5 w-3.5 shrink-0 text-primary" /> : null}
                    {topic.is_locked ? (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    ) : null}
                    <h3 className="truncate text-sm font-medium text-card-foreground transition-colors group-hover:text-primary">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-muted-foreground/50">
                    by {topic.discord_display_name} • {timeAgo(topic.created_at)}
                  </p>
                </div>
                <div className="hidden items-center gap-4 sm:flex">
                  <div className="flex items-center gap-1.5 text-muted-foreground/50">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span className="font-mono text-[11px]">{topic.post_count}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground/50">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="font-mono text-[11px]">{topic.view_count}</span>
                  </div>
                </div>
                <div className="hidden w-[120px] shrink-0 text-right lg:block">
                  <p className="font-mono text-[10px] text-muted-foreground/60">
                    {timeAgo(topic.last_post_at ?? topic.created_at)}
                  </p>
                  <p className="truncate font-mono text-[10px] text-muted-foreground/40">
                    by {topic.last_post_by ?? topic.discord_display_name}
                  </p>
                </div>
              </Link>
            </div>
          ))}

          {topics.length === 0 ? (
            <div className="glass-well flex flex-col items-center gap-2 rounded-[20px] px-6 py-14 text-center">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                No topics in this category yet. Be the first to start one.
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
