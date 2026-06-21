import type { Project } from "@/lib/projects.types";
import { GistGeoVibe } from "./gist-geo-vibe";
import { GraphicsVibe } from "./graphics-vibe";
import { AskMatthewVibe } from "./ask-matthew-vibe";
import { ProfileShell } from "./profile/profile-shell";

/** Maps a project to its vibe component. Used by the OS shell and /<id> routes. */
export function renderVibe(project: Project) {
  switch (project.vibe) {
    case "girly-pop":
      return <GraphicsVibe project={project} />;
    case "creator":
      return <AskMatthewVibe project={project} />;
    case "profile":
      return <ProfileShell />;
    case "os-chrome":
    default:
      return <GistGeoVibe project={project} />;
  }
}
