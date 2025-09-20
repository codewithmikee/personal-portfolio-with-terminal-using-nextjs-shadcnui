"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { User, Briefcase, Code } from "lucide-react";
import type { Portfolio } from "@/types/portfolio";

interface SampleCardProps {
  portfolio: Portfolio;
  onSelect: (portfolio: Portfolio) => void;
}

export function SampleCard({ portfolio, onSelect }: SampleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg">
              {portfolio.profile.full_name}
            </CardTitle>
            <CardDescription className="text-sm">
              {portfolio.experience[0]?.role || "Professional"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {portfolio.profile.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="w-4 h-4" />
          <span>
            {portfolio.experience.length} experience
            {portfolio.experience.length !== 1 ? "s" : ""}
          </span>
          <Code className="w-4 h-4 ml-2" />
          <span>
            {portfolio.projects.length} project
            {portfolio.projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {portfolio.techStacks?.slice(0, 3).map((tech) => (
            <Badge key={tech.key} variant="secondary" className="text-xs">
              {tech.title}
            </Badge>
          ))}
          {(portfolio.techStacks?.length || 0) > 3 && (
            <Badge variant="outline" className="text-xs">
              +{(portfolio.techStacks?.length || 0) - 3} more
            </Badge>
          )}
        </div>

        <Button
          onClick={() => onSelect(portfolio)}
          className="w-full group-hover:bg-emerald-600 group-hover:text-white transition-colors"
        >
          Use This Template
        </Button>
      </CardContent>
    </Card>
  );
}
