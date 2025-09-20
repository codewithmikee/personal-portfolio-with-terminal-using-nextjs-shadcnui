"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import type React from "react";

import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Upload, FileText, Plus, Edit } from "lucide-react";
import { useState } from "react";
import type { Portfolio } from "@/types/portfolio";

interface HomeViewProps {
  onImport: (data: Portfolio) => void;
  onStartNew: () => void;
  onEdit: () => void;
}

export function HomeView({ onImport, onStartNew, onEdit }: HomeViewProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          onImport(data);
          setError("");
        } catch (err) {
          setError("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasteImport = () => {
    try {
      const data = JSON.parse(jsonInput);
      onImport(data);
      setJsonInput("");
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-balance">
            Welcome to CV Builder
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Create a professional resume with our easy-to-use builder. Start
            from scratch or import existing data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start New CV */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Start New CV
              </CardTitle>
              <CardDescription>
                Begin with a blank template and build your resume from scratch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={onStartNew} className="w-full" size="lg">
                Create New Resume
              </Button>
              <Button
                onClick={onEdit}
                variant="outline"
                className="w-full bg-transparent"
              >
                Continue Editing Current
              </Button>
            </CardContent>
          </Card>

          {/* Import from JSON */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import Resume Data
              </CardTitle>
              <CardDescription>
                Upload a JSON file or paste your resume data to continue editing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload JSON File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="json-paste">Or Paste JSON Data</Label>
                <Textarea
                  id="json-paste"
                  placeholder="Paste your JSON resume data here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={handlePasteImport}
                  disabled={!jsonInput.trim()}
                  className="w-full"
                >
                  Import Data
                </Button>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Live Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    See changes in real-time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Edit className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Easy Editing</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive form interface
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Upload className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Import/Export</h3>
                  <p className="text-sm text-muted-foreground">
                    JSON data portability
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
