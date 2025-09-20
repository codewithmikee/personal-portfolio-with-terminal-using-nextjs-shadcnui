"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import type { EnhancedPortfolio } from "@/types/portfolio";
import { Mail, Phone, MapPin, ExternalLink, Calendar } from "lucide-react";

interface CVPreviewProps {
  portfolio: EnhancedPortfolio;
}

export function CVPreview({ portfolio }: CVPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <Card
      className="h-full bg-white text-black"
      style={{
        colorScheme: "light",
        backgroundColor: "white !important",
        color: "black !important",
      }}
      data-theme="light"
    >
      <CardContent className="p-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-balance">
            {portfolio.profile.full_name}
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            {portfolio.profile.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            {portfolio.profile.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {portfolio.profile.email}
              </div>
            )}
            {portfolio.profile.phone_number && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {portfolio.profile.phone_number}
              </div>
            )}
            {portfolio.profile.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {portfolio.profile.address}
              </div>
            )}
          </div>

          {portfolio.profile.contacts.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              {portfolio.profile.contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  {contact.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Experience Section */}
        {portfolio.experience.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{exp.company_name}</h3>
                      <p className="text-primary font-medium">
                        {exp.role} • {exp.job_type}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(exp.start_date)} -{" "}
                      {exp.end_date ? formatDate(exp.end_date) : "Present"}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {exp.company_description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {portfolio.experience.length > 0 && portfolio.projects.length > 0 && (
          <Separator />
        )}

        {/* Projects Section */}
        {portfolio.projects.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="space-y-6">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {project.description}
                  </p>
                  {project.features.length > 0 && (
                    <div className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="ml-4">
                          <h4 className="text-sm font-medium">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(portfolio.skills.length > 0 || portfolio.tools.length > 0) && (
          <Separator />
        )}

        {/* Skills & Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolio.skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {portfolio.tools.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.tools.map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
