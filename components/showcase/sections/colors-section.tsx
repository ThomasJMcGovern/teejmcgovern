import { Section } from "../section";
import { ColorSwatch } from "../color-swatch";

/** shadcn semantic tokens — rendered via var() so they adapt to the toggle. */
const SEMANTIC: { label: string; cssVar: string }[] = [
  { label: "background", cssVar: "--background" },
  { label: "foreground", cssVar: "--foreground" },
  { label: "card", cssVar: "--card" },
  { label: "card-foreground", cssVar: "--card-foreground" },
  { label: "popover", cssVar: "--popover" },
  { label: "popover-foreground", cssVar: "--popover-foreground" },
  { label: "primary", cssVar: "--primary" },
  { label: "primary-foreground", cssVar: "--primary-foreground" },
  { label: "secondary", cssVar: "--secondary" },
  { label: "secondary-foreground", cssVar: "--secondary-foreground" },
  { label: "muted", cssVar: "--muted" },
  { label: "muted-foreground", cssVar: "--muted-foreground" },
  { label: "accent", cssVar: "--accent" },
  { label: "accent-foreground", cssVar: "--accent-foreground" },
  { label: "destructive", cssVar: "--destructive" },
  { label: "border", cssVar: "--border" },
  { label: "input", cssVar: "--input" },
  { label: "ring", cssVar: "--ring" },
  { label: "chart-1", cssVar: "--chart-1" },
  { label: "chart-2", cssVar: "--chart-2" },
  { label: "chart-3", cssVar: "--chart-3" },
  { label: "chart-4", cssVar: "--chart-4" },
  { label: "chart-5", cssVar: "--chart-5" },
];

/** TJ_OS retro palette — fixed brand colors, rendered via Tailwind utilities. */
const RETRO: { label: string; className: string; value: string }[] = [
  { label: "desk-1", className: "bg-desk-1", value: "#5b6ee1" },
  { label: "desk-2", className: "bg-desk-2", value: "#9b8cff" },
  { label: "desk-3", className: "bg-desk-3", value: "#3a3f8f" },
  { label: "chrome", className: "bg-chrome", value: "#d6d3c4" },
  { label: "chrome-hi", className: "bg-chrome-hi", value: "#ffffff" },
  { label: "chrome-lo", className: "bg-chrome-lo", value: "#7d7a6c" },
  { label: "chrome-mid", className: "bg-chrome-mid", value: "#bcb9aa" },
  { label: "titlebar-1", className: "bg-titlebar-1", value: "#2a2f8f" },
  { label: "titlebar-2", className: "bg-titlebar-2", value: "#6f7bff" },
  { label: "acid", className: "bg-acid", value: "#c6f000" },
  { label: "hotpink", className: "bg-hotpink", value: "#ff3fa4" },
  { label: "ink", className: "bg-ink", value: "#0e0e14" },
];

export function ColorsSection() {
  return (
    <Section
      id="colors"
      title="Colors"
      description="Semantic shadcn tokens adapt to the light/dark toggle; the TJ_OS retro palette is fixed brand color."
    >
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        Semantic tokens
      </h3>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SEMANTIC.map((c) => (
          <ColorSwatch
            key={c.cssVar}
            label={c.label}
            value={`var(${c.cssVar})`}
            cssVar={c.cssVar}
          />
        ))}
      </div>

      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        TJ_OS retro palette
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {RETRO.map((c) => (
          <ColorSwatch
            key={c.label}
            label={c.label}
            value={c.value}
            className={c.className}
          />
        ))}
      </div>
    </Section>
  );
}
