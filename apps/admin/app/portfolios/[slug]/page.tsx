// app/portfolios/[slug]/page.tsx - Portfolio Preview Page
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Briefcase,
  Code,
  Award,
  FileText,
  Download,
  Eye,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PortfolioDisplay } from "../../../../../packages/ui/src/components/portfolio-display";
import type { EnhancedPortfolio } from "@/types/portfolio";

export default function PortfolioPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<
    "preview" | "web" | "cv" | "terminal"
  >("preview");

  useEffect(() => {
    if (slug) {
      loadPortfolio();
    }
  }, [slug]);

  const loadPortfolio = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/portfolios?externalId=${slug}`);
      if (!response.ok) {
        throw new Error("Portfolio not found");
      }

      const data = await response.json();
      const portfolioData = Array.isArray(data) ? data[0] : data;

      if (!portfolioData) {
        throw new Error("Portfolio not found");
      }

      setPortfolio(portfolioData);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load portfolio"
      );
      toast.error("Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !portfolio) {
    return (
      <ErrorScreen
        error={error || "Portfolio not found"}
        onRetry={loadPortfolio}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {portfolio.profile.full_name}
                </h1>
                <p className="text-muted-foreground">Portfolio Preview</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "preview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("preview")}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  variant={viewMode === "web" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("web")}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Web
                </Button>
                <Button
                  variant={viewMode === "cv" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cv")}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  CV
                </Button>
                <Button
                  variant={viewMode === "terminal" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("terminal")}
                >
                  <Code className="w-4 h-4 mr-1" />
                  Terminal
                </Button>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <Button asChild>
                <Link href={`/portfolios/${slug}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === "preview" ? (
          <PortfolioPreviewContent portfolio={portfolio} />
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <PortfolioDisplay
              portfolio={portfolio}
              isLoading={false}
              error={null}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioPreviewContent({
  portfolio,
}: {
  portfolio: EnhancedPortfolio;
}) {
  const { profile, projects, experience, skills, tools, blogs } = portfolio;

  return (
    <div className="space-y-8">
      {/* Profile Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{profile.full_name}</h3>
                <p className="text-muted-foreground">{profile.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {profile.phone_number}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {profile.address}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{experience.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Experience
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{skills.length}</div>
                  <div className="text-sm text-muted-foreground">Skills</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{tools.length}</div>
                  <div className="text-sm text-muted-foreground">Tools</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Projects ({projects.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
            {projects.length > 3 && (
              <div className="text-center text-sm text-muted-foreground">
                +{projects.length - 3} more projects
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Experience Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Experience ({experience.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experience.slice(0, 3).map((exp, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium">
                    {exp.role} at {exp.company_name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.company_description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{exp.job_type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {exp.start_date} - {exp.end_date || "Present"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {experience.length > 3 && (
              <div className="text-center text-sm text-muted-foreground">
                +{experience.length - 3} more positions
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Skills & Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">
                Technical Skills ({skills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 8).map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill.title}
                  </Badge>
                ))}
                {skills.length > 8 && (
                  <Badge variant="outline">+{skills.length - 8} more</Badge>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                Tools & Technologies ({tools.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {tools.slice(0, 8).map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool.title}
                  </Badge>
                ))}
                {tools.length > 8 && (
                  <Badge variant="outline">+{tools.length - 8} more</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
        <div className="h-8 bg-muted rounded mb-4 w-64"></div>
        <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}

function ErrorScreen({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Error Loading Portfolio
        </h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={onRetry}>Retry</Button>
      </div>
    </div>
  );
}
