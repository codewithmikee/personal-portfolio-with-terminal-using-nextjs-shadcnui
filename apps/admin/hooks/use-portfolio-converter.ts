"use client";

import { useState, useCallback } from "react";
import { PortfolioConverter } from "@/lib/utils/portfolio-converter";
import type { EnhancedPortfolio } from "@/types/portfolio";

export function usePortfolioConverter() {
  const [converter, setConverter] = useState<PortfolioConverter | null>(null);

  const initializeConverter = useCallback((portfolio: EnhancedPortfolio) => {
    const newConverter = new PortfolioConverter(portfolio);
    setConverter(newConverter);
    return newConverter;
  }, []);

  const convertToPDF = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("pdf");
    },
    [converter, initializeConverter]
  );

  const convertToWord = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("docx");
    },
    [converter, initializeConverter]
  );

  const convertToJSON = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("json");
    },
    [converter, initializeConverter]
  );

  return {
    converter,
    initializeConverter,
    convertToPDF,
    convertToWord,
    convertToJSON,
  };
}
