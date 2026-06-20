# TJ_OS Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an early-2000s desktop-OS personal portfolio (TJ_OS) with a windowing shell + 3 hero projects, on the gist-geo stack.

**Architecture:** Single Next.js 16 App Router app. The OS shell (`/`) is a client experience: boot → desktop icons → draggable windows / full-screen "vibe" takeovers → taskbar. A pure-logic `WindowManager` store drives window state. A typed project registry powers both the desktop shell and a mobile springboard. Each project is also a standalone route for deep-linking/SEO.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Tailwind CSS v4, shadcn/ui (radix base), Bun, `@dnd-kit/core`, `framer-motion`, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-06-20-tj-os-portfolio-design.md`

---

## File Structure

```
teejmcgovern/
├── app/
│   ├── layout.tsx              # root: fonts (Geist), metadata, providers
│   ├── globals.css             # Tailwind v4 + retro theme tokens
│   ├── page.tsx                # OS shell entry (desktop or mobile springboard)
│   ├── not-found.tsx           # styled "File Not Found" OS dialog
│   └── p/
│       ├── gist-geo/page.tsx   # standalone Gist GEO case study
│       ├── graphics/page.tsx   # standalone Graphics gallery
│       └── ask-matthew/page.tsx# standalone Ask Matthew page
├── components/
│   ├── os/
│   │   ├── boot-sequence.tsx
│   │   ├── desktop.tsx
│   │   ├── desktop-icon.tsx
│   │   ├── window.tsx
│   │   ├── taskbar.tsx
│   │   └── os-shell.tsx        # composes boot+desktop+windows+taskbar
│   ├── mobile/
│   │   └── springboard.tsx     # Y2K phone home screen
│   ├── vibes/
│   │   ├── gist-geo-vibe.tsx   # "os-chrome" clean case study
│   │   ├── graphics-vibe.tsx   # "girly-pop" Y2K gallery
│   │   └── ask-matthew-vibe.tsx# "creator" scripted chat
│   └── ui/                     # shadcn components (generated)
├── lib/
│   ├── utils.ts                # cn()
│   ├── window-manager.ts       # pure window state logic (store)
│   ├── projects.ts             # typed project registry
│   └── projects.types.ts       # Project/CaseStudy types
├── hooks/
│   └── use-is-mobile.ts        # viewport detection
├── public/assets/              # optimized graphics
└── e2e/
    └── shell.spec.ts           # Playwright happy-path
```

---

## Task 0: Scaffold Next 16 + Tailwind v4 on Bun (into existing repo)

The repo already exists (git + `docs/` + `.gitignore`). `create-next-app` refuses to write into a dir with conflicting files, so scaffold into a temp dir and move contents in.

**Files:** creates `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/`, etc.

- [ ] **Step 1: Scaffold into temp dir**

```bash
cd /Users/tjmcgovern
bun create next-app@latest teejmcgovern-scaffold \
  --typescript --tailwind --eslint --app --no-src-dir \
  --turbopack --use-bun --import-alias "@/*"
