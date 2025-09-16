import { usePortfolioStore as useStore } from "@/lib/stores/portfolio.store";

/**
 * Hook that provides access to the portfolio store
 * Data loading should be handled at the app level
 */
export function usePortfolioStore() {
  return useStore();
}

/**
 * Hook for components that only need to read portfolio data
 * Doesn't trigger data loading - assumes data is already available
 */
export function usePortfolioData() {
  return useStore((state) => ({
    portfolio: state.portfolio,
    isLoading: state.isLoading,
    error: state.error,
  }));
}

/**
 * Hook for components that need to modify portfolio data
 * Includes all CRUD operations
 */
export function usePortfolioActions() {
  return useStore((state) => ({
    updateProfile: state.updateProfile,
    updateExperience: state.updateExperience,
    addExperience: state.addExperience,
    removeExperience: state.removeExperience,
    updateProject: state.updateProject,
    addProject: state.addProject,
    removeProject: state.removeProject,
    updateSkills: state.updateSkills,
    updateTools: state.updateTools,
    exportJSON: state.exportJSON,
    importJSON: state.importJSON,
    resetToDefault: state.resetToDefault,
  }));
}
