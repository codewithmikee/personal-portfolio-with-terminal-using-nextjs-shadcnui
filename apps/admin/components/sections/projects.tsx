"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Github, ExternalLink } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import Image from "next/image";

export function Projects() {
  const { portfolio: data, isLoading: loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-12 w-1/3 mx-auto"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg">
                    <div className="h-48 bg-muted rounded-t-lg"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </div>
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

  const { projects } = data;
  const featuredProjects = projects; // All projects are featured in enhanced structure

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/placeholder.svg?height=250&width=400&query=${project.title} project interface`}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features
                      .flatMap((feature) => feature.techStacks)
                      .slice(0, 3)
                      .map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech.title}
                        </Badge>
                      ))}
                    {project.features.flatMap((feature) => feature.techStacks)
                      .length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +
                        {project.features.flatMap(
                          (feature) => feature.techStacks
                        ).length - 3}{" "}
                        more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Projects ({projects.length})
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
