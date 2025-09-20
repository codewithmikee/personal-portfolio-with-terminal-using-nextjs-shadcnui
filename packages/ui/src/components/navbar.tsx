"use client";

import { Button } from "@workspace/ui/components/button";
import { useNavigationMode } from "@workspace/ui/hooks/use-navigation-mode";
import { Layout, FileText, Terminal } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import type { EnhancedPortfolio } from "@workspace/shared/types/portfolio";

interface NavbarProps {
  portfolio?: EnhancedPortfolio | null;
}

export function Navbar({ portfolio }: NavbarProps) {
  const { mode, setMode } = useNavigationMode();

  const profileName = portfolio?.profile?.full_name || "Portfolio";
  const displayTitle = portfolio ? `${profileName} - Portfolio` : "Portfolio";

  const viewModes = [
    { key: "web", label: "Web", icon: Layout },
    { key: "cv", label: "CV", icon: FileText },
    { key: "terminal", label: "Terminal", icon: Terminal },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Profile name */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground">
              {displayTitle}
            </h1>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-2">
            {/* View mode toggles */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {viewModes.map(({ key, label, icon: Icon }) => (
                <Button
                  key={key}
                  variant={mode === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode(key)}
                  className={cn(
                    "h-8 px-3 text-sm font-medium transition-all",
                    mode === key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    // Mobile responsive sizing
                    "md:px-3 md:text-sm md:h-8",
                    "sm:px-2 sm:text-xs sm:h-7",
                    "px-1.5 text-xs h-6"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-all",
                      "md:h-4 md:w-4 md:mr-1.5",
                      "sm:h-3.5 sm:w-3.5 sm:mr-1",
                      "h-3 w-3 mr-0.5"
                    )}
                  />
                  <span
                    className={cn(
                      "transition-all",
                      "md:inline",
                      "sm:inline",
                      "hidden" // Hide text on very small screens, show only icons
                    )}
                  >
                    {label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
