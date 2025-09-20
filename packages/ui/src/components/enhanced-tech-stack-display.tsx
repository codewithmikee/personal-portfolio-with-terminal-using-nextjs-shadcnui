import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import IconRenderer from "./icon-renderer";
import { cn } from "../lib/utils";

interface TechStack {
  id: string;
  title: string;
  icon?: string;
  color?: string;
  level?: string;
  type?: string;
  is_main?: boolean;
}

interface EnhancedTechStackDisplayProps {
  techStacks: TechStack[];
  showMainOnly?: boolean;
  showSideOnly?: boolean;
  filterByType?: string;
  filterByLevel?: string;
  maxItems?: number;
  className?: string;
  isLoading?: boolean;
}

const EnhancedTechStackDisplay: React.FC<EnhancedTechStackDisplayProps> = ({
  techStacks,
  showMainOnly = false,
  showSideOnly = false,
  filterByType,
  filterByLevel,
  maxItems,
  className = "",
  isLoading = false,
}) => {
  const filterTechStacks = (techStacks: TechStack[], filters: any) => {
    return techStacks.filter((tech) => {
      // Main/Side filter
      if (filters.showMainOnly && !tech.is_main) return false;
      if (filters.showSideOnly && tech.is_main) return false;

      // Type filter
      if (filters.type && tech.type !== filters.type) return false;

      // Level filter
      if (filters.level && tech.level !== filters.level) return false;

      return true;
    });
  };

  const filteredTechStacks = filterTechStacks(techStacks, {
    showMainOnly,
    showSideOnly,
    type: filterByType,
    level: filterByLevel,
  });

  const displayTechStacks = maxItems
    ? filteredTechStacks.slice(0, maxItems)
    : filteredTechStacks;

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <Card>
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded w-20"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (displayTechStacks.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <div className="h-12 w-12 mx-auto bg-muted rounded-full mb-4 flex items-center justify-center">
          <span className="text-2xl">⚙️</span>
        </div>
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No technologies found
        </h3>
        <p className="text-sm text-muted-foreground">
          {filterByType || filterByLevel
            ? "Try adjusting your filters"
            : "No technologies available"}
        </p>
      </div>
    );
  }

  // Group by type for better organization
  const groupedTechStacks = displayTechStacks.reduce(
    (acc, tech) => {
      const type = tech.type || "Other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(tech);
      return acc;
    },
    {} as Record<string, TechStack[]>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(groupedTechStacks).map(([type, techs]) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle className="text-lg capitalize">{type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {techs.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                >
                  {tech.icon && (
                    <IconRenderer
                      name={tech.icon}
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      style={{ color: tech.color }}
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{tech.title}</span>
                    {tech.level && (
                      <Badge variant="outline" className="text-xs mt-1 w-fit">
                        {tech.level}
                      </Badge>
                    )}
                  </div>
                  {tech.is_main && (
                    <Badge variant="default" className="text-xs ml-auto">
                      Main
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { EnhancedTechStackDisplay };
