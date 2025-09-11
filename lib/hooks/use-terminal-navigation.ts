"use client"

import { create } from "zustand"

interface TerminalNavigationState {
  currentPath: string[]
  currentDirectory: string
  setPath: (path: string[]) => void
  navigateTo: (directory: string) => void
  goBack: () => void
  goHome: () => void
}

export const useTerminalNavigation = create<TerminalNavigationState>()((set, get) => ({
  currentPath: [],
  currentDirectory: "/home/portfolio",
  setPath: (path) =>
    set({
      currentPath: path,
      currentDirectory: path.length === 0 ? "/home/portfolio" : `/home/portfolio/${path.join("/")}`,
    }),
  navigateTo: (directory) => {
    const currentPath = get().currentPath
    const newPath = [...currentPath, directory]
    set({
      currentPath: newPath,
      currentDirectory: `/home/portfolio/${newPath.join("/")}`,
    })
  },
  goBack: () => {
    const currentPath = get().currentPath
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1)
      set({
        currentPath: newPath,
        currentDirectory: newPath.length === 0 ? "/home/portfolio" : `/home/portfolio/${newPath.join("/")}`,
      })
    }
  },
  goHome: () =>
    set({
      currentPath: [],
      currentDirectory: "/home/portfolio",
    }),
}))
