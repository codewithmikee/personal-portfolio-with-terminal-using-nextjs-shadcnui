"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { Download, Upload, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { Portfolio } from "@/types/portfolio";

interface JSONManagerProps {
  onExport: () => string;
  onImport: (portfolio: Portfolio) => void;
}

export function JSONManager({ onExport, onImport }: JSONManagerProps) {
  const [importText, setImportText] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    const jsonData = onExport();
    navigator.clipboard.writeText(jsonData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Exported to clipboard",
      description: "Your CV data has been copied to the clipboard as JSON.",
    });
  };

  const handleDownload = () => {
    const jsonData = onExport();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded",
      description: "Your CV data has been downloaded as cv-data.json.",
    });
  };

  const handleImport = () => {
    if (!importText.trim()) {
      toast({
        title: "Error",
        description: "Please paste JSON data to import.",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(importText) as Portfolio;
      onImport(parsed);
      setImportText("");
      toast({
        title: "Imported successfully",
        description: "Your CV data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description:
          "Invalid JSON format. Please check your data and try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Import/Export JSON
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Export Current Data</Label>
          <div className="flex gap-2">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          {/* Import Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Import Data</Label>

            <div className="space-y-2">
              <Label
                htmlFor="file-upload"
                className="text-xs text-muted-foreground"
              >
                Upload JSON file:
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="json-input"
                className="text-xs text-muted-foreground"
              >
                Or paste JSON data:
              </Label>
              <Textarea
                id="json-input"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste your JSON data here..."
                rows={8}
                className="font-mono text-xs"
              />
            </div>

            <Button onClick={handleImport} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
