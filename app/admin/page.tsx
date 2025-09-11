"use client"

import { AdminPanel } from "@/components/admin/admin-panel"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminPanel isOpen={true} onClose={() => window.history.back()} />
    </div>
  )
}
