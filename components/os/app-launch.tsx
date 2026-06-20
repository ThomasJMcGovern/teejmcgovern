"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { vibeAccent } from "@/lib/projects";
import type { Project } from "@/lib/projects.types";

export interface LaunchOrigin {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Full-screen "app launching" overlay that reveals from the clicked icon,
 * shows boot text + a progress bar in the app's accent, then calls onComplete
 * (the shell then navigates to the app's route).
 */
export function AppLaunch({
  project,
  origin,
  onComplete,
}: {
  project: Project;
  origin: LaunchOrigin | null;
  onComplete: () => void;
}) {
  const accent = vibeAccent(project.vibe);
  const [pct, setPct] = useState(0);
  const lines = [
    `> launching ${project.label.replace(/_/g, " ")}...`,
    `> mounting /${project.id} module`,
    `> ok`,
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onComplete();
      return;
    }
    const DURATION = 820;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setPct(p);
      setShown(Math.min(lines.length, Math.floor((p / 100) * (lines.length + 1))));
      if (p < 100) raf = requestAnimationFrame(tick);
      else onComplete();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cx = origin ? origin.x + origin.w / 2 : 0;
  const cy = origin ? origin.y + origin.h / 2 : 0;
  const reveal = origin
    ? {
        initial: { clipPath: `circle(0px at ${cx}px ${cy}px)` },
        animate: { clipPath: `circle(160% at ${cx}px ${cy}px)` },
      }
    : { initial: { opacity: 0 }, animate: { opacity: 1 } };

  return (
    <motion.div
      initial={reveal.initial}
      animate={reveal.animate}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9500] flex flex-col items-center justify-center gap-5 bg-[#05060a]"
    >
      <div
        className="font-display text-3xl sm:text-4xl"
        style={{ color: accent.from, textShadow: `0 0 18px ${accent.from}` }}
      >
        {project.label.replace(/_/g, " ")}
      </div>
      <div className="w-[min(360px,72vw)] space-y-1 text-left font-mono text-xs text-[#8aa0c9]">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div className="h-3 w-[min(360px,72vw)] overflow-hidden border-2 border-[#2a3550] bg-black">
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
          }}
        />
      </div>
      <div
        aria-hidden
        className="scanlines pointer-events-none absolute inset-0 opacity-40"
      />
    </motion.div>
  );
}
