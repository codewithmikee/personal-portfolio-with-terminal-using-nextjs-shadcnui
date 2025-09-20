"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { usePortfolioContext } from "@/providers/portfolio-provider";

export function Skills() {
  const { portfolio: data, isLoading: loading } = usePortfolioContext();

  if (loading || !data) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-12 w-1/3 mx-auto"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded mb-4"></div>
                    <div className="space-y-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j}>
                          <div className="h-4 bg-muted rounded mb-2"></div>
                          <div className="h-2 bg-muted rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { techStacks = [], skills = [], tools = [] } = data;

  // Debug logging
  console.log("Skills component data:", {
    techStacks: techStacks.length,
    skills: skills.length,
    tools: tools.length,
    techStacksSample: techStacks.slice(0, 3),
  });

  const skillCategories = {
    frontend: techStacks.filter((tech) => tech.type === "Frontend"),
    backend: techStacks.filter((tech) => tech.type === "Backend"),
    mobile: techStacks.filter((tech) => tech.type === "Mobile"),
    fullstack: techStacks.filter((tech) => tech.type === "Fullstack"),
  };

  console.log("Skill categories:", skillCategories);

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    mobile: "Mobile",
    fullstack: "Full Stack",
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillCategories).map(
              ([category, categorySkills]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {categoryTitles[category as keyof typeof categoryTitles]}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {categorySkills.map((tech) => {
                      const levelValue =
                        tech.level === "Expert"
                          ? 100
                          : tech.level === "Advanced"
                          ? 80
                          : tech.level === "Intermediate"
                          ? 60
                          : 40;
                      return (
                        <div key={tech.key || tech.title}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">
                              {tech.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tech.level}
                            </span>
                          </div>
                          <Progress value={levelValue} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
