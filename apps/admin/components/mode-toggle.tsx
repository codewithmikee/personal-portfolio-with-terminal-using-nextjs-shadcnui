"use client";

import { Button } from "@workspace/ui/components/button";
import { Terminal, Layout } from "lucide-react";
import { useNavigationMode } from "@/lib/hooks/use-navigation-mode";

export function ModeToggle() {
  const { mode, toggleMode } = useNavigationMode();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm"
    >
      {mode === "web" ? (
        <>
          <Terminal className="h-4 w-4 mr-2" />
          Terminal Mode
        </>
      ) : (
        <>
          <Layout className="h-4 w-4 mr-2" />
          UI Mode
        </>
      )}
    </Button>
  );
}
