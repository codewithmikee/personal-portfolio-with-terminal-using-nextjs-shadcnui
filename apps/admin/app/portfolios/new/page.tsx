// app/portfolios/new/page.tsx - Create New Portfolio Page
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  ArrowLeft,
  Save,
  Plus,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type {
  EnhancedPortfolio,
  Profile,
  ProgrammingRole,
  JobType,
} from "@/types/portfolio";

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    externalId: "",
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    description: "",
    profile_picture: "/placeholder-user.jpg",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateExternalId = () => {
    const name = formData.full_name.toLowerCase().replace(/\s+/g, "-");
    const timestamp = Date.now().toString().slice(-6);
    return `${name}-${timestamp}`;
  };

  const handleCreate = async () => {
    if (!formData.full_name || !formData.email) {
      toast.error("Please fill in required fields (Name and Email)");
      return;
    }

    try {
      setIsCreating(true);

      const externalId = formData.externalId || generateExternalId();

      const newPortfolio: Partial<EnhancedPortfolio> = {
        externalId,
        profile: {
          externalId: `profile-${externalId}`,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          address: formData.address,
          description: formData.description,
          profile_picture: formData.profile_picture,
          contacts: [],
        },
        projects: [],
        experience: [],
        skills: [],
        tools: [],
        blogs: [],
        contacts: [],
        techStacks: [],
      };

      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPortfolio),
      });

      if (!response.ok) {
        throw new Error("Failed to create portfolio");
      }

      const createdPortfolio = await response.json();
      toast.success("Portfolio created successfully");

      // Redirect to edit page
      router.push(`/portfolios/${externalId}/edit`);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      toast.error("Failed to create portfolio");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Create New Portfolio</h1>
                <p className="text-muted-foreground">
                  Set up a new portfolio with basic information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="externalId">Portfolio ID *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="externalId"
                      value={formData.externalId}
                      onChange={(e) =>
                        handleInputChange("externalId", e.target.value)
                      }
                      placeholder="my-portfolio-123"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleInputChange("externalId", generateExternalId())
                      }
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for this portfolio (used in URLs)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) =>
                    handleInputChange("full_name", e.target.value)
                  }
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) =>
                      handleInputChange("phone_number", e.target.value)
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Location</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Professional Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Brief description of your professional background and expertise..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile_picture">Profile Picture URL</Label>
                <Input
                  id="profile_picture"
                  value={formData.profile_picture}
                  onChange={(e) =>
                    handleInputChange("profile_picture", e.target.value)
                  }
                  placeholder="/placeholder-user.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  URL to your profile picture image
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Setup Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Quick Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose a template to get started quickly, or create a blank
                  portfolio.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Developer Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Pre-configured with common developer skills and project
                        structure
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">Designer Template</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Optimized for showcasing design work and creative
                        projects
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button
              onClick={handleCreate}
              disabled={isCreating || !formData.full_name || !formData.email}
            >
              <Save className="w-4 h-4 mr-2" />
              {isCreating ? "Creating..." : "Create Portfolio"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
