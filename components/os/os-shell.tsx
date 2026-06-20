"use client";

import { useCallback, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "./boot-sequence";
import { Desktop } from "./desktop";
import { Window } from "./window";
import { TakeoverFrame } from "./takeover-frame";
import { Taskbar, type TaskItem } from "./taskbar";
import { Glyph } from "./glyph";
import { useWindowManager } from "@/hooks/use-window-manager";
import { getProject } from "@/lib/projects";
import { renderVibe } from "@/components/vibes/vibe-router";

type Pos = { x: number; y: number };
const defaultPos = (i: number): Pos => ({ x: 70 + i * 36, y: 60 + i * 30 });

export function OsShell() {
  const [booted, setBooted] = useState(false);
  const [positions, setPositions] = useState<Record<string, Pos>>({});
  const { state, open, close, minimize, toggle, focus } = useWindowManager();

  const onDone = useCallback(() => setBooted(true), []);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  const handleOpen = useCallback(
    (id: string) => {
      setPositions((prev) =>
        prev[id] ? prev : { ...prev, [id]: defaultPos(Object.keys(prev).length) },
      );
      open(id);
    },
    [open],
  );

  const onDragEnd = useCallback((e: DragEndEvent) => {
    const id = String(e.active.id);
    setPositions((prev) => {
      const base = prev[id] ?? defaultPos(0);
      return { ...prev, [id]: { x: base.x + e.delta.x, y: base.y + e.delta.y } };
    });
  }, []);

  const windowed = state.windows.filter(
    (w) => getProject(w.id)?.openMode === "window" && !w.minimized,
  );
  const takeovers = state.windows.filter(
    (w) => getProject(w.id)?.openMode === "takeover" && !w.minimized,
  );

  const taskItems: TaskItem[] = state.windows.map((w) => {
    const p = getProject(w.id)!;
    return { id: w.id, label: p.label, icon: p.icon, minimized: w.minimized };
  });

  return (
    <div className="fixed inset-0 overflow-hidden bg-black font-ui">
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <Desktop onOpen={handleOpen} />
        <AnimatePresence>
          {windowed.map((w) => {
            const p = getProject(w.id)!;
            return (
              <Window
                key={w.id}
                id={w.id}
                title={p.label}
                icon={<Glyph name={p.icon} className="h-4 w-4" />}
                position={positions[w.id] ?? defaultPos(0)}
                zIndex={w.zIndex}
                focused={state.focusedId === w.id}
                onFocus={() => focus(w.id)}
                onClose={() => close(w.id)}
                onMinimize={() => minimize(w.id)}
              >
                {renderVibe(p)}
              </Window>
            );
          })}
        </AnimatePresence>
      </DndContext>

      <AnimatePresence>
        {takeovers.map((w) => {
          const p = getProject(w.id)!;
          return (
            <TakeoverFrame
              key={w.id}
              project={p}
              zIndex={w.zIndex}
              onClose={() => close(w.id)}
              onMinimize={() => minimize(w.id)}
            />
          );
        })}
      </AnimatePresence>

      {/* CRT scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-[9000] opacity-40 mix-blend-multiply [background:repeating-linear-gradient(to_bottom,rgba(0,0,0,0.10)_0_1px,transparent_1px_3px)]" />

      <Taskbar items={taskItems} focusedId={state.focusedId} onToggle={toggle} />

      <AnimatePresence>
        {!booted && <BootSequence onDone={onDone} />}
      </AnimatePresence>
    </div>
  );
}
