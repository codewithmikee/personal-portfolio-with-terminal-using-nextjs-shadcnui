// hooks/use-portfolio-actions.ts
import { usePortfolioData } from "./use-portfolio-data"

/**
 * Hook that provides only CRUD operations
 * Use this in admin/management components
 */
export function usePortfolioActions() {
	const {
		updateProfile,
		addExperience,
		updateExperience,
		removeExperience,
		addProject,
		updateProject,
		removeProject,
		updateSkills,
		updateTools,
		exportJSON,
		importJSON,
		resetToDefault,
	} = usePortfolioData()

	return {
		updateProfile,
		addExperience,
		updateExperience,
		removeExperience,
		addProject,
		updateProject,
		removeProject,
		updateSkills,
		updateTools,
		exportJSON,
		importJSON,
		resetToDefault,
	}
}
