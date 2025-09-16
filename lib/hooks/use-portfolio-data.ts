/**
 * Enhanced Portfolio Data Hook
 * Custom hook for managing enhanced portfolio data with better type safety and filtering
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

import { useState, useEffect, useMemo } from "react";
import type {
  EnhancedPortfolio,
  TechStack,
  Project,
  Experience,
  Skill,
  Tool,
  Blog,
  Profile,
  Contact,
  Feature,
  ProgrammingLevel,
  ProgrammingRole,
  JobType,
  Priority,
  ProjectType,
  TechStackFilter,
  ProjectFilter,
} from "@/data/schemas/portfolio";
import {
  enhancedPortfolioDataLoader,
  loadEnhancedPortfolioData,
  loadEnhancedPortfolioDataFromStatic,
  getMainTechStacks,
  getCurrentExperience,
} from "@/lib/data-loader";

interface UseEnhancedPortfolioDataReturn {
  data: EnhancedPortfolio | null;
  loading: boolean;
  error: string | null;

  // Profile data
  profile: Profile | null;

  // Tech stacks
  techStacks: TechStack[];
  mainTechStacks: TechStack[];
  sideTechStacks: TechStack[];
  getTechStacksByType: (type: ProjectType) => TechStack[];
  filterTechStacks: (filter: TechStackFilter) => TechStack[];

  // Projects
  projects: Project[];
  filterProjects: (filter: ProjectFilter) => Project[];

  // Experience
  experience: Experience[];
  currentExperience: Experience | null;
  pastExperience: Experience[];

  // Skills and tools
  skills: Skill[];
  tools: Tool[];

  // Blogs
  blogs: Blog[];

  // Contacts
  contacts: Contact[];

  // Utility functions
  refreshData: () => Promise<void>;
  getDataSize: () => number;
}

export function useEnhancedPortfolioData(): UseEnhancedPortfolioDataReturn {
  const [data, setData] = useState<EnhancedPortfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from static JSON first (client-side)
      if (typeof window !== "undefined") {
        const loadedData = await loadEnhancedPortfolioDataFromStatic();
        setData(loadedData);
      } else {
        // Server-side loading
        const loadedData = await loadEnhancedPortfolioData();
        setData(loadedData);
      }
    } catch (err) {
      console.error("Failed to load enhanced portfolio data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load portfolio data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Memoized computed values
  const profile = useMemo(() => data?.profile || null, [data]);
  const techStacks = useMemo(() => data?.techStacks || [], [data]);
  const projects = useMemo(() => data?.projects || [], [data]);
  const experience = useMemo(() => data?.experience || [], [data]);
  const skills = useMemo(() => data?.skills || [], [data]);
  const tools = useMemo(() => data?.tools || [], [data]);
  const blogs = useMemo(() => data?.blogs || [], [data]);
  const contacts = useMemo(() => data?.contacts || [], [data]);

  // Main tech stacks (priority: main)
  const mainTechStacks = useMemo(() => {
    return enhancedPortfolioDataLoader.getMainTechStacks(techStacks);
  }, [techStacks]);

  // Side tech stacks (priority: side)
  const sideTechStacks = useMemo(() => {
    return enhancedPortfolioDataLoader.getSideTechStacks(techStacks);
  }, [techStacks]);

  // Current experience (no end_date)
  const currentExperience = useMemo(() => {
    return enhancedPortfolioDataLoader.getCurrentExperience(experience);
  }, [experience]);

  // Past experience (has end_date)
  const pastExperience = useMemo(() => {
    return enhancedPortfolioDataLoader.getPastExperience(experience);
  }, [experience]);

  // Filter functions
  const getTechStacksByType = useMemo(() => {
    return (type: ProjectType) =>
      enhancedPortfolioDataLoader.getTechStacksByType(techStacks, type);
  }, [techStacks]);

  const filterTechStacks = useMemo(() => {
    return (filter: TechStackFilter) =>
      enhancedPortfolioDataLoader.filterTechStacks(techStacks, filter);
  }, [techStacks]);

  const filterProjects = useMemo(() => {
    return (filter: ProjectFilter) =>
      enhancedPortfolioDataLoader.filterProjects(projects, filter);
  }, [projects]);

  // Utility functions
  const refreshData = async () => {
    await loadData();
  };

  const getDataSize = () => {
    return data ? enhancedPortfolioDataLoader.getDataSize(data) : 0;
  };

  return {
    data,
    loading,
    error,
    profile,
    techStacks,
    mainTechStacks,
    sideTechStacks,
    getTechStacksByType,
    filterTechStacks,
    projects,
    filterProjects,
    experience,
    currentExperience,
    pastExperience,
    skills,
    tools,
    blogs,
    contacts,
    refreshData,
    getDataSize,
  };
}

// Specialized hooks for specific data types
export function useTechStacks() {
  const {
    techStacks,
    mainTechStacks,
    sideTechStacks,
    getTechStacksByType,
    filterTechStacks,
  } = useEnhancedPortfolioData();

  return {
    techStacks,
    mainTechStacks,
    sideTechStacks,
    getTechStacksByType,
    filterTechStacks,
  };
}

export function useProjects() {
  const { projects, filterProjects } = useEnhancedPortfolioData();

  return {
    projects,
    filterProjects,
  };
}

export function useExperience() {
  const { experience, currentExperience, pastExperience } =
    useEnhancedPortfolioData();

  return {
    experience,
    currentExperience,
    pastExperience,
  };
}

export function useProfile() {
  const { profile, contacts } = useEnhancedPortfolioData();

  return {
    profile,
    contacts,
  };
}

export function useSkillsAndTools() {
  const { skills, tools } = useEnhancedPortfolioData();

  return {
    skills,
    tools,
  };
}

export function useBlogs() {
  const { blogs } = useEnhancedPortfolioData();

  return {
    blogs,
  };
}
