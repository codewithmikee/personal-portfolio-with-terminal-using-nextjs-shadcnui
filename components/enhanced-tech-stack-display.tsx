import React from "react";
import { usePortfolioData } from "@/hooks/use-portfolio-store";
import IconRenderer from "@/components/ui/icon-renderer";
import type {
  ProjectType,
  ProgrammingLevel,
  TechStack,
} from "@/types/portfolio";

interface EnhancedTechStackDisplayProps {
  showMainOnly?: boolean;
  showSideOnly?: boolean;
  filterByType?: ProjectType;
  filterByLevel?: ProgrammingLevel;
  maxItems?: number;
  className?: string;
}

const EnhancedTechStackDisplay: React.FC<EnhancedTechStackDisplayProps> = ({
  showMainOnly = false,
  showSideOnly = false,
  filterByType,
  filterByLevel,
  maxItems,
  className = "",
}) => {
  const { portfolio, isLoading: loading } = usePortfolioData();
  const techStacks = portfolio?.techStacks || [];

  const filterTechStacks = (techStacks: any[], filters: any) => {
    return techStacks.filter((tech) => {
      if (filters.level && tech.level !== filters.level) return false;
      if (filters.priority && tech.priority !== filters.priority) return false;
      if (filters.type && tech.type !== filters.type) return false;
      if (
        filters.search &&
        !tech.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  };

  const mainTechStacks = techStacks.filter((tech) => tech.priority === "main");
  const sideTechStacks = techStacks.filter((tech) => tech.priority === "side");

  const getTechStacksByType = (techStacks: any[], type: any) =>
    techStacks.filter((tech) => tech.type === type);

  // Determine which tech stacks to display
  let displayTechStacks = techStacks;

  if (showMainOnly) {
    displayTechStacks = mainTechStacks;
  } else if (showSideOnly) {
    displayTechStacks = sideTechStacks;
  }

  // Apply filters
  if (filterByType) {
    displayTechStacks = getTechStacksByType(techStacks, filterByType);
  }

  if (filterByLevel || filterByType) {
    displayTechStacks = filterTechStacks(displayTechStacks, {
      level: filterByLevel,
      type: filterByType,
    });
  }

  // Limit items if specified
  if (maxItems && displayTechStacks.length > maxItems) {
    displayTechStacks = displayTechStacks.slice(0, maxItems);
  }

  if (displayTechStacks.length === 0) {
    return (
      <div className={`text-center text-muted-foreground py-8 ${className}`}>
        <p>No tech stacks found matching the criteria.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${className}`}
    >
      {displayTechStacks.map((tech: TechStack, index: number) => (
        <div
          key={`${tech.key}-${index}`}
          className="group bg-card hover:bg-card/80 rounded-lg border p-4 text-center transition-all duration-200 hover:shadow-md"
        >
          <div className="mb-3">
            <IconRenderer
              name={tech.key}
              size="lg"
              className="mx-auto group-hover:scale-110 transition-transform duration-200"
            />
          </div>

          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
            {tech.title}
          </h3>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  tech.level === "Expert"
                    ? "bg-red-100 text-red-800"
                    : tech.level === "Advanced"
                    ? "bg-orange-100 text-orange-800"
                    : tech.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {tech.level}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  tech.priority === "main"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {tech.priority}
              </span>
            </div>

            <div className="text-xs text-muted-foreground">{tech.type}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnhancedTechStackDisplay;
