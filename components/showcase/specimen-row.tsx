import { cn } from "@/lib/utils";

/** A font specimen shown at several sizes, labeled with the class to use. */
export function SpecimenRow({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className="border-b border-border/50 py-4">
      <div className="mb-2 font-mono text-[11px] text-muted-foreground">
        {label}
      </div>
      <p className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", className)}>
        <span className="text-3xl">Ag</span>
        <span className="text-xl">The quick brown fox</span>
        <span className="text-sm">jumps over the lazy dog · 0123456789</span>
      </p>
    </div>
  );
}
