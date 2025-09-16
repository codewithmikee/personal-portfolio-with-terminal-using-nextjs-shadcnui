"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context";
import { Plus, Save, Trash2, X } from "lucide-react";
import type { Experience } from "@/data/schemas/portfolio";

export function ExperienceEditor() {
  const { data, addExperience, updateExperience, removeExperience } =
    usePortfolioContext();

  if (!data) {
    return <div>Loading...</div>;
  }
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);

  const emptyExperience: Omit<Experience, "id"> = {
    company: "",
    company_url: "",
    position: "",
    location: "",
    employment_type: "full-time",
    timeline: {
      start_date: "",
      end_date: "",
      duration: "",
    },
    overview: "",
    key_responsibilities: [],
    achievements: [],
    technologies_used: [],
    projects_led: [],
    team_size: 1,
    backend_work: {
      apis_built: 0,
      integrations: [],
      database_optimizations: [],
      security_implementations: [],
    },
    order: 0,
  };

  const [formData, setFormData] = useState(emptyExperience);
  const [newTech, setNewTech] = useState("");

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData(experience);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingExperience(null);
    setFormData(emptyExperience);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (isCreating) {
      const newExperience: Experience = {
        ...formData,
        id: Date.now().toString(),
      };
      addExperience(newExperience);
    } else if (editingExperience) {
      updateExperience(editingExperience.id, formData);
    }
    setEditingExperience(null);
    setIsCreating(false);
    setFormData(emptyExperience);
  };

  const handleCancel = () => {
    setEditingExperience(null);
    setIsCreating(false);
    setFormData(emptyExperience);
  };

  const handleAddTechnology = () => {
    if (
      newTech.trim() &&
      !formData.technologies_used.includes(newTech.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies_used: [...prev.technologies_used, newTech.trim()],
      }));
      setNewTech("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies_used: prev.technologies_used.filter((t) => t !== tech),
    }));
  };

  if (isCreating || editingExperience) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {isCreating ? "Add New Experience" : "Edit Experience"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, position: e.target.value }))
                }
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="e.g., Remote, New York, NY"
              />
            </div>
            <div>
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select
                value={formData.employment_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    employment_type: value as Experience["employment_type"],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.timeline.start_date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, start_date: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.timeline.end_date || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, end_date: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.timeline.duration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeline: { ...prev.timeline, duration: e.target.value },
                  }))
                }
                placeholder="e.g., 2+ years"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={formData.overview}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  overview: e.target.value,
                }))
              }
              placeholder="Describe your role and achievements"
              rows={4}
            />
          </div>

          <div>
            <Label>Technologies Used</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && handleAddTechnology()}
              />
              <Button type="button" onClick={handleAddTechnology}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies_used.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveTechnology(tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Experience
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Work Experience ({data.experience.length})
        </h3>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="grid gap-4">
        {data.experience.map((exp) => (
          <Card key={exp.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{exp.position}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.timeline?.duration || "Duration not specified"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.overview}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies_used?.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {exp.technologies_used?.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{exp.technologies_used?.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(exp)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
