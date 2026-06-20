import { Section } from "../section";

const RADII: { cls: string; label: string; formula: string }[] = [
  { cls: "rounded-sm", label: "rounded-sm", formula: "--radius × 0.6" },
  { cls: "rounded-md", label: "rounded-md", formula: "--radius × 0.8" },
  { cls: "rounded-lg", label: "rounded-lg", formula: "--radius (0.625rem)" },
  { cls: "rounded-xl", label: "rounded-xl", formula: "--radius × 1.4" },
  { cls: "rounded-2xl", label: "rounded-2xl", formula: "--radius × 1.8" },
  { cls: "rounded-3xl", label: "rounded-3xl", formula: "--radius × 2.2" },
  { cls: "rounded-4xl", label: "rounded-4xl", formula: "--radius × 2.6" },
];

export function RadiusSection() {
  return (
    <Section
      id="radius"
      title="Radius"
      description="The border-radius scale derived from --radius."
    >
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7">
        {RADII.map((r) => (
          <div key={r.cls} className="space-y-2">
            <div
              className={`h-16 w-full border-2 border-primary/40 bg-primary/10 ${r.cls}`}
            />
            <div className="text-xs font-medium">{r.label}</div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {r.formula}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
