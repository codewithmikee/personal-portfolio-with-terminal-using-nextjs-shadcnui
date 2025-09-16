import React from "react";
import { useProjects } from "@/lib/hooks/use-portfolio-data";
import IconRenderer from "@/components/ui/icon-renderer";
import type { ProjectType } from "@/data/schemas/portfolio";

interface EnhancedProjectDisplayProps {
  filterByTechStack?: string;
  filterByType?: ProjectType;
  searchTerm?: string;
  maxItems?: number;
  showFeatures?: boolean;
  className?: string;
}

const EnhancedProjectDisplay: React.FC<EnhancedProjectDisplayProps> = ({
  filterByTechStack,
  filterByType,
  searchTerm,
  maxItems,
  showFeatures = true,
  className = "",
}) => {
  const { projects, filterProjects } = useProjects();

  // Apply filters
  let displayProjects = projects;

  if (filterByTechStack || filterByType || searchTerm) {
    displayProjects = filterProjects({
      techStack: filterByTechStack,
      type: filterByType,
      search: searchTerm,
    });
  }

  // Limit items if specified
  if (maxItems && displayProjects.length > maxItems) {
    displayProjects = displayProjects.slice(0, maxItems);
  }

  if (displayProjects.length === 0) {
    return (
      <div className={`text-center text-muted-foreground py-8 ${className}`}>
        <p>No projects found matching the criteria.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {displayProjects.map((project, index) => (
        <div
          key={`${project.title}-${index}`}
          className="group bg-card hover:bg-card/80 rounded-lg border p-6 transition-all duration-200 hover:shadow-lg"
        >
          {/* Project Header */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Link */}
          <div className="mb-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              <IconRenderer name="external-link" size="sm" />
              View Project
            </a>
          </div>

          {/* Project Features */}
          {showFeatures && project.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Key Features
              </h4>
              <div className="space-y-3">
                {project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="space-y-2">
                    <div className="font-medium text-sm">{feature.title}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature Tech Stacks */}
                    {feature.techStacks.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {feature.techStacks.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-muted hover:bg-muted/80 rounded text-xs transition-colors"
                          >
                            <IconRenderer name={tech.key} size="xs" />
                            <span>{tech.title}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Stats */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{project.features.length} features</span>
              <span>
                {project.features.reduce(
                  (total, feature) => total + feature.techStacks.length,
                  0
                )}{" "}
                technologies
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnhancedProjectDisplay;
