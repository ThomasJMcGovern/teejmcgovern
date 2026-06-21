"use client";

import { useEffect, useState } from "react";

const INITIAL = "04________ TJOS // 16:00:00";

export function Footer({
  muted,
  onMute,
  onReplay,
  onExit,
}: {
  muted: boolean;
  onMute: () => void;
  onReplay: () => void;
  onExit: () => void;
}) {
  const [time, setTime] = useState(INITIAL);
  useEffect(() => {
    const p = (n: number) => String(n).padStart(2, "0");
    const fmt = () => {
      const d = new Date();
      return `04________ TJOS // ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    const raf = requestAnimationFrame(() => setTime(fmt()));
    const i = setInterval(() => setTime(fmt()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(i);
    };
  }, []);

  return (
    <div className="footer">
      <div id="clock">
        <span>{time}</span>
        <span className="cur" />
      </div>
      <div id="ctrl">
        <button type="button" onClick={onReplay}>
          <span className="g">&#8635;</span>
          <span>Restart Boot</span>
        </button>
        <button type="button" onClick={onMute}>
          <span className="g">{muted ? "▶" : "■"}</span>
          <span className="t">{muted ? "Engage Audio" : "Disengage Audio"}</span>
        </button>
        <button type="button" id="exit" onClick={onExit}>
          <span className="g">&#9654;</span>
          <span>Exit &#9656; Desktop</span>
        </button>
      </div>
    </div>
  );
}
