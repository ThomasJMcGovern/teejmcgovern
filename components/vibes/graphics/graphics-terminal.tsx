"use client";

import { useState } from "react";
import { FileList, type Work } from "./file-list";
import { AnalysisViewport } from "./analysis-viewport";
import { CornerBrackets, Scanlines } from "./scanlines";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SafeImage } from "../safe-image";
import type { Project } from "@/lib/projects.types";

export function GraphicsTerminal({
  works,
  project,
}: {
  works: Work[];
  project: Project;
}) {
  const [selected, setSelected] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const work = works[selected];

  return (
    <div
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelected((s) => Math.min(works.length - 1, s + 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelected((s) => Math.max(0, s - 1));
        }
      }}
      className="relative min-h-full overflow-hidden bg-br-bg p-4 text-white outline-none"
    >
      {/* grid mesh + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(var(--color-br-grid)_1px,transparent_1px),linear-gradient(90deg,var(--color-br-grid)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_70%_at_50%_-10%,rgba(25,227,255,0.10),transparent_60%)]"
      />

      <div className="relative flex h-full min-h-[70vh] flex-col gap-3">
        {/* title strip */}
        <div className="flex items-center justify-between border border-br-grid bg-br-bg-teal/50 px-3 py-2 font-mono text-xs">
          <span className="font-display text-br-cyan [text-shadow:0_0_8px_var(--color-br-cyan)]">
            IMAGE ANALYSIS TERMINAL
          </span>
          <span className="text-br-dim">v2.07 · graphics archive</span>
        </div>

        {/* body */}
        <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-[280px_1fr]">
          <FileList works={works} selected={selected} onSelect={setSelected} />
          <AnalysisViewport
            work={work}
            index={selected}
            total={works.length}
            project={project}
            onZoom={() => setZoomOpen(true)}
          />
        </div>
      </div>

      {/* terminal-wide overlays */}
      <CornerBrackets className="z-30" />
      <Scanlines className="z-30 opacity-25" />

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-4xl border-2 border-br-cyan bg-black p-2">
          <DialogTitle className="sr-only">{work.title}</DialogTitle>
          <SafeImage
            src={work.src}
            alt={work.title}
            className="aspect-[3/4] max-h-[85vh] w-full"
            imgClassName="object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
