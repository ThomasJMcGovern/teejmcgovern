import { cn } from "@/lib/utils";

/**
 * A color chip + label. Semantic tokens pass `cssVar` (renders via var() so it
 * tracks the light/dark toggle); the retro palette passes a `className`
 * (e.g. "bg-acid") since those are fixed brand colors.
 */
export function ColorSwatch({
  label,
  value,
  cssVar,
  className,
}: {
  label: string;
  value: string;
  cssVar?: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "h-10 w-10 shrink-0 rounded-md border border-border/60",
          className,
        )}
        style={cssVar ? { background: `var(${cssVar})` } : undefined}
      />
      <div className="min-w-0">
        <div className="truncate text-xs font-medium">{label}</div>
        <div className="truncate font-mono text-[11px] text-muted-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}
