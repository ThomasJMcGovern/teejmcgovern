# TJ_OS — Personal Portfolio Design Spec

- **Date:** 2026-06-20
- **Author:** TJ McGovern (with Claude)
- **Status:** Draft — awaiting review
- **Project root:** `/Users/tjmcgovern/teejmcgovern`

## Vision

A faithful early-2000s desktop operating system as the shell for TJ McGovern's
personal portfolio. The visitor "boots" into a Windows-2000-era desktop, clicks
file and folder icons, and each project opens — lightweight ones in draggable
windows, hero ones "taking over" the whole screen as a distinct visual "vibe" —
then minimizes back to the desktop.

The concept is authentic to TJ's own work: the graphic-design portfolio already
trades in Y2K nostalgia, retro computing (a literal Win98/MS-Paint "digital
circus" piece), bold rounded display type, pink + acid-green color pops, sparkles
and flip phones. The OS-desktop metaphor *is* the brand, not a costume over it.

It showcases three sides of TJ: **developer**, **graphic artist**, and **other
creative / interactive** work.

## Goals

- Recreate the `tj_os.html` prototype as a real, maintainable component-based app.
- Ship a live v1 quickly: full OS shell + 3 hero projects.
- Each project is deep-linkable and works standalone (shareable, SEO-friendly).
- Adding a 4th+ project later = one registry entry + one vibe component.
- Personal git identity (`tjmcgovern8@gmail.com`), not TJ's work identity.

## Non-Goals (YAGNI for v1)

- No monorepo / Bun workspaces — single Next app.
- No Firebase, Clerk, Stripe, Firecrawl, AI orchestration (gist-geo-specific).
- No live AI in v1 — the "Ask Matthew" chat is a scripted recreation (see Phase 2).
- No custom domain at launch — Vercel subdomain first.
- No full project catalog — only 3 projects ship in v1.

## Key Decisions

| Decision | Choice |
|---|---|
| v1 scope | OS shell + 3 hero projects |
| The 3 projects | Gist GEO, Graphics showcase, GPA "Ask Matthew" |
| Mobile | Y2K phone "springboard" fallback (shared content registry) |
| Windowing | Custom, built on `@dnd-kit` + `framer-motion` |
| Ask Matthew | Scripted/canned chat, no AI API in v1 |
| Deploy | Vercel subdomain (`*.vercel.app`) for now |
| Git identity | repo-local `user.email = tjmcgovern8@gmail.com` |

## Stack (matches gist-geo core)

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5.9**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **shadcn/ui** — Radix primitives + `class-variance-authority` + `clsx` +
  `tailwind-merge` + `tw-animate-css` + `lucide-react`. Installed via the current
  shadcn CLI (verified against live docs, not memorized commands).
- **Bun** as installer + runtime + compiler
- `@dnd-kit/core` + `framer-motion` (already in gist-geo) for the windowing system
- `next-themes`, `sonner` as needed
- **Vitest** (unit) + **Playwright** (one e2e flow)

Dropped from gist-geo: workspaces, Firebase, Clerk, Stripe, Firecrawl, AI SDK,
the orchestrator packages.

## Architecture

Single Next.js App Router project.

### Routes
- `/` — the OS shell (boot → desktop → windows). Client experience.
- `/p/gist-geo` — Gist GEO case study (also rendered as a takeover vibe).
- `/p/graphics` — Graphics gallery (GIRLY POP Y2K vibe).
- `/p/ask-matthew` — GPA creator page (scripted chat, windowed app).

Projects render both *inside the OS* (window/takeover) and as *standalone routes*,
so a window can deep-link and a shared link still works without the shell.

### OS shell components
Small, focused, independently testable units:

- `BootSequence` — CRT/scanline boot screen + loading bar.
- `Desktop` — wallpaper + icon grid.
- `WindowManager` — the brain: open/close/focus/z-order/minimize state. Pure
  logic, no DOM — unit-testable.
- `Window` — chrome, title bar, drag handle, close/minimize buttons.
- `Taskbar` — Start button, running-window buttons, live clock.
- `DesktopIcon` / `FolderView` — clickable desktop entries.

### Windowing approach
Custom implementation using `@dnd-kit` for dragging and `framer-motion` for
open/minimize/restore transitions. Rationale: both libraries are already in the
gist-geo stack (on-stack consistency), light, and fully style-controllable to
match the exact retro chrome. Rejected alternatives: a windowing library
(`react-rnd`/WinBox — heavier, hard to style to the prototype's look), and
porting the vanilla JS as one giant client component (works, unmaintainable).

## Content Model

A single typed **project registry** (`lib/projects.ts`). Each entry:

```
{
  id, label, icon,
  openMode: 'window' | 'takeover',
  vibe: 'os-chrome' | 'girly-pop' | 'creator',
  caseStudy: { problem, processShots[], hero, outcome, link }
}
```

The case-study shape mirrors `case-study-manifest.md` (problem → 2–4 process
shots → hero → outcome → link). The same registry feeds the desktop shell and the
mobile springboard. TJ's real graphics from `~/Desktop/PhotoshopPortfolio` are
optimized into `/public/assets` (following the existing `optimize:images`
workflow noted in global CLAUDE.md).

## The 3 Projects & Vibes

| File | Opens as | Vibe (sourced from TJ's own work) |
|---|---|---|
| **Gist GEO** | full-screen takeover | clean "OS-chrome" / product — readable case study; the serious dev/product story (14-month arc, design system, shipped Next.js + Python PoC) |
| **Graphics** | full-screen takeover | **GIRLY POP** pink-Y2K gallery — posters: GIRLY POP, POP MUSIC, digital circus, the Gist GEO meme ad |
| **Ask Matthew (GPA)** | windowed app | interactive creator page with a scripted chat ("Ask Matthew anything") |

## Mobile

- **Desktop:** the full OS shell (draggable windows, taskbar).
- **Phone:** a Y2K phone/iPod-style **springboard** — a home screen of app icons
  that open the same vibe pages. The vibe pages themselves are responsive.
- One shared content registry powers both shells (no duplicated content).

## Error / Empty / Loading States

- **404 / unknown project:** a styled "File Not Found" OS dialog box.
- **Boot:** a real (short) loading bar; no flash of unstyled desktop.
- **Missing/broken asset:** fallback file tile, never a broken-image icon.
- **Deep-link to a non-existent project:** desktop loads with an error dialog.

## Testing

- **Vitest:** `WindowManager` logic (open/focus/close/minimize/z-order) and the
  project registry shape.
- **Playwright:** one happy-path flow — boot → click icon → window opens →
  minimize → reopen from taskbar.
- Mirrors gist-geo's Vitest + Playwright setup.

## Deployment & Git

- Deploy to **Vercel**, **subdomain** (`*.vercel.app`) for v1; custom domain later.
- `git init` at project root; set **repo-local** identity:
  - `user.name = "TJ McGovern"`
  - `user.email = "tjmcgovern8@gmail.com"`
  so personal commits are not attributed to the machine's work identity
  (`tjprorata / tj@prorata.ai`).
- GitHub account for publishing TBD (add `tjmcgovern8` account to `gh`, or use
  the existing `ThomasJMcGovern` personal account) — resolved at publish time,
  does not block the build.

## Phase 2 (explicitly deferred)

- Real AI "Ask TJ" assistant (AI SDK + Anthropic/OpenAI, server route, keys,
  rate-limiting) — upgrade the scripted Ask Matthew chat.
- Remaining manifest projects: SFVYPAA poster, onboarding flow, dashboard
  settings, Photoshop pieces, digital-art studies.
- Custom domain.

## Open Items (need TJ, non-blocking)

- Case-study copy for each project (drafts can be derived from the manifest).
- Confirm which exact graphics go in the Graphics gallery and their labels
  (manifest flags several "needs a sentence from TJ").
- Final exported hero frames for Gist GEO (live in the Launch zips / June
  screenshots).
