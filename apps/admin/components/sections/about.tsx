"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
// import { usePortfolioData } from "@/hooks/use-portfolio-data";
import type { Experience } from "@/types/portfolio";
import { MapPin } from "lucide-react";

export function About() {
  const { portfolio: data, isLoading: loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-12 w-1/3 mx-auto"></div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { profile, projects, experience } = data;

  const totalProjects = projects.length;
  const yearsOfExperience =
    experience.length > 0
      ? Math.max(
          ...experience.map((exp) => {
            const start = new Date(exp.start_date);
            const end = exp.end_date ? new Date(exp.end_date) : new Date();
            return Math.floor(
              (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
            );
          })
        )
      : 0;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                {profile.description}
              </p>

              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.address}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What I Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full-stack web application development</li>
                  <li>• API design and backend architecture</li>
                  <li>• Modern frontend development with React/Next.js</li>
                  <li>• Database design and optimization</li>
                  <li>• Code review and team mentoring</li>
                </ul>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">
                      {yearsOfExperience}+ Years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Projects Completed
                    </span>
                    <span className="font-medium">{totalProjects}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary Stack</span>
                    <span className="font-medium">Laravel + Next.js</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium text-green-600">
                      Open to Work
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
