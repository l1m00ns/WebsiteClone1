import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

export function DonatorGate({
  title,
  description,
  feature,
}: {
  title: string;
  description: string;
  feature: string;
}) {
  return (
    <div className="glass relative overflow-hidden rounded-[24px] p-8 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] bg-primary/15 text-primary">
        <Lock className="h-5 w-5" />
      </div>
      <h2 className="mt-4 font-display text-lg font-medium tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <p className="mx-auto mt-4 max-w-sm rounded-[14px] border border-wash/[0.08] bg-wash/[0.03] px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {feature}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <Link href="/donate" className="btn-liquid h-10 gap-2 px-5 text-sm">
          <Sparkles className="h-4 w-4" />
          Get donator access
        </Link>
        <Link href="/" className="btn-icon-liquid h-10 w-auto px-4 text-xs">
          Back to archive
        </Link>
      </div>
    </div>
  );
}
