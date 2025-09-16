/**
 * Main portfolio page component
 * Renders the portfolio interface with terminal and UI modes
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { useNavigationMode } from "@/lib/hooks/use-navigation-mode";
import { usePortfolioStore } from "@/hooks/use-portfolio-store";
import { PortfolioUI } from "@/components/portfolio-ui";
import { TerminalSimulator } from "@/components/terminal-simulator";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const { mode } = useNavigationMode();
  const {
    portfolio,
    isLoading: loading,
    error,
    loadFromApi,
  } = usePortfolioStore();
  const hasLoaded = useRef(false);

  // Load data once when the component mounts
  useEffect(() => {
    if (!hasLoaded.current && !portfolio && !loading && !error) {
      hasLoaded.current = true;
      loadFromApi();
    }
  }, []); // Empty dependency array - only run once

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-muted rounded mb-4 w-64"></div>
          <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Error Loading Portfolio
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => loadFromApi()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ModeToggle />
      {mode === "ui" ? <PortfolioUI /> : <TerminalSimulator />}
    </div>
  );
}
