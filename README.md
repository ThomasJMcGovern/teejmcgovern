# TJ_OS — TJ McGovern's Portfolio

An early-2000s desktop operating system as a portfolio. You boot in, click file
and folder icons, and each project opens — lightweight ones in draggable windows,
hero ones taking over the screen as a distinct visual "vibe" — then minimizes back
to the desktop. On phones it falls back to a Y2K springboard home screen.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **shadcn/ui** (radix base)
- **Bun** (install / runtime / compiler) · Turbopack
- `@dnd-kit/core` + `framer-motion` for the windowing system
- **Vitest** (unit) · **Playwright** (e2e)

## Develop

```bash
bun install
bun run dev          # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |
| `bun run type-check` | `tsc --noEmit` |
| `bun run test` / `test:run` | Vitest (unit) |
| `bun run test:e2e` | Playwright (e2e) |

## Structure

```
app/                 # routes: / (desktop launcher), /<id> (app pages), /components (style guide), 404, loading
components/
  os/                # boot, desktop, taskbar, glyph, app-launch, app-frame
  vibes/             # gist-geo, graphics (blade-runner terminal), ask-matthew + router
  mobile/            # Y2K springboard
  showcase/          # design-system page sections + primitives
  ui/                # shadcn components
lib/
  projects.ts        # the project registry + vibe accents — single source of truth
hooks/               # use-is-mobile
e2e/                 # Playwright specs
docs/superpowers/    # design spec + implementation plan
public/assets/       # optimized graphics
```

## Adding a project

Add one entry to `lib/projects.ts` (id, label, icon, `vibe`, `route` = `/<id>`,
case study). It automatically appears on the desktop launcher and the mobile
springboard, and clicking it plays the launch transition (`components/os/app-launch.tsx`)
then opens its own `/<id>` page wrapped in `components/os/app-frame.tsx`. New visual
treatments are added to `components/vibes/` and wired in `vibe-router.tsx`.

## Design system

`/components` is a living style guide for the designer — every shadcn component
and design token (colors, typography, radius) in one place, with a page-local
light/dark toggle. It's intentionally unlinked from the desktop and `noindex`ed.
To extend it: install a component with the shadcn CLI, then add a block to the
matching file in `components/showcase/sections/`.

## Deploy

Deploys to **Vercel** (zero-config for Next.js). v1 ships to a `*.vercel.app`
subdomain; attach a custom domain in the Vercel dashboard later.

## Roadmap (Phase 2)

- Real AI "Ask TJ" assistant (AI SDK) replacing the scripted Ask Matthew chat
- More case studies: SFVYPAA poster, onboarding flow, dashboard settings,
  additional Photoshop pieces
- Custom domain
