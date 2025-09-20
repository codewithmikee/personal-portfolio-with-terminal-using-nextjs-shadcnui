// Simple data loader for static portfolio display
import type { EnhancedPortfolio } from "../types/portfolio.js";

export class DataLoader {
  private static instance: DataLoader;
  private cache: EnhancedPortfolio | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  async loadPortfolio(): Promise<EnhancedPortfolio> {
    try {
      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        console.log("Server-side rendering - returning empty portfolio");
        // Server-side rendering or build time - return empty portfolio
        const emptyPortfolio: EnhancedPortfolio = {
          profile: {
            full_name: "Loading...",
            email: "",
            phone_number: "",
            address: "",
            description: "Loading portfolio data...",
            profile_picture: "",
            contacts: [],
          },
          projects: [],
          experience: [],
          skills: [],
          tools: [],
          blogs: [],
          contacts: [],
          techStacks: [],
        };
        return emptyPortfolio;
      }

      console.log("Loading portfolio from JSON file...");
      // Load from JSON file (client-side only)
      const response = await fetch("/data/portfolio.json", {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Fetch response:", response.status, response.ok);

      if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.status}`);
      }

      const data = await response.json();
      console.log("Portfolio data loaded:", data);

      if (!data) {
        throw new Error("No portfolio data found in JSON file");
      }

      // JSON file already has the correct structure, no need to adapt
      const portfolio = data as EnhancedPortfolio;

      console.log("Portfolio data loaded successfully");
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

export const dataLoader = DataLoader.getInstance();
