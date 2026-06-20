import { describe, it, expect } from "vitest";
import { matchResponse, SUGGESTED_PROMPTS } from "./ask-matthew-script";

describe("ask matthew script", () => {
  it("matches a known intent (what do you do)", () => {
    const r = matchResponse("what do you do?");
    expect(r.length).toBeGreaterThan(0);
  });

  it("matches the shopping intent", () => {
    expect(matchResponse("where can I shop?").toLowerCase()).toContain("shop");
  });

  it("is case-insensitive", () => {
    expect(matchResponse("CONTACT")).toBe(matchResponse("contact"));
  });

  it("falls back to a sensible default for unknown input", () => {
    const r = matchResponse("asdfqwer zzz");
    expect(r).toBeTypeOf("string");
    expect(r.length).toBeGreaterThan(0);
  });

  it("ships suggested prompts that all resolve to non-default answers", () => {
    expect(SUGGESTED_PROMPTS.length).toBeGreaterThanOrEqual(3);
    const fallback = matchResponse("asdfqwer zzz");
    for (const p of SUGGESTED_PROMPTS) {
      expect(matchResponse(p)).not.toBe(fallback);
    }
  });
});
