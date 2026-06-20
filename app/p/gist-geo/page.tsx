import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { renderVibe } from "@/components/vibes/vibe-router";

const project = getProject("gist-geo");

export function generateMetadata(): Metadata {
  if (!project) return {};
  return {
    title: `${project.label.replace(/_/g, " ")} — TJ McGovern`,
    description: project.caseStudy.problem,
  };
}

export default function Page() {
  if (!project) notFound();
  return <main className="min-h-screen bg-white">{renderVibe(project)}</main>;
}
