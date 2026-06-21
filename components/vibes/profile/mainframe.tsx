"use client";

import { useEffect, useState } from "react";
import { Emblem } from "./emblem";
import { CodeColumn } from "./effects";
import { SECTIONS } from "./sections";

export function Mainframe({
  section,
  pane,
  onPane,
}: {
  section: string | null;
  pane: string | null;
  onPane: (p: string) => void;
}) {
  const [seg, setSeg] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setSeg((n) => (n + 1) % 7), 420);
    return () => clearInterval(i);
  }, []);

  const sec = section ? SECTIONS[section] : null;
  const active = sec && pane ? sec.panes[pane] : null;

  return (
    <div className={"panel mainframe lit" + (sec ? " loaded" : "")}>
      <div className="head">
        Mainframe&#8482;
        <span className="sys">SYS.INT.004</span>
        <span className="route">{section ? `// ${section.toUpperCase()}` : ""}</span>
        <span className="dots">- - -</span>
      </div>

      <div className="mf-idle">
        <div className="hud-grid" />
        <CodeColumn side="l" />
        <CodeColumn side="r" />
        <div id="node" className="pulse">
          <Emblem />
        </div>
        <div className="protocols">
          <span>Initializing protocols</span>
          <div className="segs">
            {Array.from({ length: 6 }).map((_, i) => (
              <i key={i} className={i <= seg ? "on" : undefined} />
            ))}
          </div>
          <span className="ver">TJOS-CORE v7.3.1</span>
        </div>
      </div>

      <div className="mf-view">
        <aside className="subrail">
          <div className="db">
            <div className="t">{sec ? sec.db[0] : "STUDIO"}</div>
            <div className="s">{sec ? sec.db[1] : "DATABANK"}</div>
          </div>
          <div className="snav">
            {sec?.nav.map((p) => (
              <button
                key={p}
                type="button"
                className={pane === p ? "on" : undefined}
                onClick={() => onPane(p)}
              >
                <span>{p}</span>
              </button>
            ))}
          </div>
        </aside>
        <div className="mf-content">
          {active && (
            <>
              <h2 dangerouslySetInnerHTML={{ __html: active.h }} />
              {active.p.map((t, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
              <div className="hero">
                <div className="cap">{active.hero}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
