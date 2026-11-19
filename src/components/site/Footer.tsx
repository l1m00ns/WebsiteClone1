import Link from "next/link";

const SITE_LINKS: [string, string][] = [
  ["/games", "Game updates"],
  ["/community-offsets", "Community offsets"],
  ["/submissions", "Submissions"],
  ["/guides", "Guides"],
];

const LEGAL_LINKS: [string, string][] = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/cookies", "Cookies"],
  ["/safety", "Safety"],
];

export function Footer() {
  return (
    <footer className="glass mb-6 rounded-[28px] p-6 md:p-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-sm text-foreground">About paste-co.de</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Paste-co.de is a specialized educational repository dedicated to game
            security research, modding, and software development. Our mission is to
            provide a central archive for community-contributed projects, enabling
            developers and researchers to study various implementation techniques in
            a safe, transparent environment.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Whether you&apos;re interested in Roblox internal/external development,
            Discord automation, or low-level system utilities, our catalog offers a
            diverse range of open-source and educational resources. By archiving these
            projects, we aim to preserve technical knowledge and foster a deeper
            understanding of how modern software interacts with game engines and
            operating systems. All content shared here is intended strictly for
            educational and research purposes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <div className="flex flex-col gap-2">
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
              Site
            </p>
            {SITE_LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://discord.gg/macrostack"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Discord
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-display text-3xs uppercase tracking-widest text-muted-foreground">
              Legal
            </p>
            {LEGAL_LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">
        paste-co.de — For educational purposes only
      </p>
    </footer>
  );
}
