import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import {
  FORUM_CATEGORIES,
  getForumPostCount,
  getForumTopicCount,
  getForumTopics,
} from "@/lib/data";
import { timeAgo } from "@/lib/format";

export const metadata: Metadata = {
  title: "Forums",
  description: "Discuss, share, and connect with the paste-co.de community.",
};

export default function ForumsPage() {
  const categories = FORUM_CATEGORIES;
  const topics = getForumTopicCount();
  const posts = getForumPostCount();

  return (
    <main className="page-offset min-h-screen px-4 pb-12 md:px-8">
      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-6">
        <section className="glass animate-fade-in-up rounded-[24px] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <p className="font-display text-3xs uppercase tracking-widest text-primary">
                  Community Forums
                </p>
              </div>
              <h1 className="mt-2 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                Discuss, share, and connect
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground/80">
                Join the conversation with the community. Login with Discord to create topics
                and participate in discussions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link className="btn-icon-liquid w-auto px-3 text-xs" href="/">
                Back to Projects
              </Link>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-6 border-t border-border/20 pt-4">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-primary/60" />
              <span className="font-mono text-[11px] text-muted-foreground/60">
                {categories.length} categories
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground/40">{topics} topics</span>
            <span className="font-mono text-[11px] text-muted-foreground/40">{posts} posts</span>
          </div>
        </section>

        <section className="space-y-3">
          {categories.map((category, index) => {
            const categoryTopics = getForumTopics(category.slug);
            const latest = category.latest_topic_id
              ? categoryTopics.find((topic) => topic.id === category.latest_topic_id)
              : undefined;
            return (
              <div
                key={category.id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: "backwards" }}
              >
                <Link
                  href={`/forums/${category.slug}`}
                  className="group flex items-stretch gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/40 md:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-lg">
                    <span aria-hidden="true">{category.icon}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="text-sm font-semibold text-card-foreground transition-colors group-hover:text-primary md:text-base">
                      {category.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/60">
                      {category.description}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-6 sm:flex">
                    <div className="text-center">
                      <p className="font-mono text-sm font-semibold text-card-foreground">
                        {category.topic_count}
                      </p>
                      <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground/50">
                        Topics
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-sm font-semibold text-card-foreground">
                        {category.post_count}
                      </p>
                      <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground/50">
                        Posts
                      </p>
                    </div>
                  </div>
                  <div className="hidden w-[180px] shrink-0 items-center gap-2.5 lg:flex">
                    {latest ? (
                      <>
                        {category.latest_topic_avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt=""
                            className="h-7 w-7 rounded-full ring-1 ring-border/20"
                            src={category.latest_topic_avatar}
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-card-foreground/80">
                            {category.latest_topic_title}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground/50">
                            {category.latest_topic_author} ·{" "}
                            {timeAgo(latest.created_at)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs italic text-muted-foreground/40">No topics yet</p>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
