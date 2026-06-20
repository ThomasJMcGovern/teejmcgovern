import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[linear-gradient(160deg,var(--color-desk-2),var(--color-desk-1)_45%,var(--color-desk-3))] p-4 font-ui">
      <div className="w-[min(380px,92vw)] border-2 bg-[var(--color-chrome)] shadow-[3px_3px_0_rgba(0,0,0,0.35)] [border-color:var(--color-chrome-hi)_var(--color-chrome-lo)_var(--color-chrome-lo)_var(--color-chrome-hi)]">
        <div className="flex h-7 items-center bg-gradient-to-b from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)] px-2 text-white">
          <span className="text-xs font-bold">Error</span>
        </div>
        <div className="space-y-5 p-5 text-sm text-[var(--color-ink)]">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-hotpink)] text-base font-bold text-white">
              !
            </span>
            <p className="leading-relaxed">
              The file you&rsquo;re looking for could not be found. It may have
              been moved or deleted.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href="/"
              className="border-2 bg-[var(--color-chrome)] px-5 py-1 text-xs font-bold [border-color:var(--color-chrome-hi)_var(--color-chrome-lo)_var(--color-chrome-lo)_var(--color-chrome-hi)] active:[border-color:var(--color-chrome-lo)_var(--color-chrome-hi)_var(--color-chrome-hi)_var(--color-chrome-lo)]"
            >
              OK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
