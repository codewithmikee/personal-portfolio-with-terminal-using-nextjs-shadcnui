"use client";
import { Button } from "@workspace/ui/components/button";
import { Edit } from "lucide-react";
import { CVPreview } from "@/components/admin-components/cv-builder/cv-preview";
import type { Portfolio } from "@/types/portfolio";

interface PreviewViewProps {
  portfolio: Portfolio;
  onEdit: () => void;
}

export function PreviewView({ portfolio, onEdit }: PreviewViewProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Resume Preview</h2>
            <p className="text-muted-foreground">
              Full preview of your professional resume
            </p>
          </div>
          <Button onClick={onEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Resume
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <CVPreview portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}
