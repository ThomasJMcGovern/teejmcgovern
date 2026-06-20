/**
 * Types for the TJ_OS project registry — the single source of truth that drives
 * both the desktop shell and the mobile springboard.
 */

/** How a project opens from the desktop. */
export type OpenMode = "window" | "takeover";

/** Visual treatment a project renders in. Each maps to one of TJ's own looks. */
export type Vibe = "os-chrome" | "girly-pop" | "creator";

export interface ProcessShot {
  /** Public path under /public, e.g. "/assets/graphics/girly-pop.jpg". */
  src: string;
  caption: string;
}

export interface CaseStudy {
  /** One-line hook — what problem this solved. */
  problem: string;
  /** 2–4 shots showing the evolution, earliest → latest. */
  processShots: ProcessShot[];
  /** The money frame. */
  hero: string;
  /** 1–3 sentences on what shipped. */
  outcome: string;
  /** Optional live link (site or repo). */
  link?: { label: string; href: string };
}

export interface Project {
  /** Stable id, also the route slug. e.g. "gist-geo". */
  id: string;
  /** Desktop icon label. */
  label: string;
  /** lucide-react icon name, resolved by the UI. */
  icon: string;
  /** Role/tag line shown in the case-study header. */
  role: string;
  /** Tech/medium tags. */
  tags: string[];
  /** Date range, e.g. "2025–2026". */
  dateRange: string;
  openMode: OpenMode;
  vibe: Vibe;
  /** Canonical standalone route, always "/p/<id>". */
  route: string;
  caseStudy: CaseStudy;
}
