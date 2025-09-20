"use client";

import { useState, useEffect, useCallback } from "react";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";
import { portfolioService } from "@/lib/services/portfolio.service";
import { useToast } from "@workspace/ui/hooks/use-toast";
import type {
  EnhancedPortfolio,
  Experience,
  Project,
  Skill,
  Tool,
  Contact,
  Blog,
  TechStack,
} from "@/types/portfolio";

export function usePortfolioData() {
  const { portfolio, setPortfolio, isLoading, setIsLoading } =
    usePortfolioStore();
  const { toast } = useToast();

  const loadPortfolio = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await portfolioService.getPortfolio();
      setPortfolio(data);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      toast({
        title: "Error",
        description: "Failed to load portfolio data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [setPortfolio, setIsLoading, toast]);

  const updateProfile = useCallback(
    async (profileData: Partial<EnhancedPortfolio["profile"]>) => {
      if (!portfolio) return;

      try {
        const updatedPortfolio = {
          ...portfolio,
          profile: { ...portfolio.profile, ...profileData },
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const addExperience = useCallback(
    async (experienceData: Omit<Experience, "id">) => {
      if (!portfolio) return;

      try {
        const newExperience = {
          ...experienceData,
          id: Date.now().toString(),
        };
        const updatedPortfolio = {
          ...portfolio,
          experience: [...portfolio.experience, newExperience],
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Experience added successfully",
        });
      } catch (error) {
        console.error("Error adding experience:", error);
        toast({
          title: "Error",
          description: "Failed to add experience",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const updateExperience = useCallback(
    async (index: number, experienceData: Partial<Experience>) => {
      if (!portfolio) return;

      try {
        const optimisticExperience = portfolio.experience.map((exp, i) =>
          i === index ? { ...exp, ...experienceData } : exp
        );
        const updatedPortfolio = {
          ...portfolio,
          experience: optimisticExperience,
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Experience updated successfully",
        });
      } catch (error) {
        console.error("Error updating experience:", error);
        toast({
          title: "Error",
          description: "Failed to update experience",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const removeExperience = useCallback(
    async (index: number) => {
      if (!portfolio) return;

      try {
        const updatedPortfolio = {
          ...portfolio,
          experience: portfolio.experience.filter((_, i) => i !== index),
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Experience removed successfully",
        });
      } catch (error) {
        console.error("Error removing experience:", error);
        toast({
          title: "Error",
          description: "Failed to remove experience",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const addProject = useCallback(
    async (projectData: Omit<Project, "id">) => {
      if (!portfolio) return;

      try {
        const newProject = {
          ...projectData,
          id: Date.now().toString(),
        };
        const updatedPortfolio = {
          ...portfolio,
          projects: [...portfolio.projects, newProject],
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Project added successfully",
        });
      } catch (error) {
        console.error("Error adding project:", error);
        toast({
          title: "Error",
          description: "Failed to add project",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const updateProject = useCallback(
    async (index: number, projectData: Partial<Project>) => {
      if (!portfolio) return;

      try {
        const optimisticProjects = portfolio.projects.map((project, i) =>
          i === index ? { ...project, ...projectData } : project
        );
        const updatedPortfolio = {
          ...portfolio,
          projects: optimisticProjects,
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } catch (error) {
        console.error("Error updating project:", error);
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const removeProject = useCallback(
    async (index: number) => {
      if (!portfolio) return;

      try {
        const updatedPortfolio = {
          ...portfolio,
          projects: portfolio.projects.filter((_, i) => i !== index),
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Project removed successfully",
        });
      } catch (error) {
        console.error("Error removing project:", error);
        toast({
          title: "Error",
          description: "Failed to remove project",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const updateSkills = useCallback(
    async (skills: Skill[]) => {
      if (!portfolio) return;

      try {
        const updatedPortfolio = {
          ...portfolio,
          skills,
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Skills updated successfully",
        });
      } catch (error) {
        console.error("Error updating skills:", error);
        toast({
          title: "Error",
          description: "Failed to update skills",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  const updateTools = useCallback(
    async (tools: Tool[]) => {
      if (!portfolio) return;

      try {
        const updatedPortfolio = {
          ...portfolio,
          tools,
        };
        setPortfolio(updatedPortfolio);
        await portfolioService.updatePortfolio(updatedPortfolio);
        toast({
          title: "Success",
          description: "Tools updated successfully",
        });
      } catch (error) {
        console.error("Error updating tools:", error);
        toast({
          title: "Error",
          description: "Failed to update tools",
          variant: "destructive",
        });
      }
    },
    [portfolio, setPortfolio, toast]
  );

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  return {
    portfolio,
    isLoading,
    loadPortfolio,
    updateProfile,
    addExperience,
    updateExperience,
    removeExperience,
    addProject,
    updateProject,
    removeProject,
    updateSkills,
    updateTools,
  };
}
