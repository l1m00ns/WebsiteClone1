import { Gamepad2 } from "lucide-react";
import { gameIcon, invertClass } from "@/lib/game-media";
import { cn } from "@/lib/utils";

export function GameIcon({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) {
  const icon = gameIcon(name);
  if (!icon) {
    return <Gamepad2 className={cn("shrink-0 text-muted-foreground", className)} aria-hidden="true" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon.src}
      alt=""
      width={32}
      height={32}
      className={cn("shrink-0 object-contain", invertClass(icon), className)}
      loading="lazy"
    />
  );
}
