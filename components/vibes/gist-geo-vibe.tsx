import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SafeImage } from "./safe-image";
import type { Project } from "@/lib/projects.types";

/** "os-chrome" vibe — a clean, readable product case study. */
export function GistGeoVibe({ project }: { project: Project }) {
  const cs = project.caseStudy;
  const title = project.label.replace(/_/g, " ");
  return (
    <article className="mx-auto max-w-3xl px-6 py-8 font-sans text-zinc-800">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>
        <p className="text-sm text-zinc-500">
          {project.role} · {project.dateRange}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="my-6" />

      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          The problem
        </h2>
        <p className="text-lg leading-relaxed text-zinc-800">{cs.problem}</p>
      </section>

      <section className="my-8 space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Process
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cs.processShots.map((shot) => (
            <figure key={shot.src} className="space-y-1.5">
              <SafeImage
                src={shot.src}
                alt={shot.caption}
                className="aspect-[4/3] rounded-md border border-zinc-200"
              />
              <figcaption className="text-[11px] leading-tight text-zinc-500">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="my-8 space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          The result
        </h2>
        <SafeImage
          src={cs.hero}
          alt={`${title} — hero`}
          className="aspect-video w-full rounded-lg border border-zinc-200 shadow-sm"
        />
      </section>

      <section className="space-y-3">
        <p className="leading-relaxed text-zinc-700">{cs.outcome}</p>
        {cs.link && (
          <a
            href={cs.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 underline underline-offset-4"
          >
            {cs.link.label} →
          </a>
        )}
      </section>
    </article>
  );
}
