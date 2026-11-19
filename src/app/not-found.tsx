import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="page-offset flex min-h-[70vh] items-center justify-center px-4 pb-12">
      <div className="glass w-full max-w-md rounded-[28px] p-8 text-center">
        <p className="font-mono text-5xl font-medium text-primary">404</p>
        <h1 className="mt-3 font-display text-xl font-medium tracking-tight text-foreground">
          This page could not be found.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The archive entry you are looking for may have been removed or renamed.
        </p>
        <Link className="btn-liquid mt-6 inline-flex h-10 items-center gap-2 px-5 text-sm" href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to the archive
        </Link>
      </div>
    </main>
  );
}
