"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Twill, Scanlines, Vignette, CropMarks } from "./effects";
import { Gate } from "./gate";
import { ProphecyBoot } from "./prophecy-boot";
import { Topbar } from "./topbar";
import { Mainframe } from "./mainframe";
import { AuxPanel } from "./aux-panel";
import { Subsystem } from "./subsystem";
import { RightRail } from "./right-rail";
import { Footer } from "./footer";
import { SECTIONS } from "./sections";
import { useProphecyAudio } from "./use-prophecy-audio";

type Phase = "gate" | "boot" | "live";

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** The TJ_OS // Prophecy Shell — the immersive "Profile" experience. */
export function ProfileShell() {
  const router = useRouter();
  const audio = useProphecyAudio();
  const [phase, setPhase] = useState<Phase>("gate");
  const [revealed, setRevealed] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [pane, setPane] = useState<string | null>(null);

  const exit = useCallback(() => router.push("/"), [router]);

  const enter = useCallback(() => {
    audio.start();
    setPhase(prefersReduced() ? "live" : "boot");
  }, [audio]);

  const onBootDone = useCallback(() => setPhase("live"), []);

  const selectSection = (key: string) => {
    setSection(key);
    setPane(SECTIONS[key].nav[0]);
  };
  const goMainframe = () => {
    setSection(null);
    setPane(null);
  };
  const onNav = (key: string) =>
    section === key ? goMainframe() : selectSection(key);

  const replay = () => {
    goMainframe();
    setRevealed(false);
    setPhase("boot");
  };

  // Fade the dashboard in a tick after going live.
  useEffect(() => {
    if (phase !== "live") return;
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Esc → back to desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit]);

  return (
    <div
      className={cn(
        "profile-shell",
        phase !== "gate" && "entered",
        phase === "live" && revealed && "live go",
      )}
    >
      <Twill />
      <CropMarks />

      {phase === "boot" && <ProphecyBoot onComplete={onBootDone} />}

      {phase === "live" && (
        <div id="ui">
          <Topbar section={section} onNav={onNav} onHome={goMainframe} />
          <div className="workspace">
            <div className="col left">
              <Mainframe section={section} pane={pane} onPane={setPane} />
              <AuxPanel collapsed={!!section} onExpand={goMainframe} />
              <Subsystem />
            </div>
            <RightRail />
          </div>
          <Footer
            muted={audio.muted}
            onMute={audio.toggleMute}
            onReplay={replay}
            onExit={exit}
          />
        </div>
      )}

      <Scanlines />
      <Vignette />

      <Gate hidden={phase !== "gate"} onEnter={enter} />
    </div>
  );
}
