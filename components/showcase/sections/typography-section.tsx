import { Section } from "../section";
import { SpecimenRow } from "../specimen-row";

const FONTS: { label: string; className: string }[] = [
  { label: "Geist · font-sans (body / UI)", className: "font-sans" },
  { label: "Geist Mono · font-mono (code / values)", className: "font-mono" },
  { label: "Michroma · .font-display (headings)", className: "font-display" },
  { label: "Bungee · .font-bungee (vibe display)", className: "font-bungee" },
  { label: "Permanent Marker · .font-marker (accent)", className: "font-marker" },
  { label: "Tahoma · .font-ui (OS chrome)", className: "font-ui" },
];

export function TypographySection() {
  return (
    <Section
      id="typography"
      title="Typography"
      description="The six type styles available across the site, with the class to apply each."
    >
      <div>
        {FONTS.map((f) => (
          <SpecimenRow key={f.className} label={f.label} className={f.className} />
        ))}
      </div>
    </Section>
  );
}