```
Expected: a fully scaffolded Next app in `teejmcgovern-scaffold/`. (If a flag errors due to a CLI change, re-run interactively and match: TS yes, Tailwind yes, ESLint yes, App Router yes, no `src/`, Turbopack yes, import alias `@/*`.)

- [ ] **Step 2: Move scaffold into the repo (preserve git/docs/.gitignore)**

```bash
cd /Users/tjmcgovern/teejmcgovern-scaffold
rm -f .gitignore README.md            # keep the repo's existing .gitignore
cp -R . /Users/tjmcgovern/teejmcgovern/
cd /Users/tjmcgovern && rm -rf teejmcgovern-scaffold
```

- [ ] **Step 3: Install + verify dev server boots**

```bash
cd /Users/tjmcgovern/teejmcgovern
bun install
bun run dev   # confirm it serves on localhost, then stop
```
Expected: Next 16 dev server starts with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Scaffold Next 16 + Tailwind v4 app on Bun"
```

---

## Task 1: shadcn init, base components, retro theme + fonts

**Files:** Create `components.json`, `lib/utils.ts`, `components/ui/*`; Modify `app/globals.css`, `app/layout.tsx`.

- [ ] **Step 1: Init shadcn (non-interactive, radix base)**

```bash
cd /Users/tjmcgovern/teejmcgovern
bunx shadcn@latest init -d --base radix
```
Expected: `components.json` + `lib/utils.ts` (`cn()`) created, deps installed.

- [ ] **Step 2: Add the components v1 needs**

```bash
bunx shadcn@latest add button dialog card scroll-area separator badge tooltip skeleton sonner
```

- [ ] **Step 3: Fix the Tailwind v4 Geist-font gotcha**

In `app/globals.css` `@theme inline`, replace any `--font-sans: var(--font-sans)` / `var(--font-geist-sans)` with literal names:
```css
--font-sans: "Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif;
--font-mono: "Geist Mono", "Geist Mono Fallback", ui-monospace, monospace;
```
In `app/layout.tsx`, move the font variable classNames to `<html>` (not `<body>`).

- [ ] **Step 4: Add retro theme tokens (from the prototype) to globals.css**

Add a `@theme inline` block with the prototype's palette as named tokens so vibes can use them:
```css
--color-desk-1: #5b6ee1; --color-desk-2: #9b8cff; --color-desk-3: #3a3f8f;
--color-chrome: #d6d3c4; --color-chrome-hi: #ffffff; --color-chrome-lo: #7d7a6c;
--color-titlebar-1: #2a2f8f; --color-titlebar-2: #6f7bff;
--color-acid: #c6f000; --color-hotpink: #ff3fa4; --color-ink: #0e0e14;
```
Add the retro display fonts via `next/font/google` or a `<link>`: Michroma, Permanent Marker, Bungee (used by the boot logo + vibe headings).

- [ ] **Step 5: Verify build + commit**

```bash
bun run build   # Expected: compiles clean
git add -A && git commit -m "Add shadcn/ui + retro theme tokens and fonts"
```

---

## Task 2: Types + Project Registry (TDD)

**Files:** Create `lib/projects.types.ts`, `lib/projects.ts`, `lib/projects.test.ts`.

- [ ] **Step 1: Define types** (`lib/projects.types.ts`)

```ts
export type OpenMode = "window" | "takeover";
export type Vibe = "os-chrome" | "girly-pop" | "creator";

export interface ProcessShot { src: string; caption: string; }
export interface CaseStudy {
  problem: string;
  processShots: ProcessShot[];
  hero: string;
  outcome: string;
  link?: { label: string; href: string };
}
export interface Project {
  id: string;          // e.g. "gist-geo"
  label: string;       // desktop icon label
  icon: string;        // lucide name or asset path
  openMode: OpenMode;
  vibe: Vibe;
  route: string;       // "/p/gist-geo"
  caseStudy: CaseStudy;
}
```

- [ ] **Step 2: Write failing test** (`lib/projects.test.ts`)

```ts
import { describe, it, expect } from "vitest";
import { PROJECTS, getProject } from "./projects";

describe("project registry", () => {
  it("has exactly the 3 v1 projects with unique ids", () => {
    expect(PROJECTS.map(p => p.id).sort())
      .toEqual(["ask-matthew", "gist-geo", "graphics"]);
    expect(new Set(PROJECTS.map(p => p.id)).size).toBe(PROJECTS.length);
  });
  it("each project route matches /p/<id>", () => {
    for (const p of PROJECTS) expect(p.route).toBe(`/p/${p.id}`);
  });
  it("getProject returns a project by id and undefined otherwise", () => {
    expect(getProject("gist-geo")?.label).toBeTypeOf("string");
    expect(getProject("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test — expect FAIL** (`bunx vitest run lib/projects.test.ts`) — module not found.

- [ ] **Step 4: Implement** `lib/projects.ts` with the 3 entries (gist-geo: takeover/os-chrome; graphics: takeover/girly-pop; ask-matthew: window/creator), each with `route: "/p/<id>"` and a `getProject(id)` helper. Case-study copy seeded from `case-study-manifest.md` (placeholder hero asset paths under `/assets/...`).

- [ ] **Step 5: Run test — expect PASS.** Commit: `git commit -am "Add typed project registry"`.

---

## Task 3: WindowManager store (TDD — the testable core)

Pure state logic, no DOM. Use a small reducer-style module (consumable via a `useSyncExternalStore` hook or zustand-like closure).

**Files:** Create `lib/window-manager.ts`, `lib/window-manager.test.ts`.

- [ ] **Step 1: Failing test** (`lib/window-manager.test.ts`)

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { createWindowManager } from "./window-manager";

let wm: ReturnType<typeof createWindowManager>;
beforeEach(() => { wm = createWindowManager(); });

describe("WindowManager", () => {
  it("opens a window and focuses it", () => {
    wm.open("gist-geo");
    const s = wm.getState();
    expect(s.windows.map(w => w.id)).toEqual(["gist-geo"]);
    expect(s.focusedId).toBe("gist-geo");
    expect(s.windows[0].minimized).toBe(false);
  });
  it("opening an already-open window re-focuses, no duplicate", () => {
    wm.open("gist-geo"); wm.open("graphics"); wm.open("gist-geo");
    const s = wm.getState();
    expect(s.windows.length).toBe(2);
    expect(s.focusedId).toBe("gist-geo");
  });
  it("focus raises zIndex above all others", () => {
    wm.open("gist-geo"); wm.open("graphics"); wm.focus("gist-geo");
    const s = wm.getState();
    const z = Object.fromEntries(s.windows.map(w => [w.id, w.zIndex]));
    expect(z["gist-geo"]).toBeGreaterThan(z["graphics"]);
  });
  it("minimize hides without removing; reopen restores + focuses", () => {
    wm.open("gist-geo"); wm.minimize("gist-geo");
    expect(wm.getState().windows[0].minimized).toBe(true);
    wm.open("gist-geo");
    expect(wm.getState().windows[0].minimized).toBe(false);
    expect(wm.getState().focusedId).toBe("gist-geo");
  });
  it("close removes the window; focus falls back to top-most remaining", () => {
    wm.open("gist-geo"); wm.open("graphics"); wm.close("graphics");
    const s = wm.getState();
    expect(s.windows.map(w => w.id)).toEqual(["gist-geo"]);
    expect(s.focusedId).toBe("gist-geo");
  });
  it("notifies subscribers on change", () => {
    let n = 0; wm.subscribe(() => n++); wm.open("gist-geo");
    expect(n).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run — expect FAIL** (`bunx vitest run lib/window-manager.test.ts`).

- [ ] **Step 3: Implement** `createWindowManager()` returning `{ getState, subscribe, open, close, focus, minimize }`. State: `{ windows: {id, zIndex, minimized}[], focusedId, nextZ }`. `open` adds-or-restores+focus; `focus` bumps zIndex; `close` removes + refocuses top-most; `subscribe` is a simple listener set. No React inside.

- [ ] **Step 4: Run — expect PASS.** Commit: `git commit -am "Add WindowManager store with tests"`.

- [ ] **Step 5: React binding** — add `hooks/use-window-manager.ts` wrapping a singleton `createWindowManager()` via `useSyncExternalStore`. (No test; thin glue.) Commit.

---

## Task 4: OS shell UI components

Build presentational components driven by the store + registry. Match the prototype's chrome (beveled borders, blue titlebar gradient, Tahoma). Dragging via `@dnd-kit`, transitions via `framer-motion`.

**Files:** Create `components/os/{boot-sequence,desktop,desktop-icon,window,taskbar}.tsx`. Install deps first.

- [ ] **Step 1:** `bun add @dnd-kit/core framer-motion`
- [ ] **Step 2:** `BootSequence` — CRT scanlines, logo (Michroma), animated loading bar; calls `onDone` after ~1.8s; respects `prefers-reduced-motion` (skip animation). Renders from `app/page.tsx` state.
- [ ] **Step 3:** `DesktopIcon` — icon glyph + label, selectable, double-click/Enter opens (`wm.open(id)`).
- [ ] **Step 4:** `Desktop` — wallpaper (prototype gradient tokens) + maps `PROJECTS` to `DesktopIcon`s.
- [ ] **Step 5:** `Window` — chrome + titlebar (drag handle via dnd-kit) + close/minimize buttons wired to store; `framer-motion` open/minimize transitions; `zIndex` + `minimized` from store; renders the matching vibe component as children.
- [ ] **Step 6:** `Taskbar` — Start button, one button per non-minimized/minimized window (click toggles focus/restore), live clock.
- [ ] **Step 7:** Manual check in browser (`bun run dev`): icons render, a window opens/drags/minimizes/closes, taskbar reflects state. Commit: `git commit -am "Add OS shell UI components"`.

---

## Task 5: Compose the shell on `/`

**Files:** Create `components/os/os-shell.tsx`; Modify `app/page.tsx`.

- [ ] **Step 1:** `OsShell` composes Boot → Desktop → open Windows (`window` mode) → Takeover layer (`takeover` mode renders the vibe full-screen with a "minimize/close" affordance back to desktop) → Taskbar.
- [ ] **Step 2:** `app/page.tsx` renders `OsShell` on desktop and `Springboard` on mobile (via `use-is-mobile`; SSR-safe default = desktop, swap after mount).
- [ ] **Step 3:** Browser check: boot plays once, clicking each icon opens the right thing (Gist GEO + Graphics take over; Ask Matthew opens windowed). Commit.

---

## Task 6: Standalone routes + vibe components

Each vibe is a component reused by both the in-OS render and the standalone `/p/<id>` route.

**Files:** Create `components/vibes/{gist-geo-vibe,graphics-vibe,ask-matthew-vibe}.tsx`, `app/p/{gist-geo,graphics,ask-matthew}/page.tsx`.

- [ ] **Step 1:** `GistGeoVibe` ("os-chrome") — clean, readable case study from registry data: header (name/role/stack/dates) → problem → process strip (2–4 shots) → hero → outcome → live link. Uses shadcn `Card`/`Badge`/`Separator`/`ScrollArea`.
- [ ] **Step 2:** `GraphicsVibe` ("girly-pop") — pink-gradient Y2K gallery of the posters (GIRLY POP, POP MUSIC, digital circus, ad) with sparkle accents + Bungee/Permanent Marker headings; click a poster → lightbox via shadcn `Dialog`.
- [ ] **Step 3:** `AskMatthewVibe` ("creator") — creator landing layout (shell for Task 7 chat).
- [ ] **Step 4:** Each `app/p/<id>/page.tsx` renders its vibe standalone with proper `metadata` (title/description/OG). `generateMetadata` pulls from the registry.
- [ ] **Step 5:** Browser check all three routes load standalone. Commit: `git commit -am "Add vibe components + standalone project routes"`.

---

## Task 7: Ask Matthew scripted chat (no API)

**Files:** Create `lib/ask-matthew-script.ts`, `components/vibes/ask-matthew-chat.tsx`, `lib/ask-matthew-script.test.ts`.

- [ ] **Step 1: Failing test** — `matchResponse(input)` returns a canned answer for known intents (e.g. "what do you do", "shop", "contact") and a sensible default otherwise.

```ts
import { describe, it, expect } from "vitest";
import { matchResponse } from "./ask-matthew-script";
describe("ask matthew script", () => {
  it("matches a known intent", () => {
    expect(matchResponse("what do you do?").length).toBeGreaterThan(0);
  });
  it("falls back for unknown input", () => {
    expect(matchResponse("asdfqwer")).toBeTypeOf("string");
  });
});
```

- [ ] **Step 2:** Run — FAIL. **Step 3:** Implement keyword→response map + default. **Step 4:** Run — PASS.
- [ ] **Step 5:** `AskMatthewChat` — message list + input; on send, echoes user msg then appends `matchResponse(...)` after a short typing delay; suggested-prompt chips. Wire into `AskMatthewVibe`.
- [ ] **Step 6:** Commit: `git commit -am "Add Ask Matthew scripted chat"`.

---

## Task 8: Mobile springboard

**Files:** Create `components/mobile/springboard.tsx`, `hooks/use-is-mobile.ts`.

- [ ] **Step 1:** `use-is-mobile` — `matchMedia("(max-width: 767px)")`, SSR-safe.
- [ ] **Step 2:** `Springboard` — Y2K phone home screen: app-icon grid from `PROJECTS`, tapping routes to `/p/<id>`. Status-bar flourish + wallpaper matching the desktop palette.
- [ ] **Step 3:** Browser check at mobile width (375px). Commit: `git commit -am "Add mobile springboard"`.

---

## Task 9: Error / loading states

**Files:** Create `app/not-found.tsx`, `app/loading.tsx`; add image fallback in vibes.

- [ ] **Step 1:** `not-found.tsx` — styled "File Not Found" OS dialog (chrome window + OK button → `/`).
- [ ] **Step 2:** `loading.tsx` — minimal boot-bar styled fallback.
- [ ] **Step 3:** Image fallback tile for missing assets in galleries.
- [ ] **Step 4:** Commit: `git commit -am "Add error and loading states"`.

---

## Task 10: Playwright happy-path e2e

**Files:** Create `playwright.config.ts`, `e2e/shell.spec.ts`; add deps + script.

- [ ] **Step 1:** `bun add -d @playwright/test && bunx playwright install chromium`
- [ ] **Step 2:** Config: `webServer` runs `bun run dev`, baseURL localhost.
- [ ] **Step 3:** Test: load `/` → (skip/await boot) → click Ask Matthew icon → assert window visible → click minimize → assert hidden → click its taskbar button → assert visible again.
- [ ] **Step 4:** Run `bunx playwright test` — expect PASS. Commit: `git commit -am "Add Playwright shell e2e"`.

---

## Task 11: Optimize + wire real graphics

**Files:** Add images to `public/assets/`; reference from registry.

- [ ] **Step 1:** Export/copy the JPGs from `~/Desktop/PhotoshopPortfolio` (ad, noemigp/GIRLY POP, Untitled-1/POP MUSIC, Untitled-3/digital circus) into `public/assets/graphics/`, web-optimized (resize ≤2000px, compress).
- [ ] **Step 2:** Point the Graphics registry entry + gallery at the real files; use `next/image`.
- [ ] **Step 3:** Browser check gallery shows real art. Commit: `git commit -am "Wire real graphics assets"`.

---

## Task 12: Build + deploy prep

- [ ] **Step 1:** `bun run build` — fix any type/lint errors; expect clean production build.
- [ ] **Step 2:** Add `README.md` (what it is, run/build/test commands).
- [ ] **Step 3:** Confirm git identity (`git log -1 --format='%an <%ae>'` → `TJ McGovern <tjmcgovern8@gmail.com>`).
- [ ] **Step 4:** Commit. Deploy to Vercel (subdomain) — verify with the `vercel:deployments-cicd` guidance at deploy time; resolve the publishing GitHub account (add `tjmcgovern8` to `gh` or use `ThomasJMcGovern`).

---

## Self-Review

- **Spec coverage:** stack (T0–1), shell components (T4), windowing approach dnd-kit+framer (T4), routing+3 vibes (T5–6), registry/content model (T2), mobile springboard (T8), error/empty/loading (T9), testing Vitest+Playwright (T2,T3,T7,T10), deploy+git identity (T12), Ask Matthew scripted (T7), real assets (T11). All spec sections mapped.
- **Placeholders:** scaffolding/visual tasks give exact commands + concrete component responsibilities + browser acceptance checks; testable logic (registry, WindowManager, chat script) has full test code. No "TBD/TODO".
- **Type consistency:** `Project`/`CaseStudy`/`OpenMode`/`Vibe` (T2) reused by registry, vibes, shell; `createWindowManager` API (`open/close/focus/minimize/getState/subscribe`) consistent across T3/T4.
