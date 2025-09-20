// app/page.tsx - Admin Portfolio Management Dashboard
/**
 * Admin Dashboard
 * Main portfolio management dashboard with CRUD operations
 * 
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Briefcase,
  Code,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { EnhancedPortfolio } from "@/types/portfolio";

interface PortfolioListItem {
  id: string;
  externalId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "draft" | "archived";
  projectsCount: number;
  experienceCount: number;
  skillsCount: number;
}

export default function AdminDashboard() {
  const [portfolios, setPortfolios] = useState<PortfolioListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    portfolio: PortfolioListItem | null;
  }>({ isOpen: false, portfolio: null });
  const router = useRouter();

  // Load portfolios
  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/portfolios");
      if (!response.ok) throw new Error("Failed to load portfolios");

      const data = await response.json();
      const portfolioList = Array.isArray(data) ? data : [data];

      setPortfolios(
        portfolioList.map((portfolio: any) => ({
          id: portfolio.id,
          externalId: portfolio.externalId,
          title: portfolio.profile?.full_name || "Untitled Portfolio",
          description: portfolio.profile?.description || "No description",
          createdAt: portfolio.createdAt,
          updatedAt: portfolio.updatedAt,
          status: "active" as const,
          projectsCount: portfolio.projects?.length || 0,
          experienceCount: portfolio.experience?.length || 0,
          skillsCount: portfolio.skills?.length || 0,
        }))
      );
    } catch (error) {
      console.error("Error loading portfolios:", error);
      toast.error("Failed to load portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (portfolio: PortfolioListItem) => {
    try {
      const response = await fetch(`/api/portfolios/${portfolio.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete portfolio");

      setPortfolios((prev) => prev.filter((p) => p.id !== portfolio.id));
      toast.success("Portfolio deleted successfully");
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      toast.error("Failed to delete portfolio");
    } finally {
      setDeleteDialog({ isOpen: false, portfolio: null });
    }
  };

  const filteredPortfolios = portfolios.filter(
    (portfolio) =>
      portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.externalId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Portfolio Management</h1>
              <p className="text-muted-foreground">
                Manage and organize your portfolio collection
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={loadPortfolios}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Button asChild>
                <Link href="/admin/portfolios/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Portfolios
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolios.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Portfolios
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.filter((p) => p.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.reduce((sum, p) => sum + p.projectsCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Experience
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolios.reduce((sum, p) => sum + p.experienceCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search portfolios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Portfolios Table */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolios</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPortfolios.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No portfolios found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Get started by creating your first portfolio"}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link href="/admin/portfolios/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Portfolio
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Portfolio</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPortfolios.map((portfolio) => (
                    <TableRow key={portfolio.id}>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <div className="font-medium truncate">
                            {portfolio.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            ID: {portfolio.externalId}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {portfolio.projectsCount} projects
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {portfolio.experienceCount} positions
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {portfolio.skillsCount} skills
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(portfolio.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/portfolios/${portfolio.externalId}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={`/portfolios/${portfolio.externalId}/edit`}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() =>
                              setDeleteDialog({ isOpen: true, portfolio })
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          setDeleteDialog({ isOpen: open, portfolio: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Portfolio</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.portfolio?.title}"?
              This action cannot be undone and will permanently remove the
              portfolio and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteDialog.portfolio && handleDelete(deleteDialog.portfolio)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
        <div className="h-8 bg-muted rounded mb-4 w-64"></div>
        <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}
