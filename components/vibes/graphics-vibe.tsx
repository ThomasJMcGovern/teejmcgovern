import { GraphicsTerminal } from "./graphics/graphics-terminal";
import type { Work } from "./graphics/file-list";
import type { Project } from "@/lib/projects.types";

/** "Blade Runner image-analysis terminal" — TJ's graphics archive. */
export function GraphicsVibe({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;
  const works: Work[] = [
    {
      src: cs.hero,
      title: "GIRLY POP",
      caption: "Pink-Y2K portrait — sparkles, chrome, and a flip-phone.",
      year: project.dateRange,
    },
    ...cs.processShots.map((s) => ({
      src: s.src,
      title: s.title ?? s.caption,
      caption: s.caption,
      year: s.year,
    })),
  ];

  return <GraphicsTerminal works={works} project={project} />;
}
