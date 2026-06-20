"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { OsShell } from "@/components/os/os-shell";
import { Springboard } from "@/components/mobile/springboard";

/** Picks the desktop OS shell or the mobile springboard by viewport. */
export function ShellSwitch() {
  const isMobile = useIsMobile();
  // Until mounted, show the boot-colored backdrop so the swap is seamless.
  if (isMobile === null) return <div className="fixed inset-0 bg-[#05060a]" />;
  return isMobile ? <Springboard /> : <OsShell />;
}
