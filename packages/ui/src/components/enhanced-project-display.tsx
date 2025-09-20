import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { ExternalLink, Github, Calendar, Code } from "lucide-react";
import IconRenderer from "./icon-renderer";
import { cn } from "../lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  github_link?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  features?: Array<{
    title: string;
    description: string;
  }>;
  techStacks?: Array<{
    title: string;
    icon?: string;
    color?: string;
  }>;
}

interface EnhancedProjectDisplayProps {
  projects: Project[];
  filterByTechStack?: string;
  filterByType?: string;
  searchTerm?: string;
  maxItems?: number;
  showFeatures?: boolean;
  className?: string;
  isLoading?: boolean;
}

const EnhancedProjectDisplay: React.FC<EnhancedProjectDisplayProps> = ({
  projects,
  filterByTechStack,
  filterByType,
  searchTerm,
  maxItems,
  showFeatures = true,
  className = "",
  isLoading = false,
}) => {
  const filterProjects = (projects: Project[], filters: any) => {
    return projects.filter((project) => {
      // Tech stack filter
      if (filters.techStack) {
        const hasTechStack = project.techStacks?.some((tech) =>
          tech.title.toLowerCase().includes(filters.techStack.toLowerCase())
        );
        if (!hasTechStack) return false;
      }

      // Type filter
      if (filters.type && project.type !== filters.type) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.techStacks?.some((tech) =>
            tech.title.toLowerCase().includes(searchLower)
          );
        if (!matchesSearch) return false;
      }

      return true;
    });
  };

  const filteredProjects = filterProjects(projects, {
    techStack: filterByTechStack,
    type: filterByType,
    searchTerm,
  });

  const displayProjects = maxItems
    ? filteredProjects.slice(0, maxItems)
    : filteredProjects;

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (displayProjects.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No projects found
        </h3>
        <p className="text-sm text-muted-foreground">
          {searchTerm || filterByTechStack || filterByType
            ? "Try adjusting your filters"
            : "No projects available"}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {displayProjects.map((project) => (
        <Card
          key={project.id}
          className="group hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {project.start_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {project.start_date}
                        {project.end_date && ` - ${project.end_date}`}
                      </span>
                    </div>
                  )}
                  {project.type && (
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {project.github_link && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.link && (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {showFeatures &&
              project.features &&
              project.features.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • <span className="font-medium">{feature.title}</span>:{" "}
                        {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {project.techStacks && project.techStacks.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStacks.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm"
                    >
                      {tech.icon && (
                        <IconRenderer
                          name={tech.icon}
                          className="h-4 w-4"
                          style={{ color: tech.color }}
                        />
                      )}
                      <span>{tech.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { EnhancedProjectDisplay };
