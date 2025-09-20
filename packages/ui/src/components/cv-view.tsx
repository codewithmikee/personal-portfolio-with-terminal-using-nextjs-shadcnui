"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  FileText,
} from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useRef } from "react";
import { usePDF } from "react-to-pdf";
import type { EnhancedPortfolio } from "@workspace/shared/types/portfolio";

// ------- docs of react-to-pdf -------
// import { useRef } from 'react';
// import generatePDF from 'react-to-pdf';

// const Component = () => {
//    const targetRef = useRef();
//    return (
//       <div>
//          <button onClick={() => generatePDF(targetRef, {filename: 'page.pdf'})}>Download PDF</button>
//          <div ref={targetRef}>
//             Content to be included in the PDF
//          </div>
//       </div>
//    )
// }

interface CVViewProps {
  portfolio?: EnhancedPortfolio | null;
}

export function CVView({ portfolio }: CVViewProps) {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { toPDF } = usePDF({
    filename: portfolio
      ? `${portfolio.profile.full_name.replace(/\s+/g, "_")}_CV.pdf`
      : "CV.pdf",
    page: {
      margin: 20,
      format: "a4",
      orientation: "portrait",
    },
  });

  if (!portfolio) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading CV...</div>
      </div>
    );
  }

  const { profile, experience, projects, skills, tools, blogs } = portfolio;

  return (
    <div className="cv-view max-w-4xl mx-auto p-6" data-theme="light">
      {/* Download PDF button */}
      <div className="flex justify-end mb-6">
        <Button onClick={() => toPDF()} className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* CV Content to be included in PDF */}
      <div
        ref={pdfRef}
        className="space-y-8 bg-white p-6 rounded-lg shadow"
        id="cv-pdf-content"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{profile.full_name}</h1>
          <p className="text-xl">Senior Full-Stack Developer</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {profile.email}
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {profile.phone_number}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {profile.address}
            </div>
          </div>
        </div>

        <Separator />

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">{profile.description}</p>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Professional Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {exp.company_name}
                    </h3>
                    <p>
                      {exp.role} • {exp.job_type}
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <div>{exp.start_date}</div>
                    <div>{exp.end_date || "Present"}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  {exp.company_description}
                </p>
                {index < experience.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Key Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{project.description}</p>
                {project.features && project.features.length > 0 && (
                  <div className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm">
                        • {feature.title}: {feature.description}
                      </div>
                    ))}
                  </div>
                )}
                {index < projects.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills and Tools */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tools & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tool.title}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blogs */}
        {blogs && blogs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {blogs.map((blog, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{blog.title}</span>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
