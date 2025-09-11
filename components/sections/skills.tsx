"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context"

export function Skills() {
  const { data } = usePortfolioContext()
  const { skills } = data

  const skillCategories = {
    frontend: skills.filter((skill) => skill.category === "frontend"),
    backend: skills.filter((skill) => skill.category === "backend"),
    database: skills.filter((skill) => skill.category === "database"),
    tools: skills.filter((skill) => skill.category === "tools"),
  }

  const categoryTitles = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & DevOps",
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-lg">{categoryTitles[category as keyof typeof categoryTitles]}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}/5</span>
                      </div>
                      <Progress value={skill.level * 20} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
