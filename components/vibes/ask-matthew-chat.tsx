"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { matchResponse, SUGGESTED_PROMPTS } from "@/lib/ask-matthew-script";
import { cn } from "@/lib/utils";

interface Msg {
  role: "user" | "matthew";
  text: string;
}

export function AskMatthewChat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "matthew",
      text: "Hey — I'm Matthew (a scripted demo of him). Ask me anything: my work, music, shop, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: "matthew", text: matchResponse(t) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 space-y-3 overflow-auto p-4">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "rounded-br-sm bg-[var(--color-hotpink)] text-white"
                  : "rounded-bl-sm bg-zinc-100 text-zinc-800",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2 text-sm text-zinc-400">
              Matthew is typing…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-zinc-200 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Matthew anything…"
            aria-label="Ask Matthew anything"
            className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-[var(--color-hotpink)]"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-hotpink)] text-white disabled:opacity-50"
            disabled={!input.trim() || typing}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
