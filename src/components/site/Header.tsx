"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  Bot,
  ChevronDown,
  FileCode2,
  Gamepad2,
  Globe,
  LogIn,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  Plus,
  ScanLine,
  Search,
  Send,
  Settings,
  Sun,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import searchIndexJson from "@/data/search-index.json";
import { cn } from "@/lib/utils";
import { DemoAction } from "@/components/site/DemoAction";
import { GameIcon } from "@/components/site/GameIcon";

interface SearchEntry {
  id: number;
  name: string;
  category: string;
  game: string;
  subcategory: string;
}

const SEARCH_INDEX = searchIndexJson as unknown as SearchEntry[];

type MenuName = "games" | "tools" | "community" | "profile" | "notifications" | null;

const NAV_LINK =
  "relative isolate inline-flex h-9 items-center gap-1 rounded-[12px] px-3 text-sm outline-none transition-colors";

function MenuItem({
  href,
  icon,
  title,
  description,
  onClick,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="glass-well flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-muted-foreground">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm text-foreground">{title}</span>
        <span className="block truncate text-2xs text-muted-foreground">{description}</span>
      </span>
    </>
  );
  const className =
    "flex w-full items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-left transition-colors hover:bg-wash/[0.06]";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {inner}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [menu, setMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("paste-theme");
    if (stored === "light" || stored === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync the toggle with the persisted preference after mount
      setTheme(stored);
      document.documentElement.dataset.theme = stored;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close any open overlay when the route changes
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
      const target = event.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("paste-theme", next);
  };

  const results = query.trim()
    ? SEARCH_INDEX.filter((entry) => {
        const needle = query.trim().toLowerCase();
        return (
          entry.name.toLowerCase().includes(needle) ||
          entry.category.toLowerCase().includes(needle)
        );
      }).slice(0, 8)
    : [];

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (results[0]) {
      setQuery("");
      router.push(`/project/${results[0].id}`);
    }
  };

  const closeMenu = () => setMenu(null);

  if (pathname?.startsWith("/project/") && pathname.endsWith("/source")) {
    return null;
  }

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3"
    >
      <div className="glass glass-lens pointer-events-auto mx-auto flex h-14 items-center gap-2 rounded-[22px] pl-3 pr-2 md:gap-4 md:pl-4">
        <Link className="group flex shrink-0 items-center gap-2.5" aria-label="paste-co.de home" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/icon.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 drop-shadow-[0_4px_12px_hsl(var(--primary)/0.45)]"
          />
          <span className="hidden font-display text-base font-semibold tracking-tight text-foreground sm:inline md:hidden lg:inline">
            paste-co<span className="text-primary">.de</span>
          </span>
        </Link>

        <nav className="hidden items-center md:flex" aria-label="Main">
          <Link
            href="/"
            className={cn(NAV_LINK, pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {pathname === "/" ? <span className="glass-pill absolute inset-0 -z-10 rounded-[12px]" /> : null}
            Archive
          </Link>
          <Link href="/donate" className={cn(NAV_LINK, "font-medium text-primary")}>
            Donate
          </Link>

          <div className="relative">
            <button
              type="button"
              className={cn(NAV_LINK, "text-muted-foreground hover:text-foreground")}
              aria-haspopup="menu"
              aria-expanded={menu === "games"}
              onClick={() => setMenu(menu === "games" ? null : "games")}
            >
              Games
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menu === "games" && "rotate-180")} />
            </button>
            {menu === "games" ? (
              <div className="glass-thick absolute left-0 top-[calc(100%+8px)] w-72 rounded-[18px] p-1.5" role="menu">
                <MenuItem href="/games" icon={<Gamepad2 className="h-4 w-4" />} title="Game updates" description="Latest versions and anti-cheat builds" onClick={closeMenu} />
                <MenuItem href="/roblox" icon={<GameIcon name="Roblox" className="h-4 w-4" />} title="Roblox" description="Versions, offsets, RDD" onClick={closeMenu} />
                <MenuItem href="/community-offsets" icon={<FileCode2 className="h-4 w-4" />} title="Community offsets" description="Shared offset dumps" onClick={closeMenu} />
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              className={cn(NAV_LINK, "text-muted-foreground hover:text-foreground")}
              aria-haspopup="menu"
              aria-expanded={menu === "tools"}
              onClick={() => setMenu(menu === "tools" ? null : "tools")}
            >
              Tools
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menu === "tools" && "rotate-180")} />
            </button>
            {menu === "tools" ? (
              <div className="glass-thick absolute left-0 top-[calc(100%+8px)] w-72 rounded-[18px] p-1.5" role="menu">
                <MenuItem href="/tools" icon={<Wrench className="h-4 w-4" />} title="All tools" description="64 browser-side utilities · donators" onClick={closeMenu} />
                <MenuItem href="/scanner" icon={<ScanLine className="h-4 w-4" />} title="Scanner" description="Check a file or URL" onClick={closeMenu} />
                <MenuItem href="/proxy" icon={<Globe className="h-4 w-4" />} title="Proxy" description="Open any site, ads blocked · donators" onClick={closeMenu} />
                <MenuItem href="/mcp" icon={<Bot className="h-4 w-4" />} title="Agent access (MCP)" description="Let your AI agent use paste-co.de · donators" onClick={closeMenu} />
              </div>
            ) : null}
          </div>

          <Link
            href="/guides"
            className={cn(NAV_LINK, pathname.startsWith("/guides") ? "text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {pathname.startsWith("/guides") ? <span className="glass-pill absolute inset-0 -z-10 rounded-[12px]" /> : null}
            Guides
          </Link>

          <div className="relative">
            <button
              type="button"
              className={cn(NAV_LINK, "text-muted-foreground hover:text-foreground")}
              aria-haspopup="menu"
              aria-expanded={menu === "community"}
              onClick={() => setMenu(menu === "community" ? null : "community")}
            >
              Community
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menu === "community" && "rotate-180")} />
            </button>
            {menu === "community" ? (
              <div className="glass-thick absolute left-0 top-[calc(100%+8px)] w-72 rounded-[18px] p-1.5" role="menu">
                <MenuItem href="/forums" icon={<MessageSquare className="h-4 w-4" />} title="Forums" description="Discussion" onClick={closeMenu} />
                <MenuItem href="/submissions" icon={<Send className="h-4 w-4" />} title="Submissions" description="Send in a project" onClick={closeMenu} />
                <MenuItem href="/requests" icon={<MessageCircle className="h-4 w-4" />} title="Requests" description="Ask for a source you can't find" onClick={closeMenu} />
                <MenuItem href="https://discord.gg/macrostack" external icon={<MessageSquare className="h-4 w-4" />} title="Discord" description="Mirrors, fixes and support" onClick={closeMenu} />
              </div>
            ) : null}
          </div>

          <Link href="/submissions" className={cn(NAV_LINK, "font-medium text-primary")}>
            <Plus className="h-4 w-4" />
            Submit
          </Link>
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 justify-end">
          <form onSubmit={submitSearch} className="relative max-w-[18rem] flex-1 transition-[max-width] duration-700 ease-liquid focus-within:max-w-[30rem]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchRef}
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="omni-search-results"
              aria-autocomplete="list"
              placeholder="Search the archive"
              className="glass-well h-9 w-full rounded-[12px] pl-9 pr-14 text-sm text-foreground placeholder:text-muted-foreground transition-[border-radius,box-shadow] duration-500 ease-liquid focus:rounded-[18px] focus:shadow-[inset_0_1px_3px_0_rgb(0_0_0/0.6),0_0_0_1px_hsl(var(--primary)/0.6),0_0_24px_-4px_hsl(var(--primary)/0.5)] focus:outline-none"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              <kbd className="hidden items-center rounded-[6px] bg-wash/[0.08] px-1.5 font-mono text-3xs text-muted-foreground sm:flex">/</kbd>
            </div>
            {query.trim() ? (
              <div
                id="omni-search-results"
                className="glass-thick absolute right-0 top-[calc(100%+8px)] w-[min(26rem,calc(100vw-2rem))] overflow-hidden rounded-[18px] p-1.5"
              >
                {results.length ? (
                  results.map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/project/${entry.id}`}
                      onClick={() => setQuery("")}
                      className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 transition-colors hover:bg-wash/[0.06]"
                    >
                      <GameIcon name={entry.game} className="h-4 w-4" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-foreground">{entry.name}</span>
                        <span className="block truncate font-mono text-2xs text-muted-foreground">{entry.category}</span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-4 text-sm text-muted-foreground">No projects found.</p>
                )}
              </div>
            ) : null}
          </form>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="btn-icon-liquid relative"
            title="Notifications"
            aria-label="Notifications, 5 unread"
            aria-haspopup="dialog"
            aria-expanded={menu === "notifications"}
            onClick={() => setMenu(menu === "notifications" ? null : "notifications")}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-white">
              5
            </span>
          </button>
          {menu === "notifications" ? (
            <div className="glass-thick absolute right-3 top-[calc(100%+8px)] w-72 rounded-[18px] p-4" role="dialog">
              <p className="font-display text-sm font-medium text-foreground">Notifications</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Sign in with Discord to see replies, mentions and project updates.
              </p>
            </div>
          ) : null}
          <button
            type="button"
            className="btn-icon-liquid hidden sm:inline-flex"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="relative">
            <button
              type="button"
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-wash/[0.08] text-muted-foreground shadow-[inset_0_1px_0_0_var(--glass-rim),inset_0_0_0_1px_rgb(var(--wash)/0.08)] transition-transform duration-500 ease-spring hover:scale-110 hover:text-foreground active:scale-90"
              title="Profile & Settings"
              aria-haspopup="menu"
              aria-expanded={menu === "profile"}
              onClick={() => setMenu(menu === "profile" ? null : "profile")}
            >
              <User className="h-4 w-4" />
            </button>
            {menu === "profile" ? (
              <div className="glass-thick absolute right-0 top-[calc(100%+8px)] w-64 rounded-[18px] p-1.5" role="menu">
                <div className="px-2.5 py-2">
                  <p className="text-sm text-foreground">Not signed in</p>
                  <p className="text-2xs text-muted-foreground">Sign in with Discord to upload and comment.</p>
                </div>
                <DemoAction
                  as="inline"
                  className="flex w-full items-center gap-2.5 rounded-[12px] bg-primary px-2.5 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-primary/90"
                  title="Discord sign-in"
                  description="Authentication is not connected in this static clone. You can still browse the full archive."
                >
                  <LogIn className="h-4 w-4" />
                  Sign in with Discord
                </DemoAction>
                <div className="mx-2 my-1 h-px bg-wash/10" />
                <MenuItem href="/submissions" icon={<Upload className="h-4 w-4" />} title="My uploads" description="Submit and manage projects" onClick={closeMenu} />
                <MenuItem href="/donate" icon={<Settings className="h-4 w-4" />} title="Settings" description="Appearance, account and access" onClick={closeMenu} />
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="btn-icon-liquid md:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="glass-thick pointer-events-auto mx-auto mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[22px] p-3 md:hidden">
          <form onSubmit={submitSearch} className="relative mb-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search the archive"
              className="glass-well h-10 w-full rounded-[12px] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
          <nav className="flex flex-col" aria-label="Mobile">
            {[
              ["/", "Archive"],
              ["/donate", "Donate"],
              ["/games", "Game updates"],
              ["/roblox", "Roblox"],
              ["/tools", "Tools"],
              ["/guides", "Guides"],
              ["/forums", "Forums"],
              ["/submissions", "Submit"],
              ["/scanner", "Scanner"],
              ["/community-offsets", "Community offsets"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex h-10 items-center rounded-[12px] px-3 text-sm text-muted-foreground transition-colors hover:bg-wash/[0.06] hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
