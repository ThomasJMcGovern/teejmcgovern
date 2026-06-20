import { PlusIcon } from "lucide-react";
import { Section } from "../section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const SIZES = ["xs", "sm", "default", "lg"] as const;

const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const;

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="font-mono text-[11px] text-muted-foreground">{label}</div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function ButtonsSection() {
  return (
    <Section
      id="buttons"
      title="Buttons & Badges"
      description="All button variants, sizes, and states; all badge variants."
    >
      <div className="space-y-6">
        <Row label="variants">
          {VARIANTS.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Row>

        <Row label="sizes">
          {SIZES.map((s) => (
            <Button key={s} size={s}>
              Button {s}
            </Button>
          ))}
        </Row>

        <Row label="with icon · icon-only · disabled · loading-as-disabled">
          <Button data-icon="inline-start">
            <PlusIcon /> New
          </Button>
          <Button size="icon" aria-label="Add">
            <PlusIcon />
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </Row>

        <Row label="badges">
          {BADGE_VARIANTS.map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </Row>
      </div>
    </Section>
  );
}
