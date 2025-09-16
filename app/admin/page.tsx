/**
 * Admin page component for portfolio management
 * Temporarily disabled during migration to enhanced data structure
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Admin Panel - Migration in Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The admin panel is temporarily disabled during the migration to the enhanced data structure.
            </p>
            <p className="text-muted-foreground">
              The core portfolio functionality is fully operational with the new enhanced data structure.
              Admin components will be migrated in a future update.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                View Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
