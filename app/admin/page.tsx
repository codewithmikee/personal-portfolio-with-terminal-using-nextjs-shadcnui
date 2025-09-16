/**
 * Admin page component for portfolio management
 * Temporarily disabled during migration to enhanced data structure
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "@admin/admin-panel";

export default function AdminPage() {
  const [open, setOpen] = useState(true);
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
        <AdminPanel isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}
