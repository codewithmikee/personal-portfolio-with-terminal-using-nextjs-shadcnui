/**
 * Data manager component for portfolio data
 * Handles data export, import, and reset functionality
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";
import {
  Download,
  Upload,
  Database,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import type { EnhancedPortfolio } from "@/types/portfolio";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function DataManager() {
  const {
    portfolio: data,
    exportJSON,
    importJSON,
    resetToDefault,
  } = usePortfolioData();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Create export data with metadata
      if (!data) {
        throw new Error("No data available to export");
      }

      const jsonData = exportJSON();
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `portfolio-data-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      showAlert("success", "Portfolio data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      showAlert("error", "Failed to export data. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const importFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);

        // Basic validation
        // Basic shape validation for EnhancedPortfolio
        if (!jsonData.profile || !jsonData.projects || !jsonData.experience) {
          throw new Error("Invalid portfolio data structure");
        }

        // Data is automatically updated via importJSON
        showAlert("success", "Portfolio data imported successfully!");
      } catch (error) {
        console.error("Import failed:", error);
        showAlert(
          "error",
          "Invalid JSON file or data structure. Please check the file format."
        );
      } finally {
        setIsImporting(false);
        // Reset file input
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  };

  const resetData = () => {
    if (
      confirm(
        "Are you sure you want to reset all data to default? This action cannot be undone."
      )
    ) {
      resetToDefault();
      showAlert("success", "Data reset to default values!");
    }
  };

  const getDataStats = () => {
    if (!data) return { projects: 0, experience: 0, skills: 0 };

    const projectsCount = data.projects?.length || 0;
    const experienceCount = data.experience?.length || 0;
    const skillsCount = data.skills?.length || 0;
    const dataSize = new Blob([JSON.stringify(data)]).size;

    return {
      projects: projectsCount,
      experience: experienceCount,
      skills: skillsCount,
      size: `${(dataSize / 1024).toFixed(2)} KB`,
    };
  };

  const stats = getDataStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {alert && (
            <Alert
              className={
                alert.type === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }
            >
              {alert.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={
                  alert.type === "success" ? "text-green-800" : "text-red-800"
                }
              >
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {stats.projects}
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {stats.experience}
              </div>
              <div className="text-sm text-muted-foreground">Experience</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {stats.skills}
              </div>
              <div className="text-sm text-muted-foreground">Skills</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {stats.size}
              </div>
              <div className="text-sm text-muted-foreground">Data Size</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>

            <Button asChild className="flex-1">
              <label htmlFor="import-json" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                {isImporting ? "Importing..." : "Import Data"}
                <input
                  id="import-json"
                  type="file"
                  accept=".json"
                  onChange={importFromJSON}
                  className="hidden"
                />
              </label>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline" onClick={resetData} className="w-full">
              Reset to Default Data
            </Button>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              <strong>Export:</strong> Download current data as JSON file
            </p>
            <p>
              <strong>Import:</strong> Upload JSON file to replace current data
            </p>
            <p>
              <strong>Reset:</strong> Restore original sample data
            </p>
            <p>
              <strong>Note:</strong> Changes are automatically saved to
              localStorage
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
