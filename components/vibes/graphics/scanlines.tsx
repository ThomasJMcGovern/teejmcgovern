import { cn } from "@/lib/utils";

/** CRT scanline overlay. */
export function Scanlines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "scanlines pointer-events-none absolute inset-0 opacity-60",
        className,
      )}
    />
  );
}

/** Four glowing HUD corner brackets around a frame. */
export function CornerBrackets({
  className,
  color = "var(--color-br-cyan)",
}: {
  className?: string;
  color?: string;
}) {
  const arm = "pointer-events-none absolute h-5 w-5";
  const glow = { borderColor: color, filter: `drop-shadow(0 0 6px ${color})` };
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(arm, "left-1 top-1 border-l-2 border-t-2")} style={glow} />
      <span className={cn(arm, "right-1 top-1 border-r-2 border-t-2")} style={glow} />
      <span className={cn(arm, "bottom-1 left-1 border-b-2 border-l-2")} style={glow} />
      <span className={cn(arm, "bottom-1 right-1 border-b-2 border-r-2")} style={glow} />
    </div>
  );
}
