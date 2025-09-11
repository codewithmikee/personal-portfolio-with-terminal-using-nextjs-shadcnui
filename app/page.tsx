"use client"

import { useNavigationMode } from "@/lib/hooks/use-navigation-mode"
import { PortfolioUI } from "@/components/portfolio-ui"
import { TerminalSimulator } from "@/components/terminal-simulator"
import { ModeToggle } from "@/components/mode-toggle"

export default function HomePage() {
  const { mode } = useNavigationMode()

  return (
    <div className="min-h-screen bg-background">
      <ModeToggle />
      {mode === "ui" ? <PortfolioUI /> : <TerminalSimulator />}
    </div>
  )
}
