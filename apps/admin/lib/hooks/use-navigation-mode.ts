"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavigationState {
  mode: "web" | "cv" | "terminal";
  setMode: (mode: "web" | "cv" | "terminal") => void;
  toggleMode: () => void;
}

export const useNavigationMode = create<NavigationState>()(
  persist(
    (set, get) => ({
      mode: "web",
      setMode: (mode) => set({ mode }),
      toggleMode: () => {
        const currentMode = get().mode;
        const modes = ["web", "cv", "terminal"] as const;
        const currentIndex = modes.indexOf(currentMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        set({ mode: modes[nextIndex] });
      },
    }),
    {
      name: "navigation-mode",
    }
  )
);
