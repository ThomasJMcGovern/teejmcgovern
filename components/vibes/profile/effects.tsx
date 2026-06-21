"use client";

import { useEffect, useState } from "react";

export function Twill() {
  return <div className="tex twill" aria-hidden />;
}
export function Scanlines() {
  return <div className="tex scan" aria-hidden />;
}
export function Vignette() {
  return <div className="tex vig" aria-hidden />;
}
export function CropMarks() {
  return (
    <>
      <div className="crop tl" />
      <div className="crop tr" />
      <div className="crop bl" />
      <div className="crop br" />
    </>
  );
}

const CHARS = "01<>/[]{}=+*ABCDEF0123456789";

/** Scrolling code-rain column. Generated client-side to avoid hydration drift. */
export function CodeColumn({ side }: { side: "l" | "r" }) {
  const [text, setText] = useState("");
  useEffect(() => {
    let s = "";
    for (let i = 0; i < 46; i++) {
      let row = "";
      for (let j = 0; j < 11; j++)
        row += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
      s += row + "\n";
    }
    const raf = requestAnimationFrame(() => setText(s + s));
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className={`codecol ${side}`} aria-hidden>
      <div className="codeinner">{text}</div>
    </div>
  );
}
