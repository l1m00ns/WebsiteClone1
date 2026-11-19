import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
  backHref = "/",
  backLabel = "Archive",
  actions,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "glass flex flex-wrap items-center gap-4 rounded-[24px] p-5 md:p-6",
        className,
      )}
    >
      <Link className="btn-icon-liquid w-auto gap-1.5 px-3 text-xs" href={backHref}>
        <ChevronLeft className="h-3.5 w-3.5" />
        {backLabel}
      </Link>
      <div className="hidden h-8 w-px bg-wash/10 sm:block" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">{actions}</div> : null}
    </header>
  );
}
