"use client";
import { useState, useEffect } from "react";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";
import { SampleCard } from "@/components/admin-components/sample-card";
import { ImportCard } from "@/components/admin-components/import-card";
import { CVPreview } from "@/components/admin-components/cv-builder/cv-preview";
import { EditView } from "@/components/admin-components/views/edit-view";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, Edit, Eye, Save } from "lucide-react";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { PDFDownload } from "@/components/admin-components/pdf-download";
import type { EnhancedPortfolio as Portfolio } from "@/types/portfolio";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

// Sample portfolio data removed - now using database

type ViewType = "home" | "preview" | "edit";

export default function CVBuilder() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const {
    portfolio,
    isLoading,
    error,
    loadPortfolio,
    updateProfile,
    updateExperience,
    addExperience,
    removeExperience,
    updateProject,
    addProject,
    removeProject,
    updateSkills,
    updateTools,
    exportJSON,
    importJSON,
    resetToDefault,
  } = usePortfolioData();

  // Load portfolio data on component mount
  useEffect(() => {
    if (!portfolio && !isLoading) {
      loadPortfolio();
    }
  }, [portfolio, isLoading, loadPortfolio]);

  // Sample portfolios removed - now using database
  const samplePortfolios: Portfolio[] = [];

  const handleSample = (selectedPortfolio: Portfolio) => {
    importJSON(JSON.stringify(selectedPortfolio));
    setCurrentView("preview");
  };

  const handleImport = (data: Portfolio) => {
    importJSON(JSON.stringify(data));
    setCurrentView("preview");
  };

  const handleCreateNew = () => {
    resetToDefault();
    setCurrentView("edit");
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    console.log("Resume saved!");
  };

  const handleDiscard = () => {
    setHasUnsavedChanges(false);
    console.log("Changes discarded!");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setHasUnsavedChanges(false);
  };

  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-balance">CV Builder</h1>
              <p className="text-muted-foreground mt-2">
                Create professional resumes with ease
              </p>
            </div>
            <ThemeToggle />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">Error: {error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPortfolio()}
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ImportCard onImport={handleImport} onCreateNew={handleCreateNew} />

            {samplePortfolios.map((sample, index) => (
              <SampleCard
                key={index}
                portfolio={sample}
                onSelect={handleSample}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "preview") {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading portfolio...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Error: {error}
            </p>
            <Button onClick={() => loadPortfolio()}>Retry</Button>
          </div>
        </div>
      );
    }

    if (!portfolio) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              No portfolio data found
            </p>
            <Button onClick={() => loadPortfolio()}>Load Portfolio</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button onClick={() => setCurrentView("edit")}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {/* <PDFDownload portfolio={portfolio} /> */}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <CVPreview portfolio={portfolio} />
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "edit") {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading portfolio...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Error: {error}
            </p>
            <Button onClick={() => loadPortfolio()}>Retry</Button>
          </div>
        </div>
      );
    }

    if (!portfolio) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              No portfolio data found
            </p>
            <Button onClick={() => loadPortfolio()}>Load Portfolio</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => setCurrentView("preview")}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <EditView
            portfolio={portfolio}
            updateProfile={updateProfile}
            updateExperience={updateExperience}
            addExperience={addExperience}
            removeExperience={removeExperience}
            updateProject={updateProject}
            addProject={addProject}
            removeProject={removeProject}
            updateSkills={updateSkills}
            updateTools={updateTools}
            onPreview={() => setCurrentView("preview")}
            onSave={handleSave}
            onDiscard={handleDiscard}
          />
        </div>
      </div>
    );
  }

  return null;
}
