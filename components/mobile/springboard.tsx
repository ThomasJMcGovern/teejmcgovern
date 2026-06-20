import Link from "next/link";
import { Glyph } from "@/components/os/glyph";
import { PROJECTS } from "@/lib/projects";
import type { Vibe } from "@/lib/projects.types";
import { cn } from "@/lib/utils";

const VIBE_TILE: Record<Vibe, string> = {
  "os-chrome": "from-[var(--color-titlebar-2)] to-[var(--color-titlebar-1)]",
  "girly-pop": "from-[var(--color-hotpink)] to-[#9b2c6f]",
  creator: "from-[var(--color-acid)] to-[#6e8a00]",
};

/** Y2K phone "home screen" — the mobile fallback for the desktop OS. */
export function Springboard() {
  return (
    <div className="flex min-h-screen flex-col bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,63,164,0.35),transparent_55%),linear-gradient(180deg,var(--color-desk-2),var(--color-desk-1)_45%,var(--color-desk-3))] px-6 pb-10 pt-3 text-white">
      {/* status bar */}
      <div className="flex items-center justify-between font-ui text-[11px] text-white/80">
        <span>TJ_OS</span>
        <span>▮▮▮ ◖</span>
      </div>

      {/* identity */}
      <header className="mt-10 text-center">
        <h1 className="font-display text-4xl text-white [text-shadow:0_0_18px_var(--color-hotpink)]">
          TJ_OS
        </h1>
        <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-white/70">
          TJ McGovern
        </p>
      </header>

      {/* app grid */}
      <div className="mt-12 grid grid-cols-3 gap-x-4 gap-y-7">
        {PROJECTS.map((p) => (
          <Link
            key={p.id}
            href={p.route}
            className="flex flex-col items-center gap-2 outline-none"
          >
            <span
              className={cn(
                "grid h-16 w-16 place-items-center rounded-2xl border-2 border-white/40 bg-gradient-to-b shadow-[3px_4px_0_rgba(0,0,0,0.3)] active:scale-95",
                VIBE_TILE[p.vibe],
              )}
            >
              <Glyph name={p.icon} className="h-7 w-7 text-white drop-shadow" />
            </span>
            <span className="font-ui text-[11px] leading-tight text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.85)]">
              {p.label}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-auto pt-8 text-center font-ui text-[11px] text-white/60">
        tap an app · for the full desktop, open on a laptop
      </p>
    </div>
  );
}
