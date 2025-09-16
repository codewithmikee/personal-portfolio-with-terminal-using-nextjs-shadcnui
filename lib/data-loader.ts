/**
 * Data loader for portfolio content
 * Handles loading data from JSON files based on environment
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

import type { PortfolioData } from "@/data/schemas/portfolio";

interface DataEnvironment {
  development: boolean;
  production: boolean;
}

class PortfolioDataLoader {
  private environment: DataEnvironment;

  constructor() {
    this.environment = {
      development: process.env.NODE_ENV === "development",
      production: process.env.NODE_ENV === "production",
    };
  }

  async loadData(): Promise<PortfolioData> {
    if (this.environment.development) {
      return this.loadDevelopmentData();
    } else {
      return this.loadProductionData();
    }
  }

  private async loadDevelopmentData(): Promise<PortfolioData> {
    try {
      // Load from development JSON file
      const data = await import("@/data/development/portfolio.json");
      const loadedData = data.default || data;
      return {
        ...loadedData,
        personal: {
          ...loadedData.personal,
          resume_url: loadedData.personal.resume_url || undefined,
          current_status: loadedData.personal.current_status as
            | "available"
            | "employed"
            | "freelancing",
          contact: {
            ...loadedData.personal.contact,
            phone: loadedData.personal.contact.phone || undefined,
            website: loadedData.personal.contact.website || undefined,
            twitter: loadedData.personal.contact.twitter || undefined,
            blog_url: loadedData.personal.contact.blog_url || undefined,
          },
        },
        experience: loadedData.experience.map((exp) => ({
          ...exp,
          employment_type: exp.employment_type as
            | "full-time"
            | "part-time"
            | "contract"
            | "freelance",
          timeline: {
            ...exp.timeline,
            end_date: exp.timeline.end_date || undefined,
          },
        })),
        projects: {
          ...loadedData.projects,
          projects: loadedData.projects.projects.map((project) => ({
            ...project,
            category: project.category as
              | "fullstack"
              | "backend"
              | "api"
              | "frontend"
              | "integration",
            status: project.status as
              | "completed"
              | "in-progress"
              | "maintenance"
              | "archived",
            urls: {
              ...project.urls,
              live_url: project.urls.live_url || undefined,
              github_url: project.urls.github_url || undefined,
              case_study_url: project.urls.case_study_url || undefined,
              blog_post_url: project.urls.blog_post_url || undefined,
            },
            media: {
              ...project.media,
              thumbnail: project.media.thumbnail || "/placeholder.svg",
              demo_video: project.media.demo_video || undefined,
            },
            laravel_features: project.laravel_features || undefined,
          })),
        },
        skills: {
          ...loadedData.skills,
          skills: loadedData.skills.skills.map((skill) => ({
            ...skill,
            level: skill.level as 1 | 2 | 3 | 4 | 5,
            category: skill.category as
              | "backend"
              | "frontend"
              | "database"
              | "devops"
              | "tools"
              | "soft-skills",
            laravel_context: skill.laravel_context || undefined,
          })),
        },
        config: {
          ...loadedData.config,
          theme: loadedData.config.theme as
            | "professional"
            | "creative"
            | "minimal",
          layout: loadedData.config.layout as "single-page" | "multi-page",
        },
        metadata: {
          ...loadedData.metadata,
          environment: "development" as const,
          build_date: loadedData.metadata.build_date || undefined,
        },
      };
    } catch (error) {
      console.error("Failed to load development data:", error);
      throw new Error("Failed to load portfolio data");
    }
  }

  private async loadProductionData(): Promise<PortfolioData> {
    try {
      // Load from production JSON file
      const data = await import("@/data/production/portfolio.json");
      const loadedData = data.default || data;
      return {
        ...loadedData,
        personal: {
          ...loadedData.personal,
          resume_url: loadedData.personal.resume_url || undefined,
          current_status: loadedData.personal.current_status as
            | "available"
            | "employed"
            | "freelancing",
          contact: {
            ...loadedData.personal.contact,
            phone: loadedData.personal.contact.phone || undefined,
            website: loadedData.personal.contact.website || undefined,
            twitter: loadedData.personal.contact.twitter || undefined,
            blog_url: loadedData.personal.contact.blog_url || undefined,
          },
        },
        experience: loadedData.experience.map((exp) => ({
          ...exp,
          employment_type: exp.employment_type as
            | "full-time"
            | "part-time"
            | "contract"
            | "freelance",
          timeline: {
            ...exp.timeline,
            end_date: exp.timeline.end_date || undefined,
          },
        })),
        projects: {
          ...loadedData.projects,
          projects: loadedData.projects.projects.map((project) => ({
            ...project,
            category: project.category as
              | "fullstack"
              | "backend"
              | "api"
              | "frontend"
              | "integration",
            status: project.status as
              | "completed"
              | "in-progress"
              | "maintenance"
              | "archived",
            urls: {
              ...project.urls,
              live_url: project.urls.live_url || undefined,
              github_url: project.urls.github_url || undefined,
              case_study_url: project.urls.case_study_url || undefined,
              blog_post_url: project.urls.blog_post_url || undefined,
            },
            media: {
              ...project.media,
              thumbnail: project.media.thumbnail || "/placeholder.svg",
              demo_video: project.media.demo_video || undefined,
            },
            laravel_features: project.laravel_features || undefined,
          })),
        },
        skills: {
          ...loadedData.skills,
          skills: loadedData.skills.skills.map((skill) => ({
            ...skill,
            level: skill.level as 1 | 2 | 3 | 4 | 5,
            category: skill.category as
              | "backend"
              | "frontend"
              | "database"
              | "devops"
              | "tools"
              | "soft-skills",
            laravel_context: skill.laravel_context || undefined,
          })),
        },
        config: {
          ...loadedData.config,
          theme: loadedData.config.theme as
            | "professional"
            | "creative"
            | "minimal",
          layout: loadedData.config.layout as "single-page" | "multi-page",
        },
        metadata: {
          ...loadedData.metadata,
          environment: "production" as const,
          build_date:
            loadedData.metadata.build_date || new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("Failed to load production data:", error);
      // Fallback to development data if production data doesn't exist
      return this.loadDevelopmentData();
    }
  }

  // Method to load data from static JSON (for client-side)
  async loadFromStaticJSON(): Promise<PortfolioData> {
    try {
      const response = await fetch("/data/portfolio.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to load data from static JSON:", error);
      // Fallback to development data if static JSON fails
      return this.loadDevelopmentData();
    }
  }

  // Method to validate data structure
  validateData(data: any): data is PortfolioData {
    // Basic validation - you can expand this
    return (
      data &&
      typeof data === "object" &&
      data.metadata &&
      data.personal &&
      data.projects &&
      data.experience &&
      data.skills
    );
  }

  // Method to get data size
  getDataSize(data: PortfolioData): number {
    return new Blob([JSON.stringify(data)]).size;
  }

  // Method to optimize data for production
  optimizeForProduction(data: PortfolioData): PortfolioData {
    return {
      ...data,
      metadata: {
        ...data.metadata,
        build_date: new Date().toISOString(),
        environment: "production" as const,
      },
    };
  }
}

// Export singleton instance
export const portfolioDataLoader = new PortfolioDataLoader();

// Export class for testing
export { PortfolioDataLoader };

// Helper function to load data
export async function loadPortfolioData(): Promise<PortfolioData> {
  return portfolioDataLoader.loadData();
}

// Helper function for client-side loading
export async function loadPortfolioDataFromStatic(): Promise<PortfolioData> {
  return portfolioDataLoader.loadFromStaticJSON();
}
