"use client";

import { motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import { Glyph } from "./glyph";
import { renderVibe } from "@/components/vibes/vibe-router";
import type { Project } from "@/lib/projects.types";

const CTRL_BTN =
  "grid h-5 w-6 place-items-center border border-[#2a2f8f] bg-[var(--color-chrome)] text-black [border-top-color:var(--color-chrome-hi)] [border-left-color:var(--color-chrome-hi)] active:[border-color:var(--color-chrome-lo)]";

/** A full-screen "maximized window" vibe takeover with a retro title bar. */
export function TakeoverFrame({
  project,
  zIndex,
  onClose,
  onMinimize,
}: {
  project: Project;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{ zIndex }}
      className="absolute inset-x-0 bottom-10 top-0 flex flex-col bg-white"
    >
      <div className="flex h-8 shrink-0 items-center gap-2 border-b-2 bg-gradient-to-b from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)] px-2 text-white [border-bottom-color:var(--color-chrome-lo)]">
        <Glyph name={project.icon} className="h-4 w-4" />
        <span className="flex-1 truncate font-ui text-xs font-bold">
          {project.label}
        </span>
        <button
          type="button"
          aria-label="Minimize to desktop"
          onClick={onMinimize}
          className={CTRL_BTN}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={CTRL_BTN}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{renderVibe(project)}</div>
    </motion.div>
  );
}
