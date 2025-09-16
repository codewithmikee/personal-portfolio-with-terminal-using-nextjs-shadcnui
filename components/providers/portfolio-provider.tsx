"use client";

import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";

interface PortfolioProviderProps {
  children: React.ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const { loadFromApi, isLoading, portfolio, error } = usePortfolioStore();
  const hasLoaded = useRef(false);

  // Load data once when the provider mounts
  useEffect(() => {
    if (!hasLoaded.current && !portfolio && !isLoading && !error) {
      hasLoaded.current = true;
      loadFromApi();
    }
  }, []); // Empty dependency array - only run once

  return <>{children}</>;
}
