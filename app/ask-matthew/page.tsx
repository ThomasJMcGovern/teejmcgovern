import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { renderVibe } from "@/components/vibes/vibe-router";
import { AppFrame } from "@/components/os/app-frame";

const project = getProject("ask-matthew");

export function generateMetadata(): Metadata {
  if (!project) return {};
  return {
    title: `${project.label.replace(/_/g, " ")} — TJ McGovern`,
    description: project.caseStudy?.problem,
  };
}

export default function Page() {
  if (!project) notFound();
  return (
    <AppFrame project={project}>
      <div className="h-full">{renderVibe(project)}</div>
    </AppFrame>
  );
}
