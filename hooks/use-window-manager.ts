"use client";

import { useSyncExternalStore } from "react";
import {
  createWindowManager,
  type WindowManagerState,
} from "@/lib/window-manager";

/** App-wide singleton — one desktop, one set of windows. */
export const windowManager = createWindowManager();

const EMPTY: WindowManagerState = { windows: [], focusedId: null, nextZ: 1 };

/**
 * Subscribe a component to the window manager. Returns the current state plus
 * the (stable) action methods.
 */
export function useWindowManager() {
  const state = useSyncExternalStore(
    windowManager.subscribe,
    windowManager.getState,
    () => EMPTY,
  );
  return {
    state,
    open: windowManager.open,
    close: windowManager.close,
    focus: windowManager.focus,
    minimize: windowManager.minimize,
    toggle: windowManager.toggle,
  };
}
