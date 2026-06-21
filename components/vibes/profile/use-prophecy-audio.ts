"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Ambient WebAudio drone + occasional blips for the Prophecy Shell. Must be
 * started from a user gesture (the gate's Enter). Tears down on unmount so audio
 * stops when the user leaves the page.
 */
export function useProphecyAudio() {
  const node = useRef<{ ctx: AudioContext; master: GainNode } | null>(null);
  const blipTimer = useRef<number | null>(null);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);

  const start = useCallback(() => {
    if (node.current) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    try {
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 480;
      lp.connect(master);
      [55, 55.5, 82.4].forEach((f, i) => {
        const o = ctx.createOscillator();
        o.type = i === 2 ? "triangle" : "sawtooth";
        o.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = i === 2 ? 0.05 : 0.12;
        o.connect(g);
        g.connect(lp);
        o.start();
      });
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lg = ctx.createGain();
      lg.gain.value = 0.05;
      lfo.connect(lg);
      lg.connect(master.gain);
      lfo.start();
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 2.2);

      const blip = () => {
        if (!mutedRef.current) {
          const o = ctx.createOscillator();
          o.type = "square";
          o.frequency.value = 880 + Math.random() * 440;
          const g = ctx.createGain();
          g.gain.value = 0;
          o.connect(g);
          g.connect(master);
          const t = ctx.currentTime;
          g.gain.linearRampToValueAtTime(0.04, t + 0.01);
          g.gain.linearRampToValueAtTime(0, t + 0.09);
          o.start(t);
          o.stop(t + 0.1);
        }
        blipTimer.current = window.setTimeout(blip, 1800 + Math.random() * 4200);
      };
      blip();
      node.current = { ctx, master };
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      const a = node.current;
      if (a)
        a.master.gain.linearRampToValueAtTime(
          next ? 0 : 0.18,
          a.ctx.currentTime + 0.4,
        );
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (blipTimer.current) clearTimeout(blipTimer.current);
      const a = node.current;
      if (a) {
        try {
          a.ctx.close();
        } catch {}
        node.current = null;
      }
    };
  }, []);

  return { start, toggleMute, muted };
}
