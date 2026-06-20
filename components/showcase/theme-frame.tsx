"use client";

import { useState, type ReactNode } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Page-local light/dark toggle. Adds the `dark` class to a wrapper so all shadcn
 * tokens beneath it recompute (globals.css uses `@custom-variant dark
 * (&:is(.dark *))`) — no global next-themes wiring, so the rest of the retro
 * site is unaffected.
 */
export function ThemeFrame({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className={cn(theme === "dark" && "dark")}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-2 backdrop-blur">
          <span className="mr-auto text-xs text-muted-foreground">
            Preview theme
          </span>
          <div className="flex gap-1 rounded-lg border border-border p-0.5">
            <Button
              variant={theme === "light" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTheme("light")}
            >
              <SunIcon /> Light
            </Button>
            <Button
              variant={theme === "dark" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTheme("dark")}
            >
              <MoonIcon /> Dark
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
