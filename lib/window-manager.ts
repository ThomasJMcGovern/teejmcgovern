/**
 * WindowManager — pure, framework-free state for the TJ_OS windowing system.
 * No React, no DOM: just an observable store so it's fully unit-testable and
 * can be driven from a `useSyncExternalStore` hook in the UI layer.
 */

export interface WindowState {
  id: string;
  zIndex: number;
  minimized: boolean;
}

export interface WindowManagerState {
  windows: WindowState[];
  focusedId: string | null;
  nextZ: number;
}

export interface WindowManager {
  getState: () => WindowManagerState;
  subscribe: (listener: () => void) => () => void;
  /** Open a window, or restore + focus it if already open. */
  open: (id: string) => void;
  /** Remove a window; focus falls back to the top-most remaining. */
  close: (id: string) => void;
  /** Raise a window to the top and focus it. */
  focus: (id: string) => void;
  /** Hide a window without removing it. */
  minimize: (id: string) => void;
  /** Minimize if visible+focused, restore+focus if minimized. */
  toggle: (id: string) => void;
}

export function createWindowManager(): WindowManager {
  let state: WindowManagerState = { windows: [], focusedId: null, nextZ: 1 };
  const listeners = new Set<() => void>();

  const emit = () => listeners.forEach((l) => l());
  const setState = (next: WindowManagerState) => {
    state = next;
    emit();
  };

  /** Highest-zIndex non-minimized window id, or null if none visible. */
  const topMostId = (windows: WindowState[]): string | null => {
    const visible = windows.filter((w) => !w.minimized);
    if (visible.length === 0) return null;
    return visible.reduce((a, b) => (b.zIndex > a.zIndex ? b : a)).id;
  };

  const focus = (id: string) => {
    if (!state.windows.some((w) => w.id === id)) return;
    const z = state.nextZ;
    setState({
      ...state,
      nextZ: z + 1,
      focusedId: id,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: z, minimized: false } : w,
      ),
    });
  };

  const open = (id: string) => {
    if (state.windows.some((w) => w.id === id)) {
      focus(id);
      return;
    }
    const z = state.nextZ;
    setState({
      ...state,
      nextZ: z + 1,
      focusedId: id,
      windows: [...state.windows, { id, zIndex: z, minimized: false }],
    });
  };

  const minimize = (id: string) => {
    if (!state.windows.some((w) => w.id === id)) return;
    const windows = state.windows.map((w) =>
      w.id === id ? { ...w, minimized: true } : w,
    );
    const focusedId =
      state.focusedId === id ? topMostId(windows) : state.focusedId;
    setState({ ...state, windows, focusedId });
  };

  const toggle = (id: string) => {
    const w = state.windows.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) focus(id);
    else minimize(id);
  };

  const close = (id: string) => {
    if (!state.windows.some((w) => w.id === id)) return;
    const windows = state.windows.filter((w) => w.id !== id);
    const focusedId =
      state.focusedId === id ? topMostId(windows) : state.focusedId;
    setState({ ...state, windows, focusedId });
  };

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    open,
    close,
    focus,
    minimize,
    toggle,
  };
}
