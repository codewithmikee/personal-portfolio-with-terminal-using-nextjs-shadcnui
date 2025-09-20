// Static portfolio service for static deployments
import type { EnhancedPortfolio } from "../types/portfolio";

export class StaticPortfolioService {
  private static instance: StaticPortfolioService;
  private cache: EnhancedPortfolio | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): StaticPortfolioService {
    if (!StaticPortfolioService.instance) {
      StaticPortfolioService.instance = new StaticPortfolioService();
    }
    return StaticPortfolioService.instance;
  }

  async loadPortfolio(): Promise<EnhancedPortfolio> {
    // Check cache first
    const now = Date.now();
    if (this.cache && now - this.cacheTimestamp < this.CACHE_TTL) {
      return this.cache;
    }

    try {
      // Load from JSON file
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
    } catch (error) {
      console.error("Failed to load portfolio from JSON file:", error);
      throw new Error("Failed to load portfolio from JSON file");
    }
  }

  clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }
}

export const staticPortfolioService = StaticPortfolioService.getInstance();
