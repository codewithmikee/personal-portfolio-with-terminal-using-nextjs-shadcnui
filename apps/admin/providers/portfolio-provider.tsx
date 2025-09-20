// components/providers/portfolio-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
import type { EnhancedPortfolio } from "@/types/portfolio"

interface PortfolioContextType {
  portfolio: EnhancedPortfolio | null
  isLoading: boolean
  error: string | null
  retry: () => void
}

const PortfolioContext = createContext<PortfolioContextType | null>(null)

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { portfolio, isLoading, error, loadPortfolio, retry } = usePortfolioData()
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      loadPortfolio()
    }
  }, [hasInitialized, loadPortfolio])

  return (
    <PortfolioContext.Provider value={{ portfolio, isLoading, error, retry }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolioContext() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error("usePortfolioContext must be used within PortfolioProvider")
  }
  return context
}
