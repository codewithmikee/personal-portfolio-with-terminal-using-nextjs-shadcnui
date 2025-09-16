/**
 * @fileoverview Comprehensive portfolio management hooks
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @github https://github.com/codewithmikee
 */

import { useCallback, useRef } from "react";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";
import { portfolioService } from "@/lib/services/portfolio.service";
import { useToast } from "@/hooks/use-toast";
import type {
  Profile,
  Experience,
  Project,
  Skill,
  Tool,
  EnhancedPortfolio,
} from "@/types/portfolio";

/**
 * Main portfolio management hook that provides comprehensive CRUD operations
 * with optimistic updates, error handling, and user feedback via toast notifications.
 *
 * @returns {Object} Portfolio data and management functions
 * @returns {EnhancedPortfolio | null} portfolio - Current portfolio data
 * @returns {boolean} isLoading - Loading state
 * @returns {string | null} error - Current error message
 * @returns {Function} loadPortfolio - Load portfolio from API
 * @returns {Function} retry - Retry failed operations
 * @returns {Function} updateProfile - Update profile information
 * @returns {Function} addExperience - Add new work experience
 * @returns {Function} updateExperience - Update existing experience
 * @returns {Function} removeExperience - Remove experience
 * @returns {Function} addProject - Add new project
 * @returns {Function} updateProject - Update existing project
 * @returns {Function} removeProject - Remove project
 * @returns {Function} updateSkills - Update skills list
 * @returns {Function} updateTools - Update tools list
 * @returns {Function} exportJSON - Export portfolio as JSON
 * @returns {Function} importJSON - Import portfolio from JSON
 * @returns {Function} resetToDefault - Reset to default portfolio
 *
 * @example
 * ```tsx
 * function PortfolioEditor() {
 *   const {
 *     portfolio,
 *     isLoading,
 *     updateProfile,
 *     addProject
 *   } = usePortfolioData();
 *
 *   const handleSave = async () => {
 *     await updateProfile({ full_name: "New Name" });
 *   };
 *
 *   return (
 *     <div>
 *       {isLoading ? "Loading..." : portfolio?.profile.full_name}
 *       <button onClick={handleSave}>Save</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePortfolioData() {
  const store = usePortfolioStore();
  const loadingRef = useRef(false);
  const { toast } = useToast();

  /**
   * Loads portfolio data from the API
   * @async
   * @function loadPortfolio
   * @description Fetches portfolio data and updates the store. Shows error toast on failure.
   */
  const loadPortfolio = useCallback(async () => {
    if (loadingRef.current || store.isLoading) return;

    loadingRef.current = true;
    store.setLoading(true);
    store.clearError();

    try {
      const portfolio = await portfolioService.loadPortfolio();
      store.setPortfolio(portfolio);
      // Don't show success toast on initial load, only on retry
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load portfolio";
      store.setError(message);
      toast({
        title: "Failed to load portfolio",
        description: message,
        variant: "destructive",
      });
    } finally {
      store.setLoading(false);
      loadingRef.current = false;
    }
  }, [store, toast]);

  /**
   * Retries loading portfolio data with cache clearing
   * @async
   * @function retry
   * @description Clears cache and reloads portfolio data. Shows success toast on completion.
   */
  const retry = useCallback(async () => {
    portfolioService.clearCache();
    await loadPortfolio();
    toast({
      title: "Portfolio reloaded successfully",
      description: "Your portfolio data has been refreshed.",
    });
  }, [loadPortfolio, toast]);

  // Profile operations
  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticPortfolio = {
        ...portfolio,
        profile: { ...portfolio.profile, ...updates },
      };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.updateProfile(updates);
        toast({
          title: "Profile updated successfully",
          description: "Your profile information has been saved.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error ? error.message : "Failed to update profile";
        store.setError(message);
        toast({
          title: "Failed to update profile",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  // Experience operations
  const addExperience = useCallback(async () => {
    const { portfolio } = store;
    if (!portfolio) return;

    const newExperience: Experience = {
      company_name: "New Company",
      company_description: "",
      start_date: "",
      end_date: null,
      role: "FullStack" as any,
      job_type: "FullTime" as any,
      contacts: [],
    };

    const optimisticPortfolio = {
      ...portfolio,
      experience: [...portfolio.experience, newExperience],
    };
    store.setPortfolio(optimisticPortfolio);

    try {
      await portfolioService.addExperience(newExperience);
      toast({
        title: "Experience added successfully",
        description: "A new work experience has been added to your portfolio.",
      });
    } catch (error) {
      store.setPortfolio(portfolio);
      const message =
        error instanceof Error ? error.message : "Failed to add experience";
      store.setError(message);
      toast({
        title: "Failed to add experience",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  }, [store, toast]);

  const updateExperience = useCallback(
    async (index: number, updates: Partial<Experience>) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticExperience = portfolio.experience.map((exp, i) =>
        i === index ? { ...exp, ...updates } : exp
      );
      const optimisticPortfolio = {
        ...portfolio,
        experience: optimisticExperience,
      };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.updateExperience(index, updates);
        toast({
          title: "Experience updated successfully",
          description: "Your work experience has been updated.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error
            ? error.message
            : "Failed to update experience";
        store.setError(message);
        toast({
          title: "Failed to update experience",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  const removeExperience = useCallback(
    async (index: number) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticExperience = portfolio.experience.filter(
        (_, i) => i !== index
      );
      const optimisticPortfolio = {
        ...portfolio,
        experience: optimisticExperience,
      };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.removeExperience(index);
        toast({
          title: "Experience removed successfully",
          description:
            "The work experience has been removed from your portfolio.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error
            ? error.message
            : "Failed to remove experience";
        store.setError(message);
        toast({
          title: "Failed to remove experience",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  // Project operations
  const addProject = useCallback(async () => {
    const { portfolio } = store;
    if (!portfolio) return;

    const newProject: Project = {
      title: "New Project",
      description: "",
      link: "",
      features: [],
    };

    const optimisticPortfolio = {
      ...portfolio,
      projects: [...portfolio.projects, newProject],
    };
    store.setPortfolio(optimisticPortfolio);

    try {
      await portfolioService.addProject(newProject);
      toast({
        title: "Project added successfully",
        description: "A new project has been added to your portfolio.",
      });
    } catch (error) {
      store.setPortfolio(portfolio);
      const message =
        error instanceof Error ? error.message : "Failed to add project";
      store.setError(message);
      toast({
        title: "Failed to add project",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  }, [store, toast]);

  const updateProject = useCallback(
    async (index: number, updates: Partial<Project>) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticProjects = portfolio.projects.map((project, i) =>
        i === index ? { ...project, ...updates } : project
      );
      const optimisticPortfolio = {
        ...portfolio,
        projects: optimisticProjects,
      };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.updateProject(index, updates);
        toast({
          title: "Project updated successfully",
          description: "Your project has been updated.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error ? error.message : "Failed to update project";
        store.setError(message);
        toast({
          title: "Failed to update project",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  const removeProject = useCallback(
    async (index: number) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticProjects = portfolio.projects.filter(
        (_, i) => i !== index
      );
      const optimisticPortfolio = {
        ...portfolio,
        projects: optimisticProjects,
      };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.removeProject(index);
        toast({
          title: "Project removed successfully",
          description: "The project has been removed from your portfolio.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error ? error.message : "Failed to remove project";
        store.setError(message);
        toast({
          title: "Failed to remove project",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  // Skills and Tools operations
  const updateSkills = useCallback(
    async (skills: Skill[]) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticPortfolio = { ...portfolio, skills };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.updateSkills(skills);
        toast({
          title: "Skills updated successfully",
          description: "Your skills have been updated.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error ? error.message : "Failed to update skills";
        store.setError(message);
        toast({
          title: "Failed to update skills",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  const updateTools = useCallback(
    async (tools: Tool[]) => {
      const { portfolio } = store;
      if (!portfolio) return;

      const optimisticPortfolio = { ...portfolio, tools };
      store.setPortfolio(optimisticPortfolio);

      try {
        await portfolioService.updateTools(tools);
        toast({
          title: "Tools updated successfully",
          description: "Your tools have been updated.",
        });
      } catch (error) {
        store.setPortfolio(portfolio);
        const message =
          error instanceof Error ? error.message : "Failed to update tools";
        store.setError(message);
        toast({
          title: "Failed to update tools",
          description: message,
          variant: "destructive",
        });
        throw error;
      }
    },
    [store, toast]
  );

  // Data management operations
  const exportJSON = useCallback(() => {
    const { portfolio } = store;
    return portfolio ? JSON.stringify(portfolio, null, 2) : "{}";
  }, [store]);

  const importJSON = useCallback(
    (jsonString: string) => {
      try {
        const imported = JSON.parse(jsonString) as EnhancedPortfolio;
        store.setPortfolio(imported);
        toast({
          title: "Portfolio imported successfully",
          description: "Your portfolio data has been imported.",
        });
        return true;
      } catch (error) {
        console.error("Failed to import JSON:", error);
        const message = "Failed to import JSON: Invalid format";
        store.setError(message);
        toast({
          title: "Failed to import portfolio",
          description: message,
          variant: "destructive",
        });
        return false;
      }
    },
    [store, toast]
  );

  const resetToDefault = useCallback(async () => {
    portfolioService.clearCache();
    await loadPortfolio();
    toast({
      title: "Portfolio reset successfully",
      description: "Your portfolio has been reset to default values.",
    });
  }, [loadPortfolio, toast]);

  return {
    // Read-only data
    portfolio: store.portfolio,
    isLoading: store.isLoading,
    error: store.error,

    // Basic actions
    loadPortfolio,
    retry,

    // Profile operations
    updateProfile,

    // Experience operations
    addExperience,
    updateExperience,
    removeExperience,

    // Project operations
    addProject,
    updateProject,
    removeProject,

    // Skills and Tools
    updateSkills,
    updateTools,

    // Data management
    exportJSON,
    importJSON,
    resetToDefault,
  };
}

/**
 * Read-only access to portfolio data
 * Use this in display components that only need to show data
 *
 * @returns {Object} Read-only portfolio data
 * @returns {EnhancedPortfolio | null} portfolio - Current portfolio data
 * @returns {boolean} isLoading - Loading state
 * @returns {string | null} error - Current error message
 *
 * @example
 * ```tsx
 * function PortfolioDisplay() {
 *   const { portfolio, isLoading, error } = usePortfolioDataReadOnly();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *   if (!portfolio) return <div>No portfolio found</div>;
 *
 *   return <div>{portfolio.profile.full_name}</div>;
 * }
 * ```
 */
export function usePortfolioDataReadOnly() {
  const store = usePortfolioStore();
  return {
    portfolio: store.portfolio,
    isLoading: store.isLoading,
    error: store.error,
  };
}

/**
 * Hook that provides only CRUD operations
 * Use this in admin/management components that need to modify data
 *
 * @returns {Object} Portfolio management functions
 * @returns {Function} updateProfile - Update profile information
 * @returns {Function} addExperience - Add new work experience
 * @returns {Function} updateExperience - Update existing experience
 * @returns {Function} removeExperience - Remove experience
 * @returns {Function} addProject - Add new project
 * @returns {Function} updateProject - Update existing project
 * @returns {Function} removeProject - Remove project
 * @returns {Function} updateSkills - Update skills list
 * @returns {Function} updateTools - Update tools list
 * @returns {Function} exportJSON - Export portfolio as JSON
 * @returns {Function} importJSON - Import portfolio from JSON
 * @returns {Function} resetToDefault - Reset to default portfolio
 *
 * @example
 * ```tsx
 * function AdminPanel() {
 *   const { updateProfile, addProject } = usePortfolioActions();
 *
 *   const handleSave = async () => {
 *     await updateProfile({ full_name: "New Name" });
 *   };
 *
 *   return <button onClick={handleSave}>Save Changes</button>;
 * }
 * ```
 */
export function usePortfolioActions() {
  const {
    updateProfile,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    updateSkills,
    updateTools,
    exportJSON,
    importJSON,
    resetToDefault,
  } = usePortfolioData();

  return {
    updateProfile,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    updateSkills,
    updateTools,
    exportJSON,
    importJSON,
    resetToDefault,
  };
}

/**
 * Direct access to portfolio store
 * @deprecated Use usePortfolioData() instead for better type safety
 * @returns {Object} Direct store access
 */
export function usePortfolioStoreDirect() {
  return usePortfolioStore();
}
