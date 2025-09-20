"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function Experience() {
  const { portfolio: data, isLoading: loading } = usePortfolioData();

  if (loading || !data) {
    return (
      <section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-12 w-1/3 mx-auto"></div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-6">
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
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

  const { experience } = data;

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Work Experience
          </h2>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index} className="relative">
                {index < experience.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border hidden md:block" />
                )}

                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">{exp.role}</CardTitle>
                      <p className="text-primary font-medium">
                        {exp.company_name}
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {exp.job_type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 text-pretty">
                    {exp.company_description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {new Date(exp.start_date).toLocaleDateString()} -{" "}
                      {exp.end_date
                        ? new Date(exp.end_date).toLocaleDateString()
                        : "Present"}
                    </Badge>
                  </div>

                  {exp.contacts.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.contacts.map((contact, contactIndex) => (
                        <Badge
                          key={contactIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {contact.name}
                          </a>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
