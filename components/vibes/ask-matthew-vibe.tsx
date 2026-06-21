import { AskMatthewChat } from "./ask-matthew-chat";
import type { Project } from "@/lib/projects.types";

/** "creator" vibe — a chat-first link-in-bio with a scripted assistant. */
export function AskMatthewVibe({ project }: { project: Project }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col bg-zinc-50">
      <header className="shrink-0 bg-gradient-to-r from-[var(--color-hotpink)] to-[var(--color-acid)] px-5 py-4 text-white">
        <h1 className="text-xl font-bold">Ask Matthew</h1>
        <p className="text-xs text-white/90">{project.caseStudy?.problem}</p>
      </header>
      <div className="min-h-0 flex-1">
        <AskMatthewChat />
      </div>
    </div>
  );
}
