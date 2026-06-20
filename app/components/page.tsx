import type { Metadata } from "next";
import { ThemeFrame } from "@/components/showcase/theme-frame";
import { ColorsSection } from "@/components/showcase/sections/colors-section";
import { TypographySection } from "@/components/showcase/sections/typography-section";
import { RadiusSection } from "@/components/showcase/sections/radius-section";
import { ButtonsSection } from "@/components/showcase/sections/buttons-section";
import { FormControlsSection } from "@/components/showcase/sections/form-controls-section";
import { OverlaysSection } from "@/components/showcase/sections/overlays-section";
import { DataDisplaySection } from "@/components/showcase/sections/data-display-section";
import { FeedbackSection } from "@/components/showcase/sections/feedback-section";

export const metadata: Metadata = {
  title: "Design System — TJ_OS",
  description: "Component and design-token reference for TJ McGovern's site.",
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  return (
    <ThemeFrame>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <header className="mb-12">
          <h1 className="font-display text-3xl tracking-tight">
            TJ_OS Design System
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Every shadcn component and design token in one place. Toggle
            light/dark above to preview both themes. This page isn&apos;t linked
            from the site.
          </p>
          <div className="mt-4 h-1 w-28 rounded-full bg-gradient-to-r from-acid to-hotpink" />
        </header>

        <div className="space-y-14 pb-24">
          <ColorsSection />
          <TypographySection />
          <RadiusSection />
          <ButtonsSection />
          <FormControlsSection />
          <OverlaysSection />
          <DataDisplaySection />
          <FeedbackSection />
        </div>
      </div>
    </ThemeFrame>
  );
}
