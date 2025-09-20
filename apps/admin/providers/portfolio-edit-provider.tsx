"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { EnhancedPortfolio } from "@/types/portfolio";

interface PortfolioEditContextType {
  portfolio: EnhancedPortfolio | null;
  setPortfolio: (portfolio: EnhancedPortfolio | null) => void;
  updateProfile: (updates: Partial<EnhancedPortfolio["profile"]>) => void;
  addExperience: (experience: EnhancedPortfolio["experience"][0]) => void;
  updateExperience: (
    index: number,
    updates: Partial<EnhancedPortfolio["experience"][0]>
  ) => void;
  removeExperience: (index: number) => void;
  addProject: (project: EnhancedPortfolio["projects"][0]) => void;
  updateProject: (
    index: number,
    updates: Partial<EnhancedPortfolio["projects"][0]>
  ) => void;
  removeProject: (index: number) => void;
  updateSkills: (skills: EnhancedPortfolio["skills"]) => void;
  updateTools: (tools: EnhancedPortfolio["tools"]) => void;
}

const PortfolioEditContext = createContext<
  PortfolioEditContextType | undefined
>(undefined);

export function PortfolioEditProvider({
  children,
  initialPortfolio,
}: {
  children: React.ReactNode;
  initialPortfolio: EnhancedPortfolio | null;
}) {
  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(
    initialPortfolio
  );

  const updateProfile = useCallback(
    (updates: Partial<EnhancedPortfolio["profile"]>) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        profile: { ...portfolio.profile, ...updates },
      });
    },
    [portfolio]
  );

  const addExperience = useCallback(
    (experience: EnhancedPortfolio["experience"][0]) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        experience: [...portfolio.experience, experience],
      });
    },
    [portfolio]
  );

  const updateExperience = useCallback(
    (index: number, updates: Partial<EnhancedPortfolio["experience"][0]>) => {
      if (!portfolio) return;
      const updatedExperience = portfolio.experience.map((exp, i) =>
        i === index ? { ...exp, ...updates } : exp
      );
      setPortfolio({
        ...portfolio,
        experience: updatedExperience,
      });
    },
    [portfolio]
  );

  const removeExperience = useCallback(
    (index: number) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        experience: portfolio.experience.filter((_, i) => i !== index),
      });
    },
    [portfolio]
  );

  const addProject = useCallback(
    (project: EnhancedPortfolio["projects"][0]) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        projects: [...portfolio.projects, project],
      });
    },
    [portfolio]
  );

  const updateProject = useCallback(
    (index: number, updates: Partial<EnhancedPortfolio["projects"][0]>) => {
      if (!portfolio) return;
      const updatedProjects = portfolio.projects.map((proj, i) =>
        i === index ? { ...proj, ...updates } : proj
      );
      setPortfolio({
        ...portfolio,
        projects: updatedProjects,
      });
    },
    [portfolio]
  );

  const removeProject = useCallback(
    (index: number) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        projects: portfolio.projects.filter((_, i) => i !== index),
      });
    },
    [portfolio]
  );

  const updateSkills = useCallback(
    (skills: EnhancedPortfolio["skills"]) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        skills,
      });
    },
    [portfolio]
  );

  const updateTools = useCallback(
    (tools: EnhancedPortfolio["tools"]) => {
      if (!portfolio) return;
      setPortfolio({
        ...portfolio,
        tools,
      });
    },
    [portfolio]
  );

  return (
    <PortfolioEditContext.Provider
      value={{
        portfolio,
        setPortfolio,
        updateProfile,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        updateTools,
      }}
    >
      {children}
    </PortfolioEditContext.Provider>
  );
}

export function usePortfolioEdit() {
  const context = useContext(PortfolioEditContext);
  if (context === undefined) {
    throw new Error(
      "usePortfolioEdit must be used within a PortfolioEditProvider"
    );
  }
  return context;
}
