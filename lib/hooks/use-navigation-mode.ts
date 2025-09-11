"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface NavigationState {
  mode: "ui" | "terminal"
  setMode: (mode: "ui" | "terminal") => void
  toggleMode: () => void
}

export const useNavigationMode = create<NavigationState>()(
  persist(
    (set, get) => ({
      mode: "ui",
      setMode: (mode) => set({ mode }),
      toggleMode: () => set({ mode: get().mode === "ui" ? "terminal" : "ui" }),
    }),
    {
      name: "navigation-mode",
    },
  ),
)
