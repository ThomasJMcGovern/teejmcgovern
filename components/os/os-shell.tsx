"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "./boot-sequence";
import { Desktop } from "./desktop";
import { Taskbar } from "./taskbar";
import { AppLaunch, type LaunchOrigin } from "./app-launch";
import { getProject } from "@/lib/projects";
import type { Project } from "@/lib/projects.types";

export function OsShell() {
  const router = useRouter();
  // Boot plays once per session. OsShell only mounts client-side (after
  // ShellSwitch resolves the viewport), so reading sessionStorage at init is safe.
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem("tj_booted") === "1";
    } catch {
      return false;
    }
  });
  const [launch, setLaunch] = useState<{
    project: Project;
    origin: LaunchOrigin | null;
  } | null>(null);

  const onDone = useCallback(() => {
    setBooted(true);
    try {
      sessionStorage.setItem("tj_booted", "1");
    } catch {}
  }, []);

  const handleOpen = useCallback(
    (id: string, origin: LaunchOrigin | null) => {
      const project = getProject(id);
      if (!project) return;
      // Immersive apps open straight into their own full-bleed experience.
      if (project.immersive) {
        router.push(project.route);
        return;
      }
      setLaunch({ project, origin });
    },
    [router],
  );

  const onLaunchComplete = useCallback(() => {
    setLaunch((l) => {
      if (l) router.push(l.project.route);
      return l; // keep overlay until navigation unmounts the shell
    });
  }, [router]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black font-ui">
      <Desktop onOpen={handleOpen} />

      {/* CRT scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-[9000] opacity-40 mix-blend-multiply [background:repeating-linear-gradient(to_bottom,rgba(0,0,0,0.10)_0_1px,transparent_1px_3px)]" />

      <Taskbar />

      <AnimatePresence>
        {launch && (
          <AppLaunch
            key="launch"
            project={launch.project}
            origin={launch.origin}
            onComplete={onLaunchComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!booted && <BootSequence onDone={onDone} />}
      </AnimatePresence>
    </div>
  );
}
