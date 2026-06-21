"use client";

import { useEffect, useRef, useState } from "react";

const LOG: { label: string; stat: string | null; alert?: boolean }[] = [
  { label: "Initialize TJOS kernel", stat: "OK" },
  { label: "Mount datacore-6402B", stat: "OK" },
  { label: "Load design modules", stat: null }, // shows count-up %
  { label: "Establish datapath // Los Angeles", stat: "LINKED" },
  { label: "Node engaged", stat: "MISSION.__GO", alert: true },
];

/** BIOS boot sequence → calls onComplete when the shell is ready to go live. */
export function ProphecyBoot({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState(0);
  const [pct, setPct] = useState(0);
  const [biosOn, setBiosOn] = useState(false);
  const [wireOn, setWireOn] = useState(false);
  const [fade, setFade] = useState(false);
  const [emblemOn, setEmblemOn] = useState(false);
  const wireRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onComplete();
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));

    const els = wireRef.current
      ? (Array.from(
          wireRef.current.querySelectorAll("path,rect,line"),
        ) as SVGGeometryElement[])
      : [];
    els.forEach((el) => {
      let len = 400;
      try {
        len = el.getTotalLength() || 400;
      } catch {}
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });

    LOG.forEach((_, i) =>
      at(300 + i * 340, () => setLines((n) => Math.max(n, i + 1))),
    );
    at(600, () => setBiosOn(true));
    at(1000, () => setWireOn(true));
    at(1000, () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / 1000, 1);
        setPct(Math.round(t * 100));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    at(1120, () =>
      els.forEach((el, i) => {
        timers.push(
          window.setTimeout(() => {
            el.style.strokeDashoffset = "0";
          }, i * 120),
        );
      }),
    );
    at(2900, () => setFade(true));
    at(3150, () => setEmblemOn(true));
    at(4150, () => onComplete());

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="boot" style={{ opacity: fade ? 0 : 1 }}>
        <div id="log">
          {LOG.map((l, i) => (
            <div
              key={i}
              className={"line" + (l.alert ? " alert" : "")}
              style={{ opacity: i < lines ? 1 : 0 }}
            >
              <span className="label">{l.label}</span>
              <span className="stat">{l.stat ?? `${pct}%`}</span>
            </div>
          ))}
        </div>
        <svg
          id="wire"
          ref={wireRef}
          viewBox="0 0 300 180"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: wireOn ? 1 : 0 }}
        >
          <path d="M55 22 L55 128 L100 150 L200 150 L245 128 L245 22" />
          <rect x="110" y="50" width="80" height="32" />
          <line x1="30" y1="90" x2="90" y2="90" />
          <line x1="210" y1="90" x2="270" y2="90" />
          <path d="M128 98 L172 98 L188 114" />
        </svg>
        <div id="bios" style={{ opacity: biosOn ? 1 : 0 }}>
          <div>
            04________ TJOS SYSTEM BIOS V.IV
            <br />
            LOCAL GLOBAL TIME 1600 HRS
          </div>
          <div className="r">
            04________ LOS ANGELES_DATAPATH
            <br />
            .ESTABLISHED
          </div>
        </div>
      </div>

      <svg
        id="emblem"
        viewBox="0 0 128 128"
        style={
          emblemOn
            ? {
                opacity: 1,
                filter: "blur(0px)",
                transform: "translate(-50%,-50%) scale(1) rotate(0deg)",
              }
            : undefined
        }
      >
        <circle className="ring" cx="64" cy="64" r="58" />
        <circle className="ring" cx="64" cy="64" r="46" />
        <rect className="mark" x="40" y="52" width="48" height="7" />
        <rect className="mark" x="40" y="69" width="34" height="7" />
        <rect className="mark" x="78" y="69" width="10" height="7" />
      </svg>
    </>
  );
}
