"use client";

import { cn } from "@/lib/utils";

export interface Work {
  src: string;
  title: string;
  caption: string;
  year?: string;
  status?: string;
}

function filename(src: string) {
  return src.split("/").pop() ?? src;
}

export function FileList({
  works,
  selected,
  onSelect,
}: {
  works: Work[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex h-full flex-col border border-br-grid bg-br-bg-teal/40 font-mono text-xs">
      <div className="border-b border-br-grid px-3 py-2 text-br-dim">
        ARCHIVE://graphics{" "}
        <span className="text-br-cyan">[{works.length} FILES]</span>
      </div>
      <ul className="flex-1 overflow-auto">
        {works.map((w, i) => {
          const active = i === selected;
          return (
            <li key={w.src}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors",
                  active
                    ? "bg-br-magenta/15 text-br-cyan"
                    : "text-br-dim hover:bg-white/5 hover:text-white",
                )}
              >
                <span className={cn("w-2 text-br-magenta", !active && "opacity-0")}>
                  &gt;
                </span>
                <span className="w-6 tabular-nums text-br-amber/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate">{filename(w.src)}</span>
                <span className="text-[10px] uppercase text-br-dim">
                  {w.status ?? "archive"}
                </span>
                {active && (
                  <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-br-cyan" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-br-grid px-3 py-2 text-[10px] text-br-dim">
        ↑/↓ select · click to load
      </div>
    </div>
  );
}
