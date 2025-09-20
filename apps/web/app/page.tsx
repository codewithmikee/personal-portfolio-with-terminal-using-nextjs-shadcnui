"use client";

import * as React from "react";

export default function Page(): React.JSX.Element {
  const [portfolio, setPortfolio] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data...");
        setIsLoading(true);
        const response = await fetch("/data/portfolio.json");
        console.log("Response:", response.status, response.ok);
        const data = await response.json();
        console.log("Data loaded:", data);
        setPortfolio(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Simple Test Page</h1>
      <p>Portfolio: {portfolio ? "Loaded" : "Not loaded"}</p>
      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <p>Error: {error || "None"}</p>
      {portfolio && (
        <div>
          <h2>Portfolio Data:</h2>
          <pre>{JSON.stringify(portfolio, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
