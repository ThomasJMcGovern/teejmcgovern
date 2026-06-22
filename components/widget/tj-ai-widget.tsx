"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { MessageResponse } from "@/components/ai-elements/message";

const MONO = "var(--font-share-tech-mono), monospace";
const SANS = "var(--font-rajdhani), sans-serif";

const INTRO =
  "Hey — I'm TJ.AI, a digital twin of TJ. Ask me about my work, how I think, or whether we'd be a good fit. I answer the way he would.";
const SUGGESTIONS = [
  "What do you actually build?",
  "Why should I hire you?",
  "What do you do for fun?",
  "Show me your best work.",
];

function textOf(m: UIMessage) {
  return m.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/* ---- animated bits ---- */
function PillOrb() {
  return (
    <span style={{ position: "relative", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ position: "absolute", inset: 0, border: "1px solid rgba(62,240,138,.5)", borderTopColor: "#6effa6", borderRadius: "50%", animation: "tj-spin 6s linear infinite" }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#6effa6", boxShadow: "0 0 12px #3ef08a", animation: "tj-pulse 1.8s ease-in-out infinite" }} />
    </span>
  );
}
function Wave() {
  return (
    <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 18, marginLeft: 4 }}>
      {[0, -0.25, -0.5, -0.75].map((d, i) => (
        <span key={i} style={{ width: 2, height: "100%", background: "#3ef08a", transformOrigin: "bottom", animation: `tj-bars 1s ease-in-out ${d}s infinite` }} />
      ))}
    </span>
  );
}
function AvatarOrb() {
  return (
    <span style={{ position: "relative", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
      <span style={{ position: "absolute", inset: 0, border: "1px solid rgba(62,240,138,.5)", borderTopColor: "#6effa6", borderRadius: "50%", animation: "tj-spin 5s linear infinite" }} />
      <span style={{ position: "absolute", top: 7, left: 7, right: 7, bottom: 7, border: "1px dashed rgba(62,240,138,.4)", borderRadius: "50%", animation: "tj-spinrev 8s linear infinite" }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#6effa6", boxShadow: "0 0 12px #3ef08a", animation: "tj-pulse 2s ease-in-out infinite" }} />
    </span>
  );
}
function TypingBars() {
  return (
    <span style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 12 }}>
      {[0, -0.3, -0.6].map((d, i) => (
        <span key={i} style={{ width: 3, height: "100%", background: "#3ef08a", transformOrigin: "bottom", animation: `tj-bars .9s ease-in-out ${d}s infinite` }} />
      ))}
    </span>
  );
}

const tick = (pos: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  width: 14,
  height: 14,
  zIndex: 5,
  ...pos,
});

