"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, X } from "lucide-react";
import { Glyph } from "./glyph";
import { vibeAccent } from "@/lib/projects";
import type { Project } from "@/lib/projects.types";

const CTRL =
  "grid h-5 w-6 place-items-center border border-black/40 bg-white/15 text-white hover:bg-white/25";

/**
 * Wraps each app page: a "power-on" entrance (full when arrived via the desktop
 * launch overlay, lighter on deep-link), a retro titlebar with back-to-desktop,
 * and an Escape handler.
 */
export function AppFrame({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const accent = vibeAccent(project.vibe);
  const [closing, setClosing] = useState(false);

  const goHome = useCallback(() => {
    if (reduce) {
      router.push("/");
      return;
    }
    setClosing(true);
    window.setTimeout(() => router.push("/"), 230);
  }, [reduce, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goHome]);

  const full = !reduce;
  const initial = full ? { scaleY: 0.004, opacity: 0.4 } : false;

  return (
    <div className="flex h-screen flex-col bg-black">
      <div
        className="flex h-8 shrink-0 items-center gap-2 border-b-2 bg-gradient-to-b from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)] px-2 text-white"
        style={{ borderBottomColor: accent.from }}
      >
        <Glyph name={project.icon} className="h-4 w-4" />
        <span className="flex-1 truncate font-ui text-xs font-bold">
          {project.label}
        </span>
        <button
          type="button"
          aria-label="Minimize to desktop"
          onClick={goHome}
          className={CTRL}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={goHome}
          className={CTRL}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <motion.div
        initial={initial}
        animate={
          closing
            ? { scaleY: reduce ? 1 : 0.004, opacity: 0 }
            : { scaleY: 1, opacity: 1 }
        }
        transition={{
          duration: closing ? 0.22 : full ? 0.45 : 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "center" }}
        className="relative min-h-0 flex-1 overflow-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}
