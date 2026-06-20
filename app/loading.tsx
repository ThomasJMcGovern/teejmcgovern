export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-5 bg-[#05060a] text-[#cfe]">
      <div className="font-display text-4xl text-white [text-shadow:0_0_18px_var(--color-hotpink)]">
        TJ_OS
      </div>
      <div className="h-3 w-48 overflow-hidden border-2 border-[#46508f] bg-[#0b0e1c]">
        <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-[var(--color-acid)] to-[var(--color-hotpink)]" />
      </div>
    </div>
  );
}
