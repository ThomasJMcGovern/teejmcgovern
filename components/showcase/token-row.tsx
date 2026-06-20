/** Aligned name / value row for token lists. */
export function TokenRow({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/50 py-1.5 text-sm">
      <span className="font-medium">{name}</span>
      <span className="font-mono text-xs text-muted-foreground">{value}</span>
    </div>
  );
}
