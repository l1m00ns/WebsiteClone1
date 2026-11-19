export interface GameIcon {
  src: string;
  invert?: "light" | "dark";
}

export const GAME_ICONS: Record<string, GameIcon> = {
  "apex-legends": { src: "/game-icons/apex-legends.png", invert: "light" },
  bo6: { src: "/game-icons/bo6.ico", invert: "dark" },
  cs2: { src: "/game-icons/cs2.png", invert: "light" },
  "dead-by-daylight": { src: "/game-icons/dead-by-daylight.png" },
  discord: { src: "/game-icons/discord.svg" },
  "escape-from-tarkov": { src: "/game-icons/escape-from-tarkov.png", invert: "light" },
  fivem: { src: "/game-icons/fivem.png", invert: "light" },
  fortnite: { src: "/game-icons/fortnite.png", invert: "light" },
  minecraft: { src: "/game-icons/minecraft.ico" },
  mw3: { src: "/game-icons/mw3.png" },
  "rainbow-six-siege": { src: "/game-icons/rainbow-six-siege.png", invert: "light" },
  roblox: { src: "/game-icons/roblox.svg" },
  rust: { src: "/game-icons/rust.png" },
  unturned: { src: "/game-icons/unturned.ico" },
  valorant: { src: "/game-icons/valorant.png" },
};

export function gameSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function gameIcon(name: string): GameIcon | null {
  return GAME_ICONS[gameSlug(name)] ?? null;
}

export const CATEGORY_ORDER = [
  "Roblox",
  "Discord",
  "BO6",
  "CS2",
  "FiveM",
  "Fortnite",
  "MW3",
  "Rust",
  "Valorant",
  "Minecraft",
  "ImGui",
  "Apex Legends",
  "Dead by Daylight",
  "Escape From Tarkov",
  "Rainbow Six Siege",
  "Unturned",
  "System",
  "Tools",
  "Graphics",
  "Audio",
  "Misc",
];

export const NON_GAME_GROUPS = new Set(["System", "Tools", "Graphics", "Audio", "Misc", "ImGui"]);

export function invertClass(icon: GameIcon | null): string {
  if (!icon?.invert) return "";
  return icon.invert === "light" ? "invert-on-light" : "invert-on-dark";
}

export const RISK_STYLES: Record<string, string> = {
  CLEAN: "text-emerald-300 light:text-emerald-700",
  LOW: "text-sky-300 light:text-sky-700",
  MEDIUM: "text-amber-300 light:text-amber-700",
  HIGH: "text-orange-300 light:text-orange-700",
  CRITICAL: "text-red-300 light:text-red-600",
  INFO: "text-red-300 light:text-red-600",
};
