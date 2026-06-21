/** Global Navigator sections for the Profile (Prophecy Shell) experience. */

export interface Pane {
  /** Heading; may contain a single <b> highlight. */
  h: string;
  /** Body paragraphs; may contain &amp;/<b>. */
  p: string[];
  /** Caption shown in the pane's hero strip. */
  hero: string;
}

export interface Section {
  db: [string, string];
  nav: string[];
  panes: Record<string, Pane>;
}

export const NAV: { key: string; label: string }[] = [
  { key: "company", label: "Company" },
  { key: "services", label: "Services" },
  { key: "portfolio", label: "Portfolio" },
  { key: "accolades", label: "Accolades" },
  { key: "experimental", label: "Experimental" },
  { key: "equipment", label: "Equipment" },
  { key: "contact", label: "Contact" },
];

export const SECTIONS: Record<string, Section> = {
  company: {
    db: ["STUDIO", "DATABANK"],
    nav: ["Vision", "Approach", "Background", "Stack"],
    panes: {
      Vision: {
        h: "Build <b>for the future.</b>",
        p: [
          "TJ_OS is a designer-engineer's operating system — a portfolio built like a machine you boot into rather than a page you scroll.",
          "The interface is the work. Chrome, sound, and motion are treated as content, not decoration. Every window is a piece.",
          "Explore the Prophecy and challenge it with your next project.",
        ],
        hero: "PROPHECY // SYSTEM ONLINE",
      },
      Approach: {
        h: "Vibecode, <b>then refine.</b>",
        p: [
          "Rapid, iterative building paired with structured agent harnesses — fast to a working surface, disciplined on the way to ship.",
          "Design-to-code straight from Figma into tokenized components. Pixel-faithful, system-driven, no handoff loss.",
        ],
        hero: "WORKFLOW // AGENT-ASSISTED",
      },
      Background: {
        h: "Graphics <b>&amp; engineering.</b>",
        p: [
          "Graphic design roots in poster art, street/graffiti aesthetics, and music culture; frontend + backend web development on top.",
          "Day job: product &amp; UI on a GEO platform. Off-hours: volunteer merch &amp; graphics chair for a young people's club — websites, campaigns, original characters.",
        ],
        hero: "LOS ANGELES // EST.",
      },
      Stack: {
        h: "The <b>machine.</b>",
        p: [
          "Bun monorepo · Next.js · React 19 · Tailwind v4 · shadcn/ui · TypeScript · Firebase/Firestore · Clerk · Vercel.",
          "Agentic workflow: Claude Code with custom plugins, git worktrees, and an always-on Mac Mini agent runner.",
        ],
        hero: "BUN // NEXT // R19 // TS",
      },
    },
  },
  services: {
    db: ["SERVICE", "MATRIX"],
    nav: ["Design", "Build", "Systems"],
    panes: {
      Design: {
        h: "Design <b>that ships.</b>",
        p: ["Brand systems, UI, and motion — built to be implemented, not just admired."],
        hero: "MODULE // ONLINE",
      },
      Build: {
        h: "Front to <b>back.</b>",
        p: ["React/Next product work with real infra behind it."],
        hero: "MODULE // ONLINE",
      },
      Systems: {
        h: "Token <b>systems.</b>",
        p: ["Component libraries and design tokens that scale across a team."],
        hero: "MODULE // ONLINE",
      },
    },
  },
  portfolio: {
    db: ["WORK", "ARCHIVE"],
    nav: ["Gist GEO", "TJ_OS", "Club"],
    panes: {
      "Gist GEO": {
        h: "Gist <b>GEO.</b>",
        p: ["14-month GEO platform build — rename, logo iterations, full product surface."],
        hero: "CASE STUDY // GEO",
      },
      "TJ_OS": {
        h: "TJ_<b>OS.</b>",
        p: ["This — an early-2000s desktop OS portfolio with boot, windows, and vibe takeovers."],
        hero: "CASE STUDY // OS",
      },
      Club: {
        h: "Club <b>campaigns.</b>",
        p: ["Event visuals, website, and original merch characters for a young people's club."],
        hero: "CASE STUDY // MERCH",
      },
    },
  },
  accolades: {
    db: ["SIGNAL", "LOG"],
    nav: ["Recognition"],
    panes: {
      Recognition: {
        h: "In <b>progress.</b>",
        p: ["Recognition feed — populate as the work lands."],
        hero: "MODULE // STANDBY",
      },
    },
  },
  experimental: {
    db: ["LAB", "SANDBOX"],
    nav: ["Prototypes"],
    panes: {
      Prototypes: {
        h: "The <b>lab.</b>",
        p: ["Generative agents, multi-agent sims, and interface experiments."],
        hero: "MODULE // ACTIVE",
      },
    },
  },
  equipment: {
    db: ["STORE", "SUPPLY"],
    nav: ["Merch"],
    panes: {
      Merch: {
        h: "Equipment <b>store.</b>",
        p: ["Apparel, prints, and publications — coming online."],
        hero: "MODULE // STANDBY",
      },
    },
  },
  contact: {
    db: ["COMMS", "UPLINK"],
    nav: ["Channel"],
    panes: {
      Channel: {
        h: "Open a <b>channel.</b>",
        p: ["Drop a line to start a project. Uplink details go here."],
        hero: "DATAPATH // OPEN",
      },
    },
  },
};
