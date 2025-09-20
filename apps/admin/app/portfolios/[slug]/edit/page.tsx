// app/portfolios/[slug]/edit/page.tsx - Portfolio Edit Page
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  ArrowLeft,
  Save,
  Eye,
  Settings,
  User,
  Briefcase,
  Award,
  Code,
  Database,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PortfolioEditWrapper } from "@/components/admin/portfolio-edit-wrapper";
import { PortfolioEditProvider } from "@/providers/portfolio-edit-provider";
import type { EnhancedPortfolio } from "@/types/portfolio";

export default function PortfolioEditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);

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

  const handleSave = async () => {
    if (!portfolio) return;

    try {
      setIsSaving(true);

      // Clean the portfolio data by removing all id fields and timestamps
      const cleanPortfolioData = (data: any): any => {
        if (Array.isArray(data)) {
          return data.map(cleanPortfolioData);
        }
        if (data && typeof data === "object") {
          const cleaned: any = {};
          for (const [key, value] of Object.entries(data)) {
            // Skip id fields and timestamps
            if (
              key === "id" ||
              key === "createdAt" ||
              key === "updatedAt" ||
              key === "portfolioId" ||
              key === "profileId" ||
              key === "contactId"
            ) {
              continue;
            }
            cleaned[key] = cleanPortfolioData(value);
          }
          return cleaned;
        }
        return data;
      };

      const portfolioData = cleanPortfolioData(portfolio);

      const response = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        throw new Error("Failed to save portfolio");
      }

      const updatedPortfolio = await response.json();
      setPortfolio(updatedPortfolio);
      toast.success("Portfolio saved successfully");
    } catch (error) {
      console.error("Error saving portfolio:", error);
      toast.error("Failed to save portfolio");
    } finally {
      setIsSaving(false);
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
    <PortfolioEditProvider initialPortfolio={portfolio}>
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
                  <h1 className="text-2xl font-bold">Edit Portfolio</h1>
                  <p className="text-muted-foreground">
                    {portfolio.profile.full_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>

                <Button onClick={handleSave} disabled={isSaving} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <PortfolioEditWrapper
            onSave={handleSave}
            isSaving={isSaving}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </PortfolioEditProvider>
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
