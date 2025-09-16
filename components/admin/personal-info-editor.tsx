"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context";
import { Save } from "lucide-react";

export function PersonalInfoEditor() {
  const { data, updatePersonal } = usePortfolioContext();
  const [formData, setFormData] = useState(
    data?.personal || {
      name: "",
      title: "",
      tagline: "",
      bio: "",
      location: "",
      avatar: "",
      resume_url: "",
      specializations: [],
      years_experience: 0,
      current_status: "available" as const,
      contact: {
        email: "",
        phone: "",
        website: "",
        github: "",
        linkedin: "",
        twitter: "",
        blog_url: "",
      },
      stats: {
        projects_completed: 0,
        blog_posts_written: 0,
        years_experience: 0,
        technologies_mastered: 0,
      },
    }
  );

  useEffect(() => {
    if (data?.personal) {
      setFormData(data.personal);
    }
  }, [data]);

  const handleSave = () => {
    console.log("Handle save form data", formData);
    updatePersonal(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof typeof prev] as any),
            [child]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g., Full Stack Developer"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.contact.email}
              onChange={(e) => handleChange("contact.email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={formData.contact.github}
              onChange={(e) => handleChange("contact.github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={formData.contact.linkedin}
              onChange={(e) => handleChange("contact.linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input
            id="avatar"
            value={formData.avatar}
            onChange={(e) => handleChange("avatar", e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
