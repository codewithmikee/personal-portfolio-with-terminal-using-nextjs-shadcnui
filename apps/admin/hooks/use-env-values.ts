"use client";

import { useState, useEffect } from "react";

interface UseEnvValuesOptions {
  variableName: string;
  defaultValue?: string;
}

export function useEnvValues(
  options?: UseEnvValuesOptions
): string | { apiUrl: string; environment: string } {
  const [envValues, setEnvValues] = useState({
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    environment: process.env.NODE_ENV || "development",
  });

  useEffect(() => {
    // Update env values if they change
    setEnvValues({
      apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
      environment: process.env.NODE_ENV || "development",
    });
  }, []);

  // If specific variable is requested, return its value
  if (options?.variableName) {
    const envKey = `NEXT_PUBLIC_${options.variableName}`;
    const value = process.env[envKey] || options.defaultValue || "";
    return value;
  }

  return envValues;
}
