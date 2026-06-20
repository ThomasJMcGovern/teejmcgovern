import { Section } from "../section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export function FormControlsSection() {
  return (
    <Section
      id="forms"
      title="Form controls"
      description="Inputs, selection, and range controls."
    >
      <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="demo-input">Input</Label>
          <Input id="demo-input" placeholder="you@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo-select">Select</Label>
          <Select>
            <SelectTrigger id="demo-select" className="w-full">
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
              <SelectItem value="c">Option C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="demo-textarea">Textarea</Label>
          <Textarea id="demo-textarea" placeholder="Say something…" />
        </div>

        <div className="space-y-3">
          <Label>Toggles</Label>
          <div className="flex items-center gap-2">
            <Checkbox id="demo-check" defaultChecked />
            <Label htmlFor="demo-check">Checkbox</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="demo-switch" defaultChecked />
            <Label htmlFor="demo-switch">Switch</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Radio group</Label>
          <RadioGroup defaultValue="a" className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="demo-r-a" />
              <Label htmlFor="demo-r-a">Option A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="demo-r-b" />
              <Label htmlFor="demo-r-b">Option B</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3 sm:col-span-2">
          <Label>Slider</Label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </div>
    </Section>
  );
}
