import { describe, it, expect } from "vitest";
import { PROJECTS, getProject } from "./projects";

describe("project registry", () => {
  it("has the expected projects with unique ids", () => {
    expect(PROJECTS.map((p) => p.id).sort()).toEqual([
      "ask-matthew",
      "gist-geo",
      "graphics",
      "profile",
    ]);
    expect(new Set(PROJECTS.map((p) => p.id)).size).toBe(PROJECTS.length);
  });

  it("each project route matches /<id>", () => {
    for (const p of PROJECTS) expect(p.route).toBe(`/${p.id}`);
  });

  it("case-study projects have a non-empty problem and hero", () => {
    for (const p of PROJECTS.filter((x) => x.caseStudy)) {
      expect(p.caseStudy!.problem.length).toBeGreaterThan(0);
      expect(p.caseStudy!.hero.length).toBeGreaterThan(0);
    }
  });

  it("getProject returns a project by id and undefined otherwise", () => {
    expect(getProject("gist-geo")?.label).toBeTypeOf("string");
    expect(getProject("nope")).toBeUndefined();
  });

  it("uses only known open modes and vibes", () => {
    for (const p of PROJECTS) {
      expect(["window", "takeover"]).toContain(p.openMode);
      expect(["os-chrome", "girly-pop", "creator", "profile"]).toContain(p.vibe);
    }
  });
});
