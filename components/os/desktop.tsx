"use client";

import { DesktopIcon } from "./desktop-icon";
import { PROJECTS } from "@/lib/projects";
import type { LaunchOrigin } from "./app-launch";

export function Desktop({
  onOpen,
}: {
  onOpen: (id: string, origin: LaunchOrigin) => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* wallpaper */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_8%,rgba(255,63,164,0.30),transparent_55%),radial-gradient(130%_100%_at_12%_98%,rgba(198,240,0,0.22),transparent_50%),linear-gradient(160deg,var(--color-desk-2),var(--color-desk-1)_45%,var(--color-desk-3))]" />
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_50%_50%,#fff_1.2px,transparent_1.6px)] [background-size:26px_26px]" />

      {/* icon column */}
      <div className="absolute left-0 top-0 flex flex-col flex-wrap content-start gap-1 p-3">
        {PROJECTS.map((p) => (
          <DesktopIcon
            key={p.id}
            project={p}
            onOpen={(origin) => onOpen(p.id, origin)}
          />
        ))}
      </div>
    </div>
  );
}
