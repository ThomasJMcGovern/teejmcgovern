import type { Project } from "@/lib/projects.types";
import { GistGeoVibe } from "./gist-geo-vibe";
import { GraphicsVibe } from "./graphics-vibe";
import { AskMatthewVibe } from "./ask-matthew-vibe";

/** Maps a project to its vibe component. Used by the OS shell and /p routes. */
export function renderVibe(project: Project) {
  switch (project.vibe) {
    case "girly-pop":
      return <GraphicsVibe project={project} />;
    case "creator":
      return <AskMatthewVibe project={project} />;
    case "os-chrome":
    default:
      return <GistGeoVibe project={project} />;
  }
}
