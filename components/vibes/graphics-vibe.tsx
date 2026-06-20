"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SafeImage } from "./safe-image";
import type { Project } from "@/lib/projects.types";

/** "girly-pop" vibe — a hot-pink Y2K gallery with a lightbox. */
export function GraphicsVibe({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const works = [
    { src: cs.hero, caption: "GIRLY POP" },
    ...cs.processShots.map((s) => ({ src: s.src, caption: s.caption })),
  ];

  return (
    <div className="min-h-full bg-[radial-gradient(120%_90%_at_50%_0%,#ffd1ec,transparent_60%),linear-gradient(180deg,#ff7ac0,#ff3fa4_55%,#c41d77)] px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="font-bungee text-4xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.35)] sm:text-6xl">
            GIRLY POP
          </h1>
          <p className="font-marker mt-2 text-lg text-white/90">
            Y2K graphics · posters · photo edits
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {works.map((w, i) => (
            <Dialog key={`${w.src}-${i}`}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group relative block overflow-hidden rounded-2xl border-4 border-white/80 shadow-[4px_6px_0_rgba(0,0,0,0.25)] outline-none transition-transform hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[var(--color-acid)]"
                >
                  <SafeImage
                    src={w.src}
                    alt={w.caption}
                    className="aspect-[3/4]"
                    imgClassName="transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="font-marker pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                    {w.caption}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-4 border-[var(--color-hotpink)] bg-black p-2">
                <DialogTitle className="sr-only">{w.caption}</DialogTitle>
                <SafeImage
                  src={w.src}
                  alt={w.caption}
                  className="aspect-[3/4] max-h-[80vh] w-full"
                  imgClassName="object-contain"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <p className="font-marker mx-auto mt-10 max-w-xl text-center text-sm text-white/90">
          {cs.outcome}
        </p>
      </div>
    </div>
  );
}
