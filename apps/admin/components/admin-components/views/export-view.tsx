"use client";
import { JSONManager } from "@/components/admin-components/cv-builder/json-manager";
import { PDFDownload } from "@/components/admin-components/pdf-download";
import { CVPreview } from "@/components/admin-components/cv-builder/cv-preview";
import type { Portfolio } from "@/types/portfolio";

interface ExportViewProps {
  portfolio: Portfolio;
  onExport: () => string;
  onImport: (portfolio: Portfolio) => void;
}

export function ExportView({ portfolio, onExport, onImport }: ExportViewProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold">Export & Download</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Export your resume data or download your completed resume as PDF
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Download PDF</h3>
              <PDFDownload
                filename={`${portfolio.profile.full_name.replace(
                  /\s+/g,
                  "_"
                )}_Resume.pdf`}
              >
                <CVPreview portfolio={portfolio} />
              </PDFDownload>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">JSON Data</h3>
              <JSONManager onExport={onExport} onImport={onImport} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
