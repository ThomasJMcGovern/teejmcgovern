import { Emblem } from "./emblem";

export function Gate({
  hidden,
  onEnter,
}: {
  hidden: boolean;
  onEnter: () => void;
}) {
  return (
    <div id="gate" className={hidden ? "hidden" : undefined}>
      <Emblem className="em" />
      <div className="wm">TJ_OS // PROGRESSIVE DESIGN TECHNOLOGY</div>
      <button id="enter" onClick={onEnter}>
        Enter
      </button>
      <div className="hint">Sound on — click to initialize</div>
    </div>
  );
}
