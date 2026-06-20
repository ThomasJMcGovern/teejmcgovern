import { Section } from "../section";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DataDisplaySection() {
  return (
    <Section
      id="layout"
      title="Layout & data"
      description="Cards, tabs, accordion, tables, and avatars."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Cards */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>With every subcomponent.</CardDescription>
              <CardAction>
                <Badge variant="secondary">New</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Content area. Cards group related information into a surface.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Compact card</CardTitle>
              <CardDescription>size=&quot;sm&quot;</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tabs + Accordion */}
        <div className="space-y-6">
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">Tab one</TabsTrigger>
              <TabsTrigger value="two">Tab two</TabsTrigger>
            </TabsList>
            <TabsContent value="one" className="pt-3 text-sm text-muted-foreground">
              First tab panel.
            </TabsContent>
            <TabsContent value="two" className="pt-3 text-sm text-muted-foreground">
              Second tab panel.
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible>
            <AccordionItem value="a">
              <AccordionTrigger>What is this page?</AccordionTrigger>
              <AccordionContent>
                A living reference of the design system.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Can I add components?</AccordionTrigger>
              <AccordionContent>
                Yes — install via the shadcn CLI and add a block here.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <Table>
          <TableCaption>A simple data table.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Gist GEO</TableCell>
              <TableCell>Product</TableCell>
              <TableCell className="text-right">2026</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Graphics</TableCell>
              <TableCell>Art</TableCell>
              <TableCell className="text-right">2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Avatars */}
      <div className="mt-8 flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src="/assets/graphics/girly-pop.jpg" alt="" />
          <AvatarFallback>TJ</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>TJ</AvatarFallback>
        </Avatar>
        <Avatar className="size-6">
          <AvatarFallback className="text-[10px]">TJ</AvatarFallback>
        </Avatar>
      </div>
    </Section>
  );
}
