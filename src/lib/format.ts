const DAY = 86_400_000;

export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    return `${n >= 10 ? Math.round(n) : n.toFixed(1).replace(/\.0$/, "")}m`;
  }
  if (value >= 1_000) {
    const n = value / 1_000;
    return `${n >= 100 ? Math.round(n) : n.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(value);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(date);
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function timeAgo(iso: string | null, now: number = Date.now()): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diff = Math.max(0, now - date.getTime());
  const days = Math.floor(diff / DAY);
  if (days < 1) {
    const hours = Math.floor(diff / 3_600_000);
    if (hours < 1) {
      const minutes = Math.max(1, Math.floor(diff / 60_000));
      return `${minutes}min ago`;
    }
    return `${hours}h ago`;
  }
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function compactAge(iso: string | null, now: number = Date.now()): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diff = Math.max(0, now - date.getTime());
  const days = Math.floor(diff / DAY);
  if (days < 1) {
    const hours = Math.floor(diff / 3_600_000);
    return hours < 1 ? "now" : `${hours}h`;
  }
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  return `${Math.floor(months / 12)}y`;
}

export function titleCase(value: string): string {
  return value
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}
