import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, Lock, MessageSquare, Pin, Reply } from "lucide-react";
import { FORUM_CATEGORIES, findForumTopic, getForumTopic } from "@/lib/data";
import { formatDateTime, timeAgo } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const topic = findForumTopic(Number(id));
  if (!topic) return { title: "Topic not found" };
  return { title: topic.title };
}

export default async function ForumTopicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const topicId = Number(id);
  const detail = getForumTopic(topicId);
  const summary = detail?.topic ?? findForumTopic(topicId);
  if (!summary) notFound();

  const category = FORUM_CATEGORIES.find((entry) => entry.id === summary.category_id);
  const posts = detail?.posts ?? [];

  return (
    <main className="page-offset min-h-screen px-4 pb-12 md:px-8">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col gap-5">
        <section className="glass animate-fade-in-up rounded-[24px] p-5 md:p-6">
          <Link
            className="btn-icon-liquid mb-3 w-auto gap-1.5 px-3 text-xs"
            href={category ? `/forums/${category.slug}` : "/forums"}
          >
            <ArrowLeft className="h-3 w-3" />
            {category ? `Back to ${category.name}` : "Back to Forums"}
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {summary.is_pinned ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                    <Pin className="h-3 w-3" /> Pinned
                  </span>
                ) : null}
                {summary.is_locked ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    <Lock className="h-3 w-3" /> Locked
                  </span>
                ) : null}
                {category ? (
                  <Link
                    href={`/forums/${category.slug}`}
                    className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground transition-colors hover:text-primary"
                  >
                    {category.name}
                  </Link>
                ) : null}
              </div>
              <h1 className="mt-2 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                {summary.title}
              </h1>
              <p className="mt-1.5 font-mono text-[11px] text-muted-foreground/60">
                by {summary.discord_display_name} · {formatDateTime(summary.created_at)} ·{" "}
                {summary.view_count} views · {summary.post_count} replies
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="glass-well animate-fade-in-up rounded-[16px] border border-transparent p-4 md:p-5"
              style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
            >
              <div className="flex items-start gap-3">
                {post.discord_avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={post.discord_display_name}
                    className="h-10 w-10 shrink-0 rounded-full ring-1 ring-border/20"
                    src={post.discord_avatar}
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs text-muted-foreground">
                    {post.discord_display_name.slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="text-sm font-medium text-foreground">
                      {post.discord_display_name}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground/50">
                      @{post.discord_username}
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground/40">·</span>
                    <p
                      className="font-mono text-[10px] text-muted-foreground/50"
                      title={formatDateTime(post.created_at)}
                    >
                      {formatDateTime(post.created_at)}
                    </p>
                    {post.is_edited ? (
                      <span className="font-mono text-[10px] italic text-muted-foreground/40">
                        (edited)
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground">
                    {post.content}
                  </div>
                  <div className="mt-3 flex items-center gap-3 border-t border-border/30 pt-2 font-mono text-[10px] text-muted-foreground/50">
                    <span>{index === 0 ? "Original post" : `Reply #${index}`}</span>
                    <span>·</span>
                    <span>{timeAgo(post.created_at)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {posts.length === 0 ? (
            <div className="glass-well flex flex-col items-center gap-2 rounded-[16px] px-6 py-12 text-center">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Replies could not be loaded for this topic in the static snapshot.
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-border/25 bg-card/30 px-5 py-5 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">Join the discussion</p>
              <p className="mt-0.5 text-xs text-muted-foreground/70">
                Login with Discord to reply to this topic.
              </p>
            </div>
            <button type="button" className="btn-liquid h-9 gap-1.5 px-4 text-xs" disabled>
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
          </div>
          <textarea
            disabled
            placeholder="Login with Discord to reply…"
            className="mt-4 h-24 w-full resize-none rounded-xl border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground/60">
          <Link href="/forums" className="hover:text-foreground">
            All forums
          </Link>
          <span className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {summary.view_count}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" /> {summary.post_count}
            </span>
          </span>
        </div>
      </div>
    </main>
  );
}
