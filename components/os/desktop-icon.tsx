"use client";

import { useRef } from "react";
import { Glyph } from "./glyph";
import { vibeAccent } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects.types";
import type { LaunchOrigin } from "./app-launch";

export function DesktopIcon({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (origin: LaunchOrigin) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const accent = vibeAccent(project.vibe);

  const handle = () => {
    const r = ref.current?.getBoundingClientRect();
    onOpen(
      r
        ? { x: r.x, y: r.y, w: r.width, h: r.height }
        : { x: 0, y: 0, w: 0, h: 0 },
    );
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handle}
      aria-label={`Open ${project.label}`}
      className={cn(
        "group flex w-24 flex-col items-center gap-1.5 rounded-sm border border-dotted border-transparent p-2 text-center outline-none transition-colors",
        "hover:border-white/40 hover:bg-white/10 focus-visible:border-white/80 focus-visible:bg-[var(--color-desk-1)]/50 active:bg-[var(--color-desk-1)]/60",
      )}
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-md border-2 border-white/40 shadow-[2px_2px_0_rgba(0,0,0,0.35)] transition-transform group-hover:-translate-y-0.5"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${accent.from}, ${accent.to})`,
        }}
      >
        <Glyph name={project.icon} className="h-6 w-6 text-white drop-shadow" />
      </span>
      <span className="font-ui text-xs leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.85)]">
        {project.label}
      </span>
    </button>
  );
}
