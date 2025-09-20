"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Textarea } from "@workspace/ui/components/textarea";
import { Input } from "@workspace/ui/components/input";
import { Upload, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { EnhancedPortfolio } from "@/types/portfolio";
interface ImportCardProps {
  onImport: (portfolio: EnhancedPortfolio) => void;
  onCreateNew: () => void;
}

export function ImportCard({ onImport, onCreateNew }: ImportCardProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const portfolio = JSON.parse(content);
          onImport(portfolio);
        } catch (err) {
          setError("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handlePasteImport = () => {
    try {
      const portfolio = JSON.parse(jsonInput);
      onImport(portfolio);
      setJsonInput("");
      setError("");
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <Card className="border-dashed border-2 hover:border-emerald-300 transition-colors">
      <CardHeader className="text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mx-auto mb-2">
          <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardTitle>Import or Create</CardTitle>
        <CardDescription>
          Upload a JSON file, paste JSON data, or start from scratch
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Or paste your JSON data here..."
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="min-h-[100px]"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            onClick={handlePasteImport}
            disabled={!jsonInput.trim()}
            className="w-full bg-transparent"
            variant="outline"
          >
            <FileText className="w-4 h-4 mr-2" />
            Import from JSON
          </Button>
        </div>

        <div className="pt-2 border-t">
          <Button onClick={onCreateNew} className="w-full" variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Start from Scratch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
