"use client";

import { toast } from "sonner";
import { Section } from "../section";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FeedbackSection() {
  return (
    <Section
      id="feedback"
      title="Feedback"
      description="Alerts, progress, skeletons, separators, scroll areas, and toasts."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              A default alert for neutral, informational messages.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              A destructive alert for errors and failures.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <div className="font-mono text-[11px] text-muted-foreground">
              progress
            </div>
            <Progress value={62} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="font-mono text-[11px] text-muted-foreground">
              skeleton
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-[11px] text-muted-foreground">
              separator (horizontal / vertical)
            </div>
            <div>
              <p className="text-sm">Above</p>
              <Separator className="my-2" />
              <div className="flex h-6 items-center gap-3 text-sm">
                <span>Left</span>
                <Separator orientation="vertical" />
                <span>Right</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-[11px] text-muted-foreground">
              scroll-area
            </div>
            <ScrollArea className="h-24 w-full rounded-md border border-border p-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="block">
                    Scrollable line {i + 1}
                  </span>
                ))}
              </p>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="font-mono text-[11px] text-muted-foreground">
          toasts (sonner)
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("Event created")}>
            Default toast
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Something went wrong")}
          >
            Error
          </Button>
        </div>
      </div>
    </Section>
  );
}
