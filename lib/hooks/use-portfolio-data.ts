"use client";

import { useEffect } from "react";
import { usePortfolioContext } from "./use-portfolio-context";

export function usePortfolioData() {
  const { data, isLoading, error, loadData } = usePortfolioContext();

  useEffect(() => {
    if (!data && !isLoading) {
      loadData();
    }
  }, [data, isLoading, loadData]);

  return { data, isLoading, error };
}
