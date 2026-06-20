"use client";

import type { ReactNode } from "react";
import type { Work } from "./file-list";
import type { Project } from "@/lib/projects.types";
import { SafeImage } from "../safe-image";
import { Scanlines, CornerBrackets } from "./scanlines";

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-br-dim/60">{k}</span>
      <span className="truncate text-right text-white/80">{v}</span>
    </div>
  );
}

export function AnalysisViewport({
  work,
  index,
  total,
  project,
  onZoom,
}: {
  work: Work;
  index: number;
  total: number;
  project: Project;
  onZoom: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      {/* image stage */}
      <div className="relative min-h-[320px] flex-1 border border-br-grid bg-black">
        <button
          type="button"
          onClick={onZoom}
          aria-label={`Zoom ${work.title}`}
          className="group relative block h-full w-full"
        >
          <SafeImage
            key={index}
            src={work.src}
            alt={work.title}
            className="glitch-in absolute inset-0 h-full w-full bg-black"
            imgClassName="object-contain"
          />
          <Scanlines className="z-10" />
          <CornerBrackets className="z-20" />
          <span className="absolute bottom-2 right-2 z-30 border border-br-cyan/60 bg-black/70 px-2 py-1 font-mono text-[10px] text-br-cyan opacity-0 transition-opacity group-hover:opacity-100">
            ⤢ ENHANCE
          </span>
        </button>
      </div>

      {/* metadata HUD */}
      <div className="w-full shrink-0 border border-br-grid bg-br-bg-teal/40 p-3 font-mono text-xs lg:w-64">
        <div className="font-display text-sm text-br-magenta [text-shadow:-1px_0_var(--color-br-cyan)]">
          {work.title}
        </div>
        <div className="mt-3 space-y-1.5">
          <Row k="FILE" v={work.src.split("/").pop() ?? ""} />
          <Row k="INDEX" v={`${index + 1} / ${total}`} />
          <Row k="YEAR" v={work.year ?? project.dateRange} />
          <Row k="STATUS" v={<span className="text-br-amber">ARCHIVE</span>} />
          <Row k="SOURCE" v="PHOTOSHOP" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="border border-br-cyan/40 px-1.5 py-0.5 text-[10px] text-br-cyan"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 leading-relaxed text-br-dim">{work.caption}</p>
      </div>
    </div>
  );
}
