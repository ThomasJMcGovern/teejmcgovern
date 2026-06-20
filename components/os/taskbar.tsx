"use client";

import { useEffect, useState } from "react";

export function Taskbar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    const raf = requestAnimationFrame(() => setTime(fmt()));
    const i = setInterval(() => setTime(fmt()), 15000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(i);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-0 z-[8000] flex h-10 items-center gap-1.5 border-t-2 border-[#b9c0ff] bg-gradient-to-b from-[#7c87ff] to-[var(--color-desk-3)] px-1.5">
      <div className="flex h-7 items-center gap-1.5 border-2 bg-gradient-to-b from-[#dfff7a] to-[var(--color-acid)] px-2.5 font-ui text-[13px] font-bold text-[#06210a] [border-color:#fbffd6_#5e7a00_#5e7a00_#fbffd6]">
        <span className="text-base leading-none">✦</span> Start
      </div>
      <div className="flex-1" />
      <div className="flex h-[26px] items-center border border-[#2a2f6f] bg-black/25 px-2.5 font-ui text-xs text-white [border-top-color:#9aa6ff]">
        {time || "--:--"}
      </div>
    </div>
  );
}
