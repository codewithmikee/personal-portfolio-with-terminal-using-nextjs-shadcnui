"use client";

import { usePortfolioContext } from "@/providers/portfolio-provider";
import { usePortfolioConverter } from "@/hooks/use-portfolio-converter";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Download,
  FileText,
  Database,
  FileDown,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export function PortfolioExportDemo() {
  const { portfolio } = usePortfolioContext();
  const {
    toJSON,
    toMarkdown,
    toCSV,
    toSummary,
    downloadAsJSON,
    downloadAsMarkdown,
    downloadAsCSV,
    downloadAsSummary,
    isAvailable,
  } = usePortfolioConverter(portfolio);

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isAvailable || !portfolio) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Portfolio data not available for export.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleCopy = async (content: string, format: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const exportOptions = [
    {
      name: "JSON",
      icon: Database,
      description: "Structured data format",
      getContent: toJSON,
      download: downloadAsJSON,
      color: "bg-blue-500",
    },
    {
      name: "Markdown",
      icon: FileText,
      description: "Human-readable format",
      getContent: toMarkdown,
      download: downloadAsMarkdown,
      color: "bg-green-500",
    },
    {
      name: "CSV",
      icon: FileDown,
      description: "Spreadsheet format",
      getContent: toCSV,
      download: downloadAsCSV,
      color: "bg-orange-500",
    },
    {
      name: "Summary",
      icon: FileText,
      description: "Brief overview",
      getContent: toSummary,
      download: downloadAsSummary,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Portfolio Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Export your portfolio data in various formats for different use
            cases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportOptions.map((option) => {
              const Icon = option.icon;
              const content = option.getContent();
              const isCopied = copiedFormat === option.name;

              return (
                <Card key={option.name} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${option.color} text-white`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        onClick={() => option.download()}
                        size="sm"
                        className="w-full"
                        variant="default"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>

                      <Button
                        onClick={() => handleCopy(content, option.name)}
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      {content.length.toLocaleString()} characters
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              {exportOptions.map((option) => (
                <Badge
                  key={option.name}
                  variant="outline"
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => {
                    const content = option.getContent();
                    const preview =
                      content.substring(0, 500) +
                      (content.length > 500 ? "..." : "");
                    console.log(`${option.name} Preview:`, preview);
                  }}
                >
                  {option.name}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              Click on a format badge above to see a preview in the console, or
              use the download/copy buttons to get the full content.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
