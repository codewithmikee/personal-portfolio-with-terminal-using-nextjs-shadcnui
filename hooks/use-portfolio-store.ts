// hooks/use-portfolio-store.ts
import { usePortfolioStore as useStore } from "@/lib/stores/portfolio.store"

/**
 * Direct access to store - use sparingly
 * @deprecated Use usePortfolioData() or usePortfolioContext() instead
 */
export function usePortfolioStore() {
	return useStore()
}

/**
 * Read-only access to portfolio data
 * Use this in display components
 */
export function usePortfolioData() {
	return useStore(state => ({
		portfolio: state.portfolio,
		isLoading: state.isLoading,
		error: state.error,
	}))
}

// Re-export the enhanced hook
export { usePortfolioData as usePortfolioDataWithActions } from "./use-portfolio-data"
