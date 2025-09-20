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
      return conv.downloadAs("summary"); // Use summary as PDF alternative
    },
    [converter, initializeConverter]
  );

  const convertToWord = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("markdown"); // Use markdown as Word alternative
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

  const convertToMarkdown = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("markdown");
    },
    [converter, initializeConverter]
  );

  const convertToCSV = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("csv");
    },
    [converter, initializeConverter]
  );

  const convertToSummary = useCallback(
    async (portfolio: EnhancedPortfolio) => {
      const conv = converter || initializeConverter(portfolio);
      return conv.downloadAs("summary");
    },
    [converter, initializeConverter]
  );

  // Convenience methods that return the converter methods directly
  const toJSON = useCallback(() => {
    return converter?.toJSON();
  }, [converter]);

  const toMarkdown = useCallback(() => {
    return converter?.toMarkdown();
  }, [converter]);

  const toCSV = useCallback(() => {
    return converter?.toCSV();
  }, [converter]);

  const toSummary = useCallback(() => {
    return converter?.toSummary();
  }, [converter]);

  const downloadAsJSON = useCallback(() => {
    return converter?.downloadAs("json");
  }, [converter]);

  const downloadAsMarkdown = useCallback(() => {
    return converter?.downloadAs("markdown");
  }, [converter]);

  const downloadAsCSV = useCallback(() => {
    return converter?.downloadAs("csv");
  }, [converter]);

  const downloadAsSummary = useCallback(() => {
    return converter?.downloadAs("summary");
  }, [converter]);

  const isAvailable = converter !== null;

  return {
    converter,
    initializeConverter,
    convertToPDF,
    convertToWord,
    convertToJSON,
    convertToMarkdown,
    convertToCSV,
    convertToSummary,
    toJSON,
    toMarkdown,
    toCSV,
    toSummary,
    downloadAsJSON,
    downloadAsMarkdown,
    downloadAsCSV,
    downloadAsSummary,
    isAvailable,
  };
}
