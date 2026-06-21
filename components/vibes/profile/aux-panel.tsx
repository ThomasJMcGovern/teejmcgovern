export function AuxPanel({
  collapsed,
  onExpand,
}: {
  collapsed: boolean;
  onExpand: () => void;
}) {
  return (
    <div className={"panel aux lit" + (collapsed ? " collapsed" : "")}>
      <div className="head">
        Auxiliary Panel&#8482;
        <span className="sys">SYS.AUX.07</span>
        <button type="button" className="expand" onClick={onExpand}>
          EXPAND &#9650;
        </button>
        <span className="dots">- - -</span>
      </div>
      <div className="cards">
        <div className="card">
          <div className="ct">&gt;&gt; Supplementals</div>
          <div className="cb">Equipment store — apparel, prints &amp; publications.</div>
          <div className="cv">&gt; View</div>
        </div>
        <div className="card">
          <div className="ct">&gt;&gt; Demo Reel</div>
          <div className="cb">Motion &amp; case-study reel for the Prophecy build.</div>
          <div className="cv">&gt; View</div>
        </div>
        <div className="card">
          <div className="ct">&gt;&gt; Featured</div>
          <div className="cb">Selected press &amp; recognition for recent work.</div>
          <div className="cv">&gt; View</div>
        </div>
      </div>
    </div>
  );
}
