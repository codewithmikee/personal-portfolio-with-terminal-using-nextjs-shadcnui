"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PortfolioData } from "@/lib/portfolio-data"
import { portfolioData } from "@/lib/portfolio-data"

interface PortfolioState {
  data: PortfolioData
  updatePersonal: (personal: Partial<PortfolioData["personal"]>) => void
  addProject: (project: PortfolioData["projects"][0]) => void
  updateProject: (id: string, updates: Partial<PortfolioData["projects"][0]>) => void
  removeProject: (id: string) => void
  addExperience: (experience: PortfolioData["experience"][0]) => void
  updateExperience: (id: string, updates: Partial<PortfolioData["experience"][0]>) => void
  removeExperience: (id: string) => void
  updateSkills: (skills: PortfolioData["skills"]) => void
  resetToDefault: () => void
}

export const usePortfolioContext = create<PortfolioState>()(
  persist(
    (set, get) => ({
      data: portfolioData,

      updatePersonal: (personal) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: { ...state.data.personal, ...personal },
          },
        })),

      addProject: (project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, project],
          },
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((project) => (project.id === id ? { ...project, ...updates } : project)),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((project) => project.id !== id),
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [...state.data.experience, experience],
          },
        })),

      updateExperience: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((exp) => exp.id !== id),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          data: {
            ...state.data,
            skills,
          },
        })),

      resetToDefault: () => set({ data: portfolioData }),
    }),
    {
      name: "portfolio-data",
    },
  ),
)
