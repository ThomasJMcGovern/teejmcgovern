"use client";

import { useEffect, useState } from "react";
import { Glyph } from "./glyph";
import { cn } from "@/lib/utils";

export interface TaskItem {
  id: string;
  label: string;
  icon: string;
  minimized: boolean;
}

export function Taskbar({
  items,
  focusedId,
  onToggle,
}: {
  items: TaskItem[];
  focusedId: string | null;
  onToggle: (id: string) => void;
}) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    // First paint shows "--:--"; fill on the next frame (async — avoids a
    // synchronous setState in the effect body) then tick.
    const raf = requestAnimationFrame(() => setTime(fmt()));
    const i = setInterval(() => setTime(fmt()), 15000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(i);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 z-[8000] flex h-10 items-center gap-1.5 border-t-2 border-[#b9c0ff] bg-gradient-to-b from-[#7c87ff] to-[var(--color-desk-3)] px-1.5">
      <div className="flex h-7 items-center gap-1.5 border-2 bg-gradient-to-b from-[#dfff7a] to-[var(--color-acid)] px-2.5 font-ui text-[13px] font-bold text-[#06210a] [border-color:#fbffd6_#5e7a00_#5e7a00_#fbffd6]">
        <span className="text-base leading-none">✦</span> Start
      </div>
      <div className="flex flex-1 items-center gap-1 overflow-hidden">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => onToggle(it.id)}
            className={cn(
              "flex h-[26px] max-w-[170px] items-center gap-1.5 overflow-hidden border px-2 font-ui text-xs text-white [border-color:#2a2f6f] [border-top-color:#9aa6ff]",
              focusedId === it.id && !it.minimized
                ? "bg-black/30"
                : "bg-white/15",
            )}
          >
            <Glyph name={it.icon} className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{it.label}</span>
          </button>
        ))}
      </div>
      <div className="flex h-[26px] items-center border border-[#2a2f6f] bg-black/25 px-2.5 font-ui text-xs text-white [border-top-color:#9aa6ff]">
        {time || "--:--"}
      </div>
    </div>
  );
}
