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
import type { EnhancedPortfolio } from "@/data/schemas/portfolio";
import {
  loadEnhancedPortfolioData,
  loadEnhancedPortfolioDataFromStatic,
} from "@/lib/data-loader";

interface PortfolioState {
  data: EnhancedPortfolio | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (profile: Partial<EnhancedPortfolio["profile"]>) => void;
  addProject: (project: EnhancedPortfolio["projects"][0]) => void;
  updateProject: (
    index: number,
    updates: Partial<EnhancedPortfolio["projects"][0]>
  ) => void;
  removeProject: (index: number) => void;
  addExperience: (experience: EnhancedPortfolio["experience"][0]) => void;
  updateExperience: (
    index: number,
    updates: Partial<EnhancedPortfolio["experience"][0]>
  ) => void;
  removeExperience: (index: number) => void;
  updateTechStacks: (techStacks: EnhancedPortfolio["techStacks"]) => void;
  updateSkills: (skills: EnhancedPortfolio["skills"]) => void;
  updateData: (newData: EnhancedPortfolio) => void;
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
          const data = await loadEnhancedPortfolioData();
          set({ data, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load data",
            isLoading: false,
          });
        }
      },

      updateProfile: (profile) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              profile: { ...state.data.profile, ...profile },
            },
          };
        }),

      addProject: (project) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              projects: [...state.data.projects, project],
            },
          };
        }),

      updateProject: (index, updates) =>
        set((state) => {
          if (!state.data) return state;
          const newProjects = [...state.data.projects];
          newProjects[index] = { ...newProjects[index], ...updates };
          return {
            data: {
              ...state.data,
              projects: newProjects,
            },
          };
        }),

      removeProject: (index) =>
        set((state) => {
          if (!state.data) return state;
          const newProjects = state.data.projects.filter((_, i) => i !== index);
          return {
            data: {
              ...state.data,
              projects: newProjects,
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

      updateExperience: (index, updates) =>
        set((state) => {
          if (!state.data) return state;
          const newExperience = [...state.data.experience];
          newExperience[index] = { ...newExperience[index], ...updates };
          return {
            data: {
              ...state.data,
              experience: newExperience,
            },
          };
        }),

      removeExperience: (index) =>
        set((state) => {
          if (!state.data) return state;
          const newExperience = state.data.experience.filter(
            (_, i) => i !== index
          );
          return {
            data: {
              ...state.data,
              experience: newExperience,
            },
          };
        }),

      updateTechStacks: (techStacks) =>
        set((state) => {
          if (!state.data) return state;
          return {
            data: {
              ...state.data,
              techStacks,
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

      resetToDefault: () => set({ data: null }),
    }),
    {
      name: "portfolio-storage",
      partialize: (state) => ({ data: state.data }),
    }
  )
);

// Hook to use portfolio context with auto-loading
export function usePortfolioData() {
  const { data, isLoading, error, loadData } = usePortfolioContext();

  useEffect(() => {
    if (!data && !isLoading) {
      loadData();
    }
  }, [data, isLoading, loadData]);

  return { data, isLoading, error };
}
