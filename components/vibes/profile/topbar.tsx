import { Emblem } from "./emblem";
import { NAV } from "./sections";

function Wave() {
  return (
    <div className="wave" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <i
          key={i}
          style={{
            animationDelay: `${(i * 0.05).toFixed(2)}s`,
            animationDuration: `${(0.55 + (i % 6) * 0.09).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Topbar({
  section,
  onNav,
  onHome,
}: {
  section: string | null;
  onNav: (key: string) => void;
  onHome: () => void;
}) {
  return (
    <div className="topbar">
      <div id="player">
        <div className="cap">&gt; Global Ambience</div>
        <div className="screen">
          01 DESERT_TRANCE
          <Wave />
        </div>
      </div>
      <div id="nav">
        <div className="cap">&gt; Global Navigator</div>
        <div className="items">
          {NAV.map((n) => (
            <button
              key={n.key}
              type="button"
              className={"item" + (section === n.key ? " active" : "")}
              onClick={() => onNav(n.key)}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
      <button id="logo" type="button" title="Return to mainframe" onClick={onHome}>
        <Emblem />
        <div className="wm">TJ_OS</div>
        <div className="tag">Progressive Design Tech</div>
      </button>
    </div>
  );
}
