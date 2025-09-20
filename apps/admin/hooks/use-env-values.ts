"use client";

import { useState, useEffect } from "react";

export function useEnvValues() {
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

  return envValues;
}
