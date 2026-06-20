import { describe, it, expect, beforeEach } from "vitest";
import { createWindowManager } from "./window-manager";

let wm: ReturnType<typeof createWindowManager>;
beforeEach(() => {
  wm = createWindowManager();
});

describe("WindowManager", () => {
  it("starts empty", () => {
    const s = wm.getState();
    expect(s.windows).toEqual([]);
    expect(s.focusedId).toBeNull();
  });

  it("opens a window and focuses it", () => {
    wm.open("gist-geo");
    const s = wm.getState();
    expect(s.windows.map((w) => w.id)).toEqual(["gist-geo"]);
    expect(s.focusedId).toBe("gist-geo");
    expect(s.windows[0].minimized).toBe(false);
  });

  it("opening an already-open window re-focuses without duplicating", () => {
    wm.open("gist-geo");
    wm.open("graphics");
    wm.open("gist-geo");
    const s = wm.getState();
    expect(s.windows.length).toBe(2);
    expect(s.focusedId).toBe("gist-geo");
  });

  it("focus raises zIndex above all others", () => {
    wm.open("gist-geo");
    wm.open("graphics");
    wm.focus("gist-geo");
    const s = wm.getState();
    const z = Object.fromEntries(s.windows.map((w) => [w.id, w.zIndex]));
    expect(z["gist-geo"]).toBeGreaterThan(z["graphics"]);
    expect(s.focusedId).toBe("gist-geo");
  });

  it("minimize hides without removing; reopen restores and focuses", () => {
    wm.open("gist-geo");
    wm.minimize("gist-geo");
    expect(wm.getState().windows[0].minimized).toBe(true);
    expect(wm.getState().focusedId).toBeNull();
    wm.open("gist-geo");
    expect(wm.getState().windows[0].minimized).toBe(false);
    expect(wm.getState().focusedId).toBe("gist-geo");
  });

  it("toggle minimizes a focused window and restores a minimized one", () => {
    wm.open("gist-geo");
    wm.toggle("gist-geo"); // focused -> minimized
    expect(wm.getState().windows[0].minimized).toBe(true);
    wm.toggle("gist-geo"); // minimized -> restored + focused
    expect(wm.getState().windows[0].minimized).toBe(false);
    expect(wm.getState().focusedId).toBe("gist-geo");
  });

  it("close removes the window; focus falls back to the top-most remaining", () => {
    wm.open("gist-geo");
    wm.open("graphics");
    wm.close("graphics");
    const s = wm.getState();
    expect(s.windows.map((w) => w.id)).toEqual(["gist-geo"]);
    expect(s.focusedId).toBe("gist-geo");
  });

  it("closing the last window leaves focus null", () => {
    wm.open("gist-geo");
    wm.close("gist-geo");
    expect(wm.getState().windows).toEqual([]);
    expect(wm.getState().focusedId).toBeNull();
  });

  it("notifies subscribers on change and stops after unsubscribe", () => {
    let n = 0;
    const unsub = wm.subscribe(() => n++);
    wm.open("gist-geo");
    expect(n).toBeGreaterThan(0);
    const after = n;
    unsub();
    wm.open("graphics");
    expect(n).toBe(after);
  });
});
