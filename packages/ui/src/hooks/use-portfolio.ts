"use client";

import { useState, useEffect } from "react";
import { dataLoader } from "@workspace/shared/services/data-loader";
import type { EnhancedPortfolio } from "@workspace/shared/types/portfolio";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        console.log("usePortfolio: Starting to load portfolio...");
        setIsLoading(true);
        setError(null);
        const data = await dataLoader.loadPortfolio();
        console.log("usePortfolio: Portfolio loaded successfully:", data);
        setPortfolio(data);
      } catch (err) {
        console.error("usePortfolio: Error loading portfolio:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load portfolio"
        );
      } finally {
        console.log("usePortfolio: Setting loading to false");
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const retry = async () => {
    dataLoader.clearCache();
    try {
      setIsLoading(true);
      setError(null);
      const data = await dataLoader.loadPortfolio();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load portfolio");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    portfolio,
    isLoading,
    error,
    retry,
  };
}
