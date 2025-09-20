import React from "react";
import { EnhancedPortfolio } from "@/types/portfolio";
import { PortfolioDataSource } from "./PortfolioWrapper";

interface PortfolioContentProps {
  dataSource?: PortfolioDataSource;
  portfolio: EnhancedPortfolio;
}

function PortfolioContentWrapper({}: PortfolioContentProps) {
  return <div>PortfolioContentWrapper</div>;
}
