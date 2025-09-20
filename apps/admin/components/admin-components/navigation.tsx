"use client";
import { Button } from "@workspace/ui/components/button";
import { Download, Edit, Eye, Home } from "lucide-react";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";

interface NavigationProps {
  currentView: "home" | "preview" | "edit" | "export";
  onViewChange: (view: "home" | "preview" | "edit" | "export") => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-balance">CV Builder</h1>
            <p className="text-sm text-muted-foreground">
              Create and customize your professional resume
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              onClick={() => onViewChange("home")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant={currentView === "preview" ? "default" : "ghost"}
              onClick={() => onViewChange("preview")}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={currentView === "edit" ? "default" : "ghost"}
              onClick={() => onViewChange("edit")}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant={currentView === "export" ? "default" : "ghost"}
              onClick={() => onViewChange("export")}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
