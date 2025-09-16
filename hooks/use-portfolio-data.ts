// hooks/use-portfolio-data.ts
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

export function usePortfolioData() {
  const store = usePortfolioStore();
  const loadingRef = useRef(false);
  const { toast } = useToast();

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
