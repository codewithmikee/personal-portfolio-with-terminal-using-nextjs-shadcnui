// lib/services/portfolio.service.ts
import type {
  EnhancedPortfolio,
  Profile,
  Experience,
  Project,
  Skill,
  Tool,
} from "@/types/portfolio";
import { adaptDbPortfolio } from "@/lib/portfolio-adapter";

export class PortfolioService {
  private static instance: PortfolioService;
  private cache: EnhancedPortfolio | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly API_BASE = "/api/portfolios";
  private portfolioId: string | null = null;

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      PortfolioService.instance = new PortfolioService();
    }
    return PortfolioService.instance;
  }

  private async getPortfolioId(): Promise<string> {
    if (this.portfolioId) return this.portfolioId;

    const response = await fetch(this.API_BASE, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolios: ${response.status}`);
    }

    const portfolios = await response.json();
    if (!Array.isArray(portfolios) || portfolios.length === 0) {
      throw new Error("No portfolios found");
    }

    const id = portfolios[0].id;
    if (!id) throw new Error("Portfolio ID not found");

    this.portfolioId = id;
    return this.portfolioId!;
  }

  async loadPortfolio(): Promise<EnhancedPortfolio> {
    // Check cache first
    const now = Date.now();
    if (this.cache && now - this.cacheTimestamp < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      // Try API first
      const response = await fetch(this.API_BASE, {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const portfolio = Array.isArray(data) && data.length > 0 ? data[0] : data;

      if (!portfolio) {
        throw new Error("No portfolio data found");
      }

      const adapted = adaptDbPortfolio(portfolio);

      // Update cache
      this.cache = adapted;
      this.cacheTimestamp = now;

      return adapted;
    } catch (error) {
      console.warn("API failed, falling back to JSON file:", error);

      // Fallback to JSON file
      try {
        const response = await fetch("/data/portfolio.json", {
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Failed to load JSON: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error("No portfolio data found in JSON file");
        }

        // JSON file already has the correct structure, no need to adapt
        const portfolio = data as EnhancedPortfolio;

        // Update cache
        this.cache = portfolio;
        this.cacheTimestamp = now;

        return portfolio;
      } catch (jsonError) {
        console.error("Both API and JSON fallback failed:", jsonError);
        throw new Error("Failed to load portfolio from both API and JSON file");
      }
    }
  }

  // CRUD Operations
  async getPortfolio(): Promise<EnhancedPortfolio> {
    return this.loadPortfolio();
  }

  async updatePortfolio(portfolio: EnhancedPortfolio): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio),
    });
    if (!response.ok) throw new Error("Failed to update portfolio");
    this.clearCache();
  }

  async updateProfile(updates: Partial<Profile>): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: {
          update: updates,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update profile");
    this.clearCache(); // Invalidate cache after update
  }

  async updateExperience(
    index: number,
    updates: Partial<Experience>
  ): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experience: {
          updateMany: {
            where: { id: index },
            data: updates,
          },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update experience");
    this.clearCache();
  }

  async addExperience(experience: Experience): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experience: { create: experience } }),
    });
    if (!response.ok) throw new Error("Failed to add experience");
    this.clearCache();
  }

  async removeExperience(index: number): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experience: { deleteMany: { id: index } } }),
    });
    if (!response.ok) throw new Error("Failed to remove experience");
    this.clearCache();
  }

  async updateProject(index: number, updates: Partial<Project>): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: {
          updateMany: {
            where: { id: index },
            data: updates,
          },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update project");
    this.clearCache();
  }

  async addProject(project: Project): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: { create: project } }),
    });
    if (!response.ok) throw new Error("Failed to add project");
    this.clearCache();
  }

  async removeProject(index: number): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: { deleteMany: { id: index } } }),
    });
    if (!response.ok) throw new Error("Failed to remove project");
    this.clearCache();
  }

  async updateSkills(skills: Skill[]): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: { set: skills } }),
    });
    if (!response.ok) throw new Error("Failed to update skills");
    this.clearCache();
  }

  async updateTools(tools: Tool[]): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${this.API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tools: { set: tools } }),
    });
    if (!response.ok) throw new Error("Failed update tools");
    this.clearCache();
  }

  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
    this.portfolioId = null;
  }
}

export const portfolioService = PortfolioService.getInstance();
