"use client";

import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CTRL_BTN =
  "grid h-4 w-[18px] place-items-center border border-[#2a2f8f] bg-[var(--color-chrome)] text-black [border-top-color:var(--color-chrome-hi)] [border-left-color:var(--color-chrome-hi)] active:[border-color:var(--color-chrome-lo)]";

export function Window({
  id,
  title,
  icon,
  position,
  zIndex,
  focused,
  onFocus,
  onClose,
  onMinimize,
  children,
}: {
  id: string;
  title: string;
  icon?: ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  focused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const x = position.x + (transform?.x ?? 0);
  const y = position.y + (transform?.y ?? 0);

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.14 }}
      onPointerDown={onFocus}
      style={{ left: x, top: y, zIndex }}
      className={cn(
        "absolute flex max-h-[80vh] w-[min(680px,92vw)] flex-col border-2 bg-[var(--color-chrome)] shadow-[3px_3px_0_rgba(0,0,0,0.35)]",
        "[border-color:var(--color-chrome-hi)_var(--color-chrome-lo)_var(--color-chrome-lo)_var(--color-chrome-hi)]",
        isDragging && "cursor-grabbing select-none",
      )}
    >
      <div
        {...listeners}
        {...attributes}
        className={cn(
          "flex h-8 shrink-0 cursor-grab touch-none items-center gap-2 border-b-2 px-1.5 text-white [border-bottom-color:var(--color-chrome-lo)]",
          "bg-gradient-to-b from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)]",
          !focused && "opacity-80 grayscale",
        )}
      >
        {icon}
        <span className="flex-1 truncate font-ui text-xs font-bold">
          {title}
        </span>
        <button
          type="button"
          aria-label="Minimize"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className={CTRL_BTN}
        >
          <Minus className="h-3 w-3" />
        </button>
        <button
          type="button"
          aria-label="Close"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={CTRL_BTN}
        >
          <X className="h-3 w-3" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white">{children}</div>
    </motion.div>
  );
}
