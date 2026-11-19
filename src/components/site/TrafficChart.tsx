const MONTH_DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function labelDate(iso: string | null, fallback: number): string {
  const date = iso ? new Date(iso) : new Date(fallback);
  if (Number.isNaN(date.getTime())) return MONTH_DAY.format(new Date(fallback));
  return MONTH_DAY.format(date);
}

function buildTrend(id: number, offset: number): number[] {
  const shapes = [
    [60, 60, 52, 68, 68, 60, 36],
    [58, 64, 58, 72, 66, 54, 32],
    [62, 56, 60, 66, 60, 64, 40],
    [56, 62, 54, 60, 70, 58, 34],
  ];
  return shapes[(id + offset) % shapes.length];
}

export function TrafficChart({
  id,
  createdAt,
}: {
  id: number;
  createdAt: string;
}) {
  const created = new Date(createdAt);
  const start = Number.isNaN(created.getTime()) ? 0 : created.getTime();
  const end = start + 4 * 86_400_000;
  const mid = start + 2 * 86_400_000;
  const views = buildTrend(id, 0);
  const downloads = buildTrend(id, 1).map((value) => Math.min(100, value + 26));

  const viewLine = views.map((value, index) => `${index === 0 ? "M" : "L"} ${40 + index * 70} ${value}`).join(" ");
  const downloadLine = downloads
    .map((value, index) => `${index === 0 ? "M" : "L"} ${40 + index * 70} ${value}`)
    .join(" ");

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 500 120"
    >
      <defs>
        <linearGradient id={`traffic-views-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`traffic-downloads-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 60, 100].map((y) => (
        <line
          key={y}
          x1="40"
          x2="460"
          y1={y}
          y2={y}
          stroke="currentColor"
          strokeDasharray="4 4"
          strokeOpacity="0.12"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={`${viewLine} L460 100 L40 100 Z`} fill={`url(#traffic-views-${id})`} />
      <path d={`${downloadLine} L460 100 L40 100 Z`} fill={`url(#traffic-downloads-${id})`} />
      <path
        d={viewLine}
        fill="none"
        stroke="#3b82f6"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={downloadLine}
        fill="none"
        stroke="var(--primary)"
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {[40, 250, 460].map((x, index) => (
        <text
          key={x}
          x={x}
          y="118"
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[9px] opacity-70"
        >
          {labelDate(
            index === 0 ? createdAt : index === 2 ? null : new Date(mid).toISOString(),
            index === 2 ? end : mid,
          )}
        </text>
      ))}
    </svg>
  );
}
