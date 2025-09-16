"use client";

import { useState, useCallback } from "react";
import type {
  EnhancedPortfolio,
  Experience,
  Project,
} from "@/data/schemas/portfolio";
import { ProgrammingRole, JobType } from "@/data/schemas/portfolio";
import sampleData from "@/data/portfolio/portfolio-sample.json";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<EnhancedPortfolio>(
    sampleData as EnhancedPortfolio
  );

  const updateProfile = useCallback(
    (updates: Partial<EnhancedPortfolio["profile"]>) => {
      setPortfolio((prev) => ({
        ...prev,
        profile: { ...prev.profile, ...updates },
      }));
    },
    []
  );

  const updateExperience = useCallback(
    (index: number, updates: Partial<EnhancedPortfolio["experience"][0]>) => {
      setPortfolio((prev) => ({
        ...prev,
        experience: prev.experience.map((exp, i) =>
          i === index ? { ...exp, ...updates } : exp
        ),
      }));
    },
    []
  );

  const addExperience = useCallback(() => {
    const newExperience: Experience = {
      company_name: "",
      company_description: "",
      start_date: "",
      end_date: null,
      role: ProgrammingRole.FullStack,
      job_type: JobType.FullTime,
      contacts: [],
    };
    setPortfolio((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  }, []);

  const removeExperience = useCallback((index: number) => {
    setPortfolio((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }, []);

  const updateProject = useCallback(
    (index: number, updates: Partial<EnhancedPortfolio["projects"][0]>) => {
      setPortfolio((prev) => ({
        ...prev,
        projects: prev.projects.map((project, i) =>
          i === index ? { ...project, ...updates } : project
        ),
      }));
    },
    []
  );

  const addProject = useCallback(() => {
    const newProject: Project = {
      title: "",
      description: "",
      link: "",
      features: [],
    };
    setPortfolio((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  }, []);

  const removeProject = useCallback((index: number) => {
    setPortfolio((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }, []);

  const updateSkills = useCallback((skills: EnhancedPortfolio["skills"]) => {
    setPortfolio((prev) => ({ ...prev, skills }));
  }, []);

  const updateTools = useCallback((tools: EnhancedPortfolio["tools"]) => {
    setPortfolio((prev) => ({ ...prev, tools }));
  }, []);

  const exportJSON = useCallback(() => {
    return JSON.stringify(portfolio, null, 2);
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

  const resetToDefault = useCallback(() => {
    setPortfolio(sampleData as EnhancedPortfolio);
  }, []);

  return {
    portfolio,
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
