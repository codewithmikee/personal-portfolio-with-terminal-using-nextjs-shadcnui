/**
 * Enhanced Data Loader for Portfolio Content
 * Handles loading data from the new enhanced JSON structure
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

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
} from "@/data/schemas/portfolio";
import {
  ProgrammingLevel,
  ProgrammingRole,
  JobType,
  Priority,
  ProjectType,
} from "@/data/schemas/portfolio";

interface DataEnvironment {
  development: boolean;
  production: boolean;
}

class EnhancedPortfolioDataLoader {
  private environment: DataEnvironment;

  constructor() {
    this.environment = {
      development: process.env.NODE_ENV === "development",
      production: process.env.NODE_ENV === "production",
    };
  }

  async loadData(): Promise<EnhancedPortfolio> {
    if (this.environment.development) {
      return this.loadDevelopmentData();
    } else {
      return this.loadProductionData();
    }
  }

  private async loadDevelopmentData(): Promise<EnhancedPortfolio> {
    try {
      // Load from enhanced development JSON file
      const data = await import("@/data/portfolio/portfolio.json");
      const loadedData = data.default || data;
      return this.validateAndTransformData(loadedData);
    } catch (error) {
      console.error("Failed to load enhanced development data:", error);
      // Fallback to sample data
      return this.loadSampleData();
    }
  }

  private async loadProductionData(): Promise<EnhancedPortfolio> {
    try {
      // Load from enhanced production JSON file
      const data = await import("@/data/portfolio/portfolio.json");
      const loadedData = data.default || data;
      return this.validateAndTransformData(loadedData);
    } catch (error) {
      console.error("Failed to load enhanced production data:", error);
      // Fallback to development data
      return this.loadDevelopmentData();
    }
  }

  private async loadSampleData(): Promise<EnhancedPortfolio> {
    try {
      const data = await import("@/data/portfolio/portfolio-sample.json");
      return this.validateAndTransformData(data.default || data);
    } catch (error) {
      console.error("Failed to load sample data:", error);
      throw new Error("Failed to load portfolio data");
    }
  }

  private validateAndTransformData(data: any): EnhancedPortfolio {
    // Validate and transform the data to ensure type safety
    return {
      profile: this.transformProfile(data.profile),
      techStacks: this.transformTechStacks(data.techStacks || []),
      contacts: this.transformContacts(data.contacts || []),
      projects: this.transformProjects(data.projects || []),
      experience: this.transformExperience(data.experience || []),
      skills: this.transformSkills(data.skills || []),
      tools: this.transformTools(data.tools || []),
      blogs: this.transformBlogs(data.blogs || []),
    };
  }

  private transformProfile(profile: any): Profile {
    return {
      full_name: profile.full_name || "",
      email: profile.email || "",
      phone_number: profile.phone_number || "",
      address: profile.address || "",
      description: profile.description || "",
      profile_picture: profile.profile_picture || "/placeholder-user.jpg",
      contacts: this.transformContacts(profile.contacts || []),
    };
  }

  private transformTechStacks(techStacks: any[]): TechStack[] {
    return techStacks.map((tech) => ({
      title: tech.title || "",
      key: tech.key || tech.title?.toLowerCase().replace(/\s+/g, "") || "",
      icon:
        tech.icon ||
        `/icons/${
          tech.key || tech.title?.toLowerCase().replace(/\s+/g, "")
        }.svg`,
      level: this.validateProgrammingLevel(tech.level),
      priority: this.validatePriority(tech.priority),
      type: this.validateProjectType(tech.type),
    }));
  }

  private transformContacts(contacts: any[]): Contact[] {
    return contacts.map((contact) => ({
      name: contact.name || "",
      icon: contact.icon || `/icons/${contact.name?.toLowerCase()}.svg`,
      link: contact.link || "#",
    }));
  }

  private transformProjects(projects: any[]): Project[] {
    return projects.map((project) => ({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "#",
      features: this.transformFeatures(project.features || []),
    }));
  }

  private transformFeatures(features: any[]): Feature[] {
    return features.map((feature) => ({
      title: feature.title || "",
      description: feature.description || "",
      techStacks: this.transformTechStacks(feature.techStacks || []),
    }));
  }

  private transformExperience(experience: any[]): Experience[] {
    return experience.map((exp) => ({
      company_name: exp.company_name || "",
      company_description: exp.company_description || "",
      start_date: exp.start_date || "",
      end_date: exp.end_date || null,
      role: this.validateProgrammingRole(exp.role),
      job_type: this.validateJobType(exp.job_type),
      contacts: this.transformContacts(exp.contacts || []),
    }));
  }

  private transformSkills(skills: any[]): Skill[] {
    return skills.map((skill) => ({
      title: skill.title || "",
    }));
  }

  private transformTools(tools: any[]): Tool[] {
    return tools.map((tool) => ({
      title: tool.title || "",
    }));
  }

  private transformBlogs(blogs: any[]): Blog[] {
    return blogs.map((blog) => ({
      title: blog.title || "",
      link: blog.link || "#",
      techStacks: this.transformTechStacks(blog.techStacks || []),
    }));
  }

  // Validation helper methods
  private validateProgrammingLevel(level: any): ProgrammingLevel {
    const validLevels: ProgrammingLevel[] = [
      ProgrammingLevel.Beginner,
      ProgrammingLevel.Intermediate,
      ProgrammingLevel.Advanced,
      ProgrammingLevel.Expert,
    ];
    return validLevels.includes(level) ? level : ProgrammingLevel.Intermediate;
  }

  private validatePriority(priority: any): Priority {
    const validPriorities: Priority[] = [Priority.Main, Priority.Side];
    return validPriorities.includes(priority) ? priority : Priority.Side;
  }

  private validateProjectType(type: any): ProjectType {
    const validTypes: ProjectType[] = [
      ProjectType.Frontend,
      ProjectType.Mobile,
      ProjectType.Fullstack,
      ProjectType.Backend,
    ];
    return validTypes.includes(type) ? type : ProjectType.Fullstack;
  }

  private validateProgrammingRole(role: any): ProgrammingRole {
    const validRoles: ProgrammingRole[] = [
      ProgrammingRole.FullStack,
      ProgrammingRole.Frontend,
      ProgrammingRole.Backend,
      ProgrammingRole.Mobile,
    ];
    return validRoles.includes(role) ? role : ProgrammingRole.FullStack;
  }

  private validateJobType(jobType: any): JobType {
    const validJobTypes: JobType[] = [
      JobType.FullTime,
      JobType.PartTime,
      JobType.Contract,
      JobType.Freelance,
    ];
    return validJobTypes.includes(jobType) ? jobType : JobType.FullTime;
  }

  // Method to load data from static JSON (for client-side)
  async loadFromStaticJSON(): Promise<EnhancedPortfolio> {
    try {
      const response = await fetch("/data/portfolio/portfolio.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.validateAndTransformData(data);
    } catch (error) {
      console.error("Failed to load data from static JSON:", error);
      // Fallback to development data
      return this.loadDevelopmentData();
    }
  }

  // Method to validate data structure
  validateData(data: any): data is EnhancedPortfolio {
    return (
      data &&
      typeof data === "object" &&
      data.profile &&
      Array.isArray(data.techStacks) &&
      Array.isArray(data.contacts) &&
      Array.isArray(data.projects) &&
      Array.isArray(data.experience) &&
      Array.isArray(data.skills) &&
      Array.isArray(data.tools) &&
      Array.isArray(data.blogs)
    );
  }

  // Method to get data size
  getDataSize(data: EnhancedPortfolio): number {
    return new Blob([JSON.stringify(data)]).size;
  }

  // Method to filter tech stacks
  filterTechStacks(
    techStacks: TechStack[],
    filter: {
      level?: ProgrammingLevel;
      priority?: Priority;
      type?: ProjectType;
      search?: string;
    }
  ): TechStack[] {
    return techStacks.filter((tech) => {
      if (filter.level && tech.level !== filter.level) return false;
      if (filter.priority && tech.priority !== filter.priority) return false;
      if (filter.type && tech.type !== filter.type) return false;
      if (
        filter.search &&
        !tech.title.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;
      return true;
    });
  }

  // Method to filter projects
  filterProjects(
    projects: Project[],
    filter: {
      techStack?: string;
      type?: ProjectType;
      search?: string;
    }
  ): Project[] {
    return projects.filter((project) => {
      if (
        filter.search &&
        !project.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !project.description.toLowerCase().includes(filter.search.toLowerCase())
      )
        return false;

      if (filter.techStack) {
        const hasTechStack = project.features.some((feature) =>
          feature.techStacks.some((tech) => tech.key === filter.techStack)
        );
        if (!hasTechStack) return false;
      }

      return true;
    });
  }

  // Method to get main tech stacks (priority: main)
  getMainTechStacks(techStacks: TechStack[]): TechStack[] {
    return this.filterTechStacks(techStacks, { priority: Priority.Main });
  }

  // Method to get side tech stacks (priority: side)
  getSideTechStacks(techStacks: TechStack[]): TechStack[] {
    return this.filterTechStacks(techStacks, { priority: Priority.Side });
  }

  // Method to get tech stacks by type
  getTechStacksByType(techStacks: TechStack[], type: ProjectType): TechStack[] {
    return this.filterTechStacks(techStacks, { type });
  }

  // Method to get current experience (no end_date)
  getCurrentExperience(experience: Experience[]): Experience | null {
    return experience.find((exp) => exp.end_date === null) || null;
  }

  // Method to get past experience (has end_date)
  getPastExperience(experience: Experience[]): Experience[] {
    return experience.filter((exp) => exp.end_date !== null);
  }
}

// Export singleton instance
export const enhancedPortfolioDataLoader = new EnhancedPortfolioDataLoader();

// Export class for testing
export { EnhancedPortfolioDataLoader };

// Helper function to load data
export async function loadEnhancedPortfolioData(): Promise<EnhancedPortfolio> {
  return enhancedPortfolioDataLoader.loadData();
}

// Helper function for client-side loading
export async function loadEnhancedPortfolioDataFromStatic(): Promise<EnhancedPortfolio> {
  return enhancedPortfolioDataLoader.loadFromStaticJSON();
}

// Helper function to get main tech stacks
export async function getMainTechStacks(): Promise<TechStack[]> {
  const data = await loadEnhancedPortfolioData();
  return enhancedPortfolioDataLoader.getMainTechStacks(data.techStacks);
}

// Helper function to get current experience
export async function getCurrentExperience(): Promise<Experience | null> {
  const data = await loadEnhancedPortfolioData();
  return enhancedPortfolioDataLoader.getCurrentExperience(data.experience);
}
