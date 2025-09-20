import React, { useCallback, useEffect, useState } from "react";
import { EnhancedPortfolio } from "@/types/portfolio";
import { useEnvValues } from "@/hooks/use-env-values";

export interface PortfolioDataSource {
  isPublic: boolean;
  path: string;
}

function PortfolioWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolio, setPortfolio] = useState<EnhancedPortfolio | null>(null);

  const isPublicValue = useEnvValues({
    variableName: "IS_PUBLIC",
    defaultValue: "false",
  });
  const isPublic = isPublicValue === "true";

  const sourcePathValue = useEnvValues({ variableName: "SOURCE_PATH" });
  const sourcePath = typeof sourcePathValue === "string" ? sourcePathValue : "";

  const loadPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPortfolio(null);

    try {
      let response: Response;
      if (isPublic) {
        // Load from public folder JSON file via fetch relative to root public folder
        response = await fetch(sourcePath);
      } else {
        if (sourcePath.startsWith("http")) {
          // Load from full external API URL
          response = await fetch(sourcePath);
        } else {
          // Load from Next.js API route (assume relative path like /api/portfolio)
          response = await fetch(sourcePath);
        }
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
      }

      const data: EnhancedPortfolio = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, [isPublic, sourcePath]);

  // Optionally load portfolio on mount
  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  if (isLoading) return <div>Loading portfolio...</div>;
  if (error) return <div>Error loading portfolio: {error}</div>;
  if (!portfolio) return <div>No portfolio data available.</div>;

  return (
    <div>
      {/* Render your portfolio content here */}
      <h1>{portfolio.profile?.full_name}</h1>
      {/* other rendering */}
    </div>
  );
}

export default PortfolioWrapper;
