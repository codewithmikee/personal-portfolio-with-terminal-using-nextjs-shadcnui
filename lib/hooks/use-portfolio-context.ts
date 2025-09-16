/**
 * Portfolio context hook using Zustand for state management
 * Handles portfolio data loading, updating, and persistence
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect } from "react";
import type { PortfolioData } from "@/data/schemas/portfolio";
import {
  loadPortfolioData,
  loadPortfolioDataFromStatic,
} from "@/lib/data-loader";

interface PortfolioState {
  data: PortfolioData | null;
  isLoading: boolean;
  error: string | null;
  updatePersonal: (personal: Partial<PortfolioData["personal"]>) => void;
  addProject: (project: PortfolioData["projects"]["projects"][0]) => void;
  updateProject: (
    id: string,
    updates: Partial<PortfolioData["projects"]["projects"][0]>
  ) => void;
  removeProject: (id: string) => void;
  addExperience: (experience: PortfolioData["experience"][0]) => void;
  updateExperience: (
    id: string,
    updates: Partial<PortfolioData["experience"][0]>
  ) => void;
  removeExperience: (id: string) => void;
  updateSkills: (skills: PortfolioData["skills"]) => void;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  loadData: () => Promise<void>;
}

export const usePortfolioContext = create<PortfolioState>()(
  persist(
    (set, get) => ({
      data: null,
      isLoading: false,
      error: null,

      loadData: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await loadPortfolioData();
          set({ data, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load data",
            isLoading: false,
          });
        }
      },

      updatePersonal: (personal) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              personal: { ...state.data.personal, ...personal },
            },
          };
        }),

      addProject: (project) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              projects: {
                ...state.data.projects,
                projects: [...state.data.projects.projects, project],
              },
            },
          };
        }),

      updateProject: (id, updates) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              projects: {
                ...state.data.projects,
                projects: state.data.projects.projects.map((project) =>
                  project.id === id ? { ...project, ...updates } : project
                ),
              },
            },
          };
        }),

      removeProject: (id) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              projects: {
                ...state.data.projects,
                projects: state.data.projects.projects.filter(
                  (project) => project.id !== id
                ),
              },
            },
          };
        }),

      addExperience: (experience) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              experience: [...state.data.experience, experience],
            },
          };
        }),

      updateExperience: (id, updates) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              experience: state.data.experience.map((exp) =>
                exp.id === id ? { ...exp, ...updates } : exp
              ),
            },
          };
        }),

      removeExperience: (id) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              experience: state.data.experience.filter((exp) => exp.id !== id),
            },
          };
        }),

      updateSkills: (skills) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              skills,
            },
          };
        }),

      updateData: (newData) => set({ data: newData }),

      resetToDefault: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await loadPortfolioData();
          set({ data, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to reset data",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "portfolio-data",
      // Only persist data, not loading states
      partialize: (state) => ({ data: state.data }),
    }
  )
);
