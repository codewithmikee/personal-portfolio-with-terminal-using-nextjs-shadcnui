/**
 * Portfolio Store
 * Global state management for portfolio data using Zustand
 * 
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

import { create } from "zustand";
import type { EnhancedPortfolio } from "@/types/portfolio";

interface PortfolioState {
  // Simple state management only
  portfolio: EnhancedPortfolio | null;
  isLoading: boolean;
  error: string | null;

  // Simple setters only
  setPortfolio: (portfolio: EnhancedPortfolio | null) => void;
  setLoading: (loading: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  // Initial state
  portfolio: null,
  isLoading: false,
  error: null,

  // Simple actions - no side effects
  setPortfolio: (portfolio) => set({ portfolio, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearError: () => set({ error: null }),
  reset: () => set({ portfolio: null, isLoading: false, error: null }),
}));
