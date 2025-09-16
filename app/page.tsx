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
import { usePortfolioData } from "@/lib/hooks/use-portfolio-data";
import { PortfolioUI } from "@/components/portfolio-ui";
import { TerminalSimulator } from "@/components/terminal-simulator";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  const { mode } = useNavigationMode();
  const { isLoading } = usePortfolioData();

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-background">
      <ModeToggle />
      {mode === "ui" ? <PortfolioUI /> : <TerminalSimulator />}
    </div>
  );
}
