"use client";

import { useEffect, useState } from "react";

/**
 * Returns true on phone-width viewports. Null until mounted so the server and
 * first client paint agree (avoids a hydration mismatch).
 */
export function useIsMobile(query = "(max-width: 767px)"): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return isMobile;
}
