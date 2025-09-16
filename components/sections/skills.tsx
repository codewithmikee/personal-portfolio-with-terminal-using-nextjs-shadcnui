"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context";

export function Skills() {
  const { data, isLoading } = usePortfolioContext();

  if (isLoading || !data) {
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

  const { skills } = data;

  const skillCategories = {
    frontend: skills.skills.filter((skill) => skill.category === "frontend"),
    backend: skills.skills.filter((skill) => skill.category === "backend"),
    database: skills.skills.filter((skill) => skill.category === "database"),
    tools: skills.skills.filter((skill) => skill.category === "tools"),
  };

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & DevOps",
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
                    {categorySkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {skill.level}/5
                          </span>
                        </div>
                        <Progress value={skill.level * 20} className="h-2" />
                      </div>
                    ))}
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
