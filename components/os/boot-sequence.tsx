"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** CRT boot screen with an animated progress bar. Calls onDone when finished. */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setPct(100);
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }
    const DURATION = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  return (
    <div className="absolute inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-[#05060a] text-[#cfe]">
      <div className="font-display text-5xl text-white [text-shadow:0_0_18px_var(--color-hotpink),0_0_38px_var(--color-desk-2)] sm:text-6xl">
        TJ_OS
      </div>
      <div className="text-[11px] uppercase tracking-[0.5em] text-[#7e89c9]">
        TJ McGovern
      </div>
      <div className="h-4 w-[min(360px,70vw)] border-2 border-[#46508f] bg-[#0b0e1c] p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-acid)] to-[var(--color-hotpink)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="font-ui text-[11px] tracking-wider text-[#566677]">
        loading desktop…
      </div>
    </div>
  );
}
