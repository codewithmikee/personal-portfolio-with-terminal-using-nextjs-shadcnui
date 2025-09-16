import { create } from "zustand";
import type {
  EnhancedPortfolio,
  Profile,
  Experience,
  Project,
  Skill,
  Tool,
} from "@/types/portfolio";
import { ProgrammingRole, JobType } from "@/types/portfolio";
import { adaptDbPortfolio } from "@/lib/portfolio-adapter";
import { portfolioApiService } from "@/lib/services/portfolio-api.service";

interface PortfolioState {
  // Data
  portfolio: EnhancedPortfolio | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPortfolio: (portfolio: EnhancedPortfolio | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // CRUD Operations
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  updateExperience: (
    index: number,
    updates: Partial<Experience>
  ) => Promise<void>;
  addExperience: () => Promise<void>;
  removeExperience: (index: number) => Promise<void>;
  updateProject: (index: number, updates: Partial<Project>) => Promise<void>;
  addProject: () => Promise<void>;
  removeProject: (index: number) => Promise<void>;
  updateSkills: (skills: Skill[]) => Promise<void>;
  updateTools: (tools: Tool[]) => Promise<void>;

  // Data Management
  loadFromApi: () => Promise<void>;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
  resetToDefault: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>()((set, get) => ({
  // Initial state
  portfolio: null,
  isLoading: false,
  error: null,

  // Basic setters
  setPortfolio: (portfolio) => set({ portfolio }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // CRUD Operations
  updateProfile: async (updates) => {
    const { portfolio } = get();
    if (!portfolio) return;

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        profile: { ...portfolio.profile, ...updates },
      },
    });

    try {
      await portfolioApiService.updateProfile(updates);
    } catch (error) {
      console.error("Failed to persist profile update:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  updateExperience: async (index, updates) => {
    const { portfolio } = get();
    if (!portfolio) return;

    const updatedExperience = portfolio.experience.map((exp, i) =>
      i === index ? { ...exp, ...updates } : exp
    );

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        experience: updatedExperience,
      },
    });

    try {
      await portfolioApiService.updateExperience(index, updates);
    } catch (error) {
      console.error("Failed to persist experience update:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  addExperience: async () => {
    const { portfolio } = get();
    if (!portfolio) return;

    const newExperience: Experience = {
      company_name: "",
      company_description: "",
      start_date: "",
      end_date: null,
      role: ProgrammingRole.FullStack,
      job_type: JobType.FullTime,
      contacts: [],
    };

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        experience: [...portfolio.experience, newExperience],
      },
    });

    try {
      await portfolioApiService.addExperience(newExperience);
    } catch (error) {
      console.error("Failed to persist experience addition:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  removeExperience: async (index) => {
    const { portfolio } = get();
    if (!portfolio) return;

    const updatedExperience = portfolio.experience.filter(
      (_, i) => i !== index
    );

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        experience: updatedExperience,
      },
    });

    try {
      await portfolioApiService.removeExperience(index);
    } catch (error) {
      console.error("Failed to persist experience removal:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  updateProject: async (index, updates) => {
    const { portfolio } = get();
    if (!portfolio) return;

    const updatedProjects = portfolio.projects.map((project, i) =>
      i === index ? { ...project, ...updates } : project
    );

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        projects: updatedProjects,
      },
    });

    try {
      await portfolioApiService.updateProject(index, updates);
    } catch (error) {
      console.error("Failed to persist project update:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  addProject: async () => {
    const { portfolio } = get();
    if (!portfolio) return;

    const newProject: Project = {
      title: "",
      description: "",
      link: "",
      features: [],
    };

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        projects: [...portfolio.projects, newProject],
      },
    });

    try {
      await portfolioApiService.addProject(newProject);
    } catch (error) {
      console.error("Failed to persist project addition:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  removeProject: async (index) => {
    const { portfolio } = get();
    if (!portfolio) return;

    const updatedProjects = portfolio.projects.filter((_, i) => i !== index);

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        projects: updatedProjects,
      },
    });

    try {
      await portfolioApiService.removeProject(index);
    } catch (error) {
      console.error("Failed to persist project removal:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  updateSkills: async (skills) => {
    const { portfolio } = get();
    if (!portfolio) return;

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        skills,
      },
    });

    try {
      await portfolioApiService.updateSkills(skills);
    } catch (error) {
      console.error("Failed to persist skills update:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  updateTools: async (tools) => {
    const { portfolio } = get();
    if (!portfolio) return;

    // Optimistic update
    set({
      portfolio: {
        ...portfolio,
        tools,
      },
    });

    try {
      await portfolioApiService.updateTools(tools);
    } catch (error) {
      console.error("Failed to persist tools update:", error);
      // Revert on error
      set({ portfolio });
    }
  },

  // Data Management
  loadFromApi: async () => {
    const { isLoading } = get();
    if (isLoading) return; // Prevent concurrent loads

    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/portfolios", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch portfolios: ${res.status}`);
      }
      const list = await res.json();
      const item = Array.isArray(list) && list.length > 0 ? list[0] : null;
      if (!item) {
        throw new Error("No portfolios found in database");
      }
      const adapted = adaptDbPortfolio(item);
      set({ portfolio: adapted, isLoading: false });
    } catch (error: any) {
      console.error("Failed to load portfolio from database:", error);
      set({
        error: `Failed to load portfolio data: ${error.message}`,
        isLoading: false,
      });
    }
  },

  exportJSON: () => {
    const { portfolio } = get();
    return portfolio ? JSON.stringify(portfolio, null, 2) : "{}";
  },

  importJSON: (jsonString) => {
    try {
      const imported = JSON.parse(jsonString) as EnhancedPortfolio;
      set({ portfolio: imported });
      return true;
    } catch (error) {
      console.error("Failed to import JSON:", error);
      return false;
    }
  },

  resetToDefault: async () => {
    await get().loadFromApi();
  },
}));
