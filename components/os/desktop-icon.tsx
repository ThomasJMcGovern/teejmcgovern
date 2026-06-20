"use client";

import { Glyph } from "./glyph";
import { cn } from "@/lib/utils";
import type { Project, Vibe } from "@/lib/projects.types";

/** Tile gradient previews the project's vibe right on the desktop. */
const VIBE_TILE: Record<Vibe, string> = {
  "os-chrome": "from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)]",
  "girly-pop": "from-[var(--color-hotpink)] to-[#9b2c6f]",
  creator: "from-[var(--color-acid)] to-[#6e8a00]",
};

export function DesktopIcon({
  project,
  selected,
  onSelect,
  onOpen,
}: {
  project: Project;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open ${project.label}`}
      className={cn(
        "group flex w-24 flex-col items-center gap-1.5 rounded-sm border border-dotted border-transparent p-2 text-center outline-none transition-colors",
        "hover:bg-white/10 focus-visible:border-white/80 focus-visible:bg-[var(--color-desk-1)]/50",
        selected && "border-white/70 bg-[var(--color-desk-1)]/50",
      )}
    >
      <span
        className={cn(
          "grid h-12 w-12 place-items-center rounded-md border-2 border-white/40 bg-gradient-to-b shadow-[2px_2px_0_rgba(0,0,0,0.35)]",
          VIBE_TILE[project.vibe],
        )}
      >
        <Glyph name={project.icon} className="h-6 w-6 text-white drop-shadow" />
      </span>
      <span
        className={cn(
          "font-ui text-xs leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.85)]",
          selected && "rounded-[2px] bg-[#0a1f7a] px-1",
        )}
      >
        {project.label}
      </span>
    </button>
  );
}
