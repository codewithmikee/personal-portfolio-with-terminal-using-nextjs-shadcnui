/**
 * Admin page component for portfolio management
 * Provides interface for editing portfolio content
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { AdminPanel } from "@/components/admin/admin-panel";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminPanel isOpen={true} onClose={() => window.history.back()} />
    </div>
  );
}
