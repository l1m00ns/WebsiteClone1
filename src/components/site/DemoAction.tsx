"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoAction({
  children,
  className,
  title = "Static clone",
  description = "This action is part of the original paste-co.de experience and is disabled in this static clone.",
  as = "button",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  as?: "button" | "inline";
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(as === "button" ? "btn-liquid" : "", className)}
      >
        {children}
      </button>
      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="glass-thick relative w-full max-w-md rounded-[24px] p-6"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-icon-liquid absolute right-3 top-3"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">paste-co.de clone</p>
            <h2 className="mt-2 font-display text-lg font-medium tracking-tight text-foreground">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-liquid mt-5 w-full justify-center"
            >
              Understood
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