export function TjAiWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const streamRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const submit = (text: string) => {
    const v = text.trim();
    if (!v || busy) return;
    sendMessage({ text: v });
    setInput("");
  };

  return (
    <div
      className="tj-ai-widget"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, fontFamily: SANS, color: "#c9ffe0" }}
    >
      {/* COLLAPSED PILL */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open TJ.AI chat"
          style={{
            position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto",
            display: "flex", alignItems: "center", gap: 14, height: 54, padding: "0 22px 0 14px",
            border: "1px solid rgba(62,240,138,.6)", background: "linear-gradient(180deg,rgba(11,26,18,.96),rgba(6,14,10,.96))",
            color: "#dfffec", cursor: "pointer", fontFamily: SANS,
            clipPath: "polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)",
            boxShadow: "0 0 24px rgba(62,240,138,.32),0 10px 30px rgba(0,0,0,.5)",
          }}
        >
          <PillOrb />
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
            <span style={{ fontWeight: 700, letterSpacing: ".16em", fontSize: 15 }}>TJ.AI</span>
            <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".2em", color: "#4fbf83", marginTop: 3 }}>ASK MY DIGITAL TWIN</span>
          </span>
          <Wave />
        </button>
      )}

      {/* EXPANDED PANEL */}
      {open && (
        <div
          style={{
            position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", pointerEvents: "auto",
            width: "min(384px,92vw)", height: "min(560px,72vh)", display: "flex", flexDirection: "column", overflow: "hidden",
            background: "linear-gradient(180deg,rgba(8,18,13,.97),rgba(5,11,8,.98))", border: "1px solid rgba(62,240,138,.55)",
            boxShadow: "0 0 30px rgba(62,240,138,.28),0 24px 60px rgba(0,0,0,.6)",
            clipPath: "polygon(16px 0,100% 0,100% 100%,0 100%,0 16px)",
            animation: "tj-open .28s ease",
          }}
        >
          {/* corner ticks */}
          <span style={tick({ top: -1, left: -1, borderTop: "1px solid #6effa6", borderLeft: "1px solid #6effa6" })} />
          <span style={tick({ top: -1, right: -1, borderTop: "1px solid #6effa6", borderRight: "1px solid #6effa6" })} />
          <span style={tick({ bottom: -1, left: -1, borderBottom: "1px solid #6effa6", borderLeft: "1px solid #6effa6" })} />
          <span style={tick({ bottom: -1, right: -1, borderBottom: "1px solid #6effa6", borderRight: "1px solid #6effa6" })} />
          {/* panel scanlines */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4, background: "repeating-linear-gradient(180deg,rgba(0,0,0,0) 0 3px,rgba(0,0,0,.12) 3px 4px)" }} />

          {/* HEADER */}
          <div style={{ position: "relative", zIndex: 6, display: "flex", alignItems: "center", gap: 12, padding: "14px 14px 12px", borderBottom: "1px solid rgba(62,240,138,.25)", background: "linear-gradient(180deg,rgba(13,30,20,.7),rgba(7,16,11,.2))" }}>
            <AvatarOrb />
            <div style={{ flex: 1, minWidth: 0, lineHeight: 1.1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 700, letterSpacing: ".16em", fontSize: 16, color: "#dfffec" }}>TJ.AI</span>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".18em", color: "#4fbf83", border: "1px solid rgba(62,240,138,.3)", padding: "1px 5px" }}>TWIN</span>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".18em", color: "#3a8a5e", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6effa6", boxShadow: "0 0 8px #3ef08a", animation: "tj-blink 1.8s steps(1) infinite" }} />
                PERSONALITY CORE // ONLINE
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ flex: "none", width: 30, height: 30, border: "1px solid rgba(62,240,138,.35)", background: "transparent", color: "#9fffc6", cursor: "pointer", fontFamily: MONO, fontSize: 13, lineHeight: 1 }}>✕</button>
          </div>

          {/* MESSAGE STREAM */}
          <div ref={streamRef} style={{ position: "relative", zIndex: 6, flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* intro */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "100%" }}>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".2em", color: "#3a8a5e", marginBottom: 5 }}>TJ.AI</div>
              <div style={aiBubble}>{INTRO}</div>
            </div>

            {messages.map((m) => {
              const ai = m.role !== "user";
              const text = textOf(m);
              if (!text) return null;
              return (
                <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: ai ? "flex-start" : "flex-end", maxWidth: "100%" }}>
                  <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".2em", color: "#3a8a5e", marginBottom: 5 }}>{ai ? "TJ.AI" : "YOU"}</div>
                  <div style={ai ? aiBubble : userBubble}>
                    {ai ? <MessageResponse className="tjw-md">{text}</MessageResponse> : text}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", border: "1px solid rgba(62,240,138,.25)", background: "rgba(13,30,20,.6)" }}>
                <TypingBars />
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".18em", color: "#4fbf83" }}>SYNTHESIZING</span>
              </div>
            )}

            {status === "error" && (
              <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "10px 13px", fontFamily: MONO, fontSize: 11, lineHeight: 1.5, color: "#ffb0b0", background: "rgba(60,16,16,.5)", border: "1px solid rgba(255,90,90,.4)" }}>
                ⚠ Signal lost — my brain (the API) isn&apos;t responding. Try again in a moment.
              </div>
            )}
          </div>

          {/* SUGGESTIONS (only before first turn) */}
          {messages.length === 0 && !busy && (
            <div style={{ position: "relative", zIndex: 6, padding: "0 14px 12px" }}>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: ".22em", color: "#3a8a5e", marginBottom: 9 }}>TRY ASKING</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SUGGESTIONS.map((q) => (
                  <button key={q} onClick={() => submit(q)} style={{ fontFamily: MONO, fontSize: 10, letterSpacing: ".04em", color: "#bdffd6", background: "rgba(13,30,20,.7)", border: "1px solid rgba(62,240,138,.32)", padding: "7px 11px", cursor: "pointer", clipPath: "polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)" }}>{q}</button>
                ))}
              </div>
            </div>
          )}

          {/* INPUT ROW */}
          <div style={{ position: "relative", zIndex: 6, display: "flex", alignItems: "center", gap: 9, padding: "11px 12px", borderTop: "1px solid rgba(62,240,138,.25)", background: "rgba(7,16,11,.6)" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(input); } }}
              placeholder="Ask me anything…"
              style={{ flex: 1, minWidth: 0, height: 40, background: "rgba(4,9,7,.7)", border: "1px solid rgba(62,240,138,.3)", color: "#dfffec", fontFamily: MONO, fontSize: 12, letterSpacing: ".03em", padding: "0 12px", outline: "none" }}
            />
            <button title="Voice — coming soon" disabled aria-disabled style={{ flex: "none", width: 40, height: 40, border: "1px solid rgba(62,240,138,.2)", background: "rgba(13,30,20,.4)", color: "rgba(159,255,198,.4)", cursor: "not-allowed", fontSize: 15, lineHeight: 1 }}>🎙</button>
            <button onClick={() => submit(input)} disabled={busy} style={{ flex: "none", height: 40, padding: "0 16px", border: "1px solid #3ef08a", background: "linear-gradient(180deg,rgba(62,240,138,.22),rgba(62,240,138,.08))", color: "#dfffec", cursor: busy ? "default" : "pointer", opacity: busy ? 0.5 : 1, fontFamily: MONO, fontSize: 11, letterSpacing: ".16em", boxShadow: "0 0 14px rgba(62,240,138,.3)" }}>SEND ▸</button>
          </div>

          <div style={{ position: "relative", zIndex: 6, textAlign: "center", fontFamily: MONO, fontSize: 7.5, letterSpacing: ".2em", color: "#2f6647", padding: "6px 0 8px", background: "rgba(4,9,7,.5)" }}>AI TWIN OF TJ // POWERED BY GPT</div>
        </div>
      )}
    </div>
  );
}

const aiBubble: React.CSSProperties = {
  maxWidth: "88%", padding: "11px 13px", fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.5,
  color: "#dcffe9", background: "rgba(13,30,20,.7)", border: "1px solid rgba(62,240,138,.28)", borderLeft: "2px solid #3ef08a",
};
const userBubble: React.CSSProperties = {
  maxWidth: "88%", padding: "10px 13px", fontFamily: SANS, fontWeight: 500, fontSize: 14, lineHeight: 1.5,
  color: "#bfead0", background: "rgba(62,240,138,.1)", border: "1px solid rgba(62,240,138,.22)",
};
