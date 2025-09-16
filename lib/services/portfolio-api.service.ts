import type {
  EnhancedPortfolio,
  Profile,
  Experience,
  Project,
  Skill,
  Tool,
} from "@/types/portfolio";

const API_BASE = "/api/portfolios";

export class PortfolioApiService {
  private portfolioId: string | null = null;

  async getPortfolioId(): Promise<string> {
    if (this.portfolioId) return this.portfolioId;

    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch portfolios");
    const portfolios = await response.json();
    if (!Array.isArray(portfolios) || portfolios.length === 0) {
      throw new Error("No portfolios found");
    }
    const id = portfolios[0].id;
    if (!id) throw new Error("Portfolio ID not found");
    this.portfolioId = id as string;
    return this.portfolioId;
  }

  async updateProfile(updates: Partial<Profile>): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile: {
          update: updates,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update profile");
  }

  async updateExperience(
    index: number,
    updates: Partial<Experience>
  ): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experience: {
          update: {
            where: { id: index },
            data: updates,
          },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update experience");
  }

  async addExperience(experience: Experience): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experience: {
          create: experience,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to add experience");
  }

  async removeExperience(index: number): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experience: {
          delete: { id: index },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to remove experience");
  }

  async updateProject(index: number, updates: Partial<Project>): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: {
          update: {
            where: { id: index },
            data: updates,
          },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update project");
  }

  async addProject(project: Project): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: {
          create: project,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to add project");
  }

  async removeProject(index: number): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projects: {
          delete: { id: index },
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to remove project");
  }

  async updateSkills(skills: Skill[]): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: {
          set: skills,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update skills");
  }

  async updateTools(tools: Tool[]): Promise<void> {
    const id = await this.getPortfolioId();
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tools: {
          set: tools,
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to update tools");
  }
}

export const portfolioApiService = new PortfolioApiService();
