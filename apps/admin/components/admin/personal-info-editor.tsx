"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";
import type { Profile } from "@/types/portfolio";
import { Save } from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

export function PersonalInfoEditor() {
  const { portfolio: data, updateProfile } = usePortfolioData();
  const [formData, setFormData] = useState<Profile>(
    data?.profile || {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      description: "",
      profile_picture: "",
      contacts: [],
    }
  );

  useEffect(() => {
    if (data?.profile) {
      setFormData(data.profile);
    }
  }, [data]);

  const handleSave = () => {
    updateProfile(formData);
  };

  const handleChange = (field: keyof Profile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              placeholder="e.g., +1 555-555-5555"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Bio</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
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
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Street, City, Country"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="profile_picture">Profile Picture URL</Label>
          <Input
            id="profile_picture"
            value={formData.profile_picture}
            onChange={(e) => handleChange("profile_picture", e.target.value)}
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
