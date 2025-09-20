/**
 * Admin page component for portfolio management
 * Temporarily disabled during migration to enhanced data structure
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { AdminPanel } from "@admin/admin-panel";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export default function AdminPage() {
  const [open, setOpen] = useState(true);
  const { portfolio, isLoading, error, loadPortfolio } = usePortfolioData();

  // Load portfolio data on component mount
  useEffect(() => {
    if (!portfolio && !isLoading) {
      loadPortfolio();
    }
  }, [portfolio, isLoading, loadPortfolio]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button
            variant={open ? "outline" : "default"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Open"} Admin
          </Button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => loadPortfolio()}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        )}
        
        <AdminPanel isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
