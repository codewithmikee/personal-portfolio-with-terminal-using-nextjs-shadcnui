"use client";

import { useEffect, useState, useCallback } from "react";
import type { EnhancedPortfolio, Experience, Project } from "@/types/portfolio";
import { ProgrammingRole, JobType } from "@/types/portfolio";
import { adaptDbPortfolio } from "@/lib/portfolio-adapter";
import { portfolioApiService } from "@/lib/services/portfolio-api.service";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        // Always load from API - no more static JSON fallbacks
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
        if (!cancelled) setPortfolio(adapted);
      } catch (e: any) {
        console.error("Failed to load portfolio from database:", e);
        if (!cancelled) setError(`Failed to load portfolio data: ${e.message}`);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Update helpers that persist to API
  const updateProfile = useCallback(
    async (updates: Partial<EnhancedPortfolio["profile"]>) => {
      setPortfolio((prev) =>
        prev ? { ...prev, profile: { ...prev.profile, ...updates } } : prev
      );
      try {
        await portfolioApiService.updateProfile(updates);
      } catch (error) {
        console.error("Failed to persist profile update:", error);
      }
    },
    []
  );

  const updateExperience = useCallback(
    async (
      index: number,
      updates: Partial<EnhancedPortfolio["experience"][0]>
    ) => {
      setPortfolio((prev) =>
        prev
          ? {
              ...prev,
              experience: prev.experience.map((exp, i) =>
                i === index ? { ...exp, ...updates } : exp
              ),
            }
          : prev
      );
      try {
        await portfolioApiService.updateExperience(index, updates);
      } catch (error) {
        console.error("Failed to persist experience update:", error);
      }
    },
    []
  );

  const addExperience = useCallback(async () => {
    const newExperience: Experience = {
      company_name: "",
      company_description: "",
      start_date: "",
      end_date: null,
      role: ProgrammingRole.FullStack,
      job_type: JobType.FullTime,
      contacts: [],
    };
    setPortfolio((prev) =>
      prev ? { ...prev, experience: [...prev.experience, newExperience] } : prev
    );
    try {
      await portfolioApiService.addExperience(newExperience);
    } catch (error) {
      console.error("Failed to persist experience addition:", error);
    }
  }, []);

  const removeExperience = useCallback(async (index: number) => {
    setPortfolio((prev) =>
      prev
        ? {
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index),
          }
        : prev
    );
    try {
      await portfolioApiService.removeExperience(index);
    } catch (error) {
      console.error("Failed to persist experience removal:", error);
    }
  }, []);

  const updateProject = useCallback(
    async (
      index: number,
      updates: Partial<EnhancedPortfolio["projects"][0]>
    ) => {
      setPortfolio((prev) =>
        prev
          ? {
              ...prev,
              projects: prev.projects.map((p, i) =>
                i === index ? { ...p, ...updates } : p
              ),
            }
          : prev
      );
      try {
        await portfolioApiService.updateProject(index, updates);
      } catch (error) {
        console.error("Failed to persist project update:", error);
      }
    },
    []
  );

  const addProject = useCallback(async () => {
    const newProject: Project = {
      title: "",
      description: "",
      link: "",
      features: [],
    };
    setPortfolio((prev) =>
      prev ? { ...prev, projects: [...prev.projects, newProject] } : prev
    );
    try {
      await portfolioApiService.addProject(newProject);
    } catch (error) {
      console.error("Failed to persist project addition:", error);
    }
  }, []);

  const removeProject = useCallback(async (index: number) => {
    setPortfolio((prev) =>
      prev
        ? { ...prev, projects: prev.projects.filter((_, i) => i !== index) }
        : prev
    );
    try {
      await portfolioApiService.removeProject(index);
    } catch (error) {
      console.error("Failed to persist project removal:", error);
    }
  }, []);

  const updateSkills = useCallback(
    async (skills: EnhancedPortfolio["skills"]) => {
      setPortfolio((prev) => (prev ? { ...prev, skills } : prev));
      try {
        await portfolioApiService.updateSkills(skills);
      } catch (error) {
        console.error("Failed to persist skills update:", error);
      }
    },
    []
  );

  const updateTools = useCallback(async (tools: EnhancedPortfolio["tools"]) => {
    setPortfolio((prev) => (prev ? { ...prev, tools } : prev));
    try {
      await portfolioApiService.updateTools(tools);
    } catch (error) {
      console.error("Failed to persist tools update:", error);
    }
  }, []);

  const exportJSON = useCallback(() => {
    return portfolio ? JSON.stringify(portfolio, null, 2) : "{}";
  }, [portfolio]);

  const importJSON = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString) as EnhancedPortfolio;
      setPortfolio(imported);
      return true;
    } catch (error) {
      console.error("Failed to import JSON:", error);
      return false;
    }
  }, []);

  const resetToDefault = useCallback(async () => {
    // Reload from database instead of static JSON
    try {
      const res = await fetch("/api/portfolios", { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch portfolios: ${res.status}`);
      const list = await res.json();
      const item = Array.isArray(list) && list.length > 0 ? list[0] : null;
      if (!item) throw new Error("No portfolios found in database");
      const adapted = adaptDbPortfolio(item);
      setPortfolio(adapted);
    } catch (error) {
      console.error("Failed to reset portfolio from database:", error);
    }
  }, []);

  return {
    portfolio,
    isLoading,
    error,
    updateProfile,
    updateExperience,
    addExperience,
    removeExperience,
    updateProject,
    addProject,
    removeProject,
    updateSkills,
    updateTools,
    exportJSON,
    importJSON,
    resetToDefault,
  };
}
