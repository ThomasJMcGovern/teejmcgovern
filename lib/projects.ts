import type { Project, Vibe } from "./projects.types";

/**
 * The TJ_OS project registry. Each entry powers a desktop icon, a mobile
 * springboard tile, and its own /<id> app page (opened via a launch transition).
 *
 * Asset paths point at /public/assets/*.
 */
export const PROJECTS: Project[] = [
  {
    id: "gist-geo",
    label: "Gist_GEO",
    icon: "globe",
    role: "Founding designer + full-stack",
    tags: ["Next.js", "Python", "Design System", "Brand", "GEO"],
    dateRange: "2025–2026",
    openMode: "takeover",
    vibe: "os-chrome",
    route: "/gist-geo",
    caseStudy: {
      problem:
        "Brands can't see how they show up inside AI answer engines — ChatGPT, Perplexity, Claude, Gemini. Gist GEO measures that visibility and helps brands improve it.",
      processShots: [
        {
          src: "/assets/gist-geo/01-kickoff.png",
          caption: "Product kickoff — renaming Gist Answers → Gist GEO (Oct 2025)",
        },
        {
          src: "/assets/gist-geo/02-mocks.png",
          caption: "First UI mocks (Feb 2026)",
        },
        {
          src: "/assets/gist-geo/03-design-system.png",
          caption: "Formal design system — Haffer type, cream/navy/mint/coral, tokens",
        },
        {
          src: "/assets/gist-geo/04-launch.png",
          caption: "Launch build (Jun 2026)",
        },
      ],
      hero: "/assets/gist-geo/hero.png",
      outcome:
        "A genuine end-to-end product: brand evolution, a documented design system, and a shipped Next.js + Python app — plus an engineering deep-dive replacing a costly Firecrawl+LLM extraction pipeline with Scrapling for a cheaper, faster onboarding crawl.",
    },
  },
  {
    id: "graphics",
    label: "Graphics",
    icon: "image",
    role: "Graphic artist",
    tags: ["Photoshop", "Y2K", "Poster", "Type", "Photo edit"],
    dateRange: "2026",
    openMode: "takeover",
    vibe: "girly-pop",
    route: "/graphics",
    caseStudy: {
      problem:
        "A burst of Y2K-flavored Photoshop work — posters and portrait edits playing with nostalgia, bubble type, sparkles, and hot-pink gradients.",
      processShots: [
        {
          src: "/assets/graphics/pop-music.jpg",
          title: "POP MUSIC",
          caption: "Chrome shades + flip-phone over a pink gradient oval.",
          year: "2026",
        },
        {
          src: "/assets/graphics/digital-circus.jpg",
          title: "DIGITAL CIRCUS",
          caption: "Win98 / MS Paint pixel composition.",
          year: "2026",
        },
        {
          src: "/assets/graphics/ad.jpg",
          title: "GIST GEO AD",
          caption: "Subway callout meme — a marketing concept.",
          year: "2026",
        },
      ],
      hero: "/assets/graphics/girly-pop.jpg",
      outcome:
        "Original compositions that double as the visual DNA of this whole site: retro computing, bold rounded display type, and unapologetic pink.",
    },
  },
  {
    id: "ask-matthew",
    label: "Ask_Matthew",
    icon: "message-circle",
    role: "Concept + front-end",
    tags: ["Creator economy", "AI chat", "Vanilla JS", "Link-in-bio"],
    dateRange: "2025–2026",
    openMode: "window",
    vibe: "creator",
    route: "/ask-matthew",
    caseStudy: {
      problem:
        "Replace a static link-in-bio with an interactive, AI-powered creator page — fans can 'ask Matthew anything,' shop, and discover content in one place.",
      processShots: [
        {
          src: "/assets/ask-matthew/01-concept.png",
          caption: "Concept — fan discovery, shopping, learning paths",
        },
        {
          src: "/assets/ask-matthew/02-chat.png",
          caption: "The chat-first landing layout",
        },
      ],
      hero: "/assets/ask-matthew/hero.png",
      outcome:
        "A framework-free creator page with an AI chat front and center, contextual shopping, and learning paths — proof of the 'I build interactive interfaces' thesis. (This window runs a live scripted demo of that chat.)",
    },
  },
];

/** Look up a project by id. Returns undefined when not found. */
export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/**
 * One source of truth for each vibe's accent (icon tile gradient, launch
 * overlay, and page entrance all share it). `girly-pop` previews the Graphics
 * page's Blade Runner cyan→magenta.
 */
export const VIBE_ACCENT: Record<Vibe, { from: string; to: string }> = {
  "os-chrome": { from: "#6f7bff", to: "#2a2f8f" },
  "girly-pop": { from: "#19e3ff", to: "#ff2e88" },
  creator: { from: "#c6f000", to: "#6e8a00" },
};

export function vibeAccent(vibe: Vibe) {
  return VIBE_ACCENT[vibe];
}
