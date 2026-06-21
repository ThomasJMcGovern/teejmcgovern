/** The TJ_OS concentric-ring emblem (reused by gate, logo, node). */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden>
      <circle className="ring" cx="64" cy="64" r="58" />
      <circle className="ring" cx="64" cy="64" r="46" />
      <rect className="mark" x="40" y="52" width="48" height="7" />
      <rect className="mark" x="40" y="69" width="34" height="7" />
      <rect className="mark" x="78" y="69" width="10" height="7" />
    </svg>
  );
}
