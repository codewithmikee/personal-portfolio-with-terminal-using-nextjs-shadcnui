// app/page.tsx
"use client"

// import { useNavigationMode } from "@/hooks/use-navigation-mode"
// import { PortfolioProvider, usePortfolioContext } from "@/components/providers/portfolio-provider"
import { PortfolioUI } from "@/components/portfolio-ui"
import { TerminalSimulator } from "@/components/terminal-simulator"
import { ModeToggle } from "@/components/mode-toggle"
import { useNavigationMode } from "@/lib/hooks/use-navigation-mode"
import { PortfolioProvider, usePortfolioContext } from "@/providers/portfolio-provider"

function PortfolioContent() {
  const { mode } = useNavigationMode()
  const { isLoading, error, retry } = usePortfolioContext()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={retry} />
  }

  return (
    <div className="min-h-screen bg-background">
      <ModeToggle />
      {mode === "ui" ? <PortfolioUI /> : <TerminalSimulator />}
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
        <div className="h-8 bg-muted rounded mb-4 w-64"></div>
        <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
      </div>
    </div>
  )
}

function ErrorScreen({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Error Loading Portfolio
        </h2>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  )
}
