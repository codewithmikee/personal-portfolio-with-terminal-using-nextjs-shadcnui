"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { usePortfolioEdit } from "@/providers/portfolio-edit-provider";
import { Plus, Save, Trash2 } from "lucide-react";
import type { Experience } from "@/types/portfolio";
import { ProgrammingRole, JobType } from "@/types/portfolio";

export function EditExperienceEditor() {
  const { portfolio, addExperience, updateExperience, removeExperience } =
    usePortfolioEdit();

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  const emptyExperience: Experience = {
    company_name: "",
    company_description: "",
    start_date: "",
    end_date: null,
    role: ProgrammingRole.FullStack,
    job_type: JobType.Full_Time,
    contacts: [],
  };

  const [formData, setFormData] = useState<Experience>(emptyExperience);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (index: number, experience: Experience) => {
    setEditingIndex(index);
    setFormData(experience);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingIndex(null);
    setFormData(emptyExperience);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (isCreating) {
      addExperience(formData);
    } else if (editingIndex !== null) {
      updateExperience(editingIndex, formData);
    }
    setEditingIndex(null);
    setIsCreating(false);
    setFormData(emptyExperience);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsCreating(false);
    setFormData(emptyExperience);
  };

  if (isCreating || editingIndex !== null) {
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
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    company_name: e.target.value,
                  }))
                }
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value as ProgrammingRole,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProgrammingRole.FullStack}>
                    FullStack
                  </SelectItem>
                  <SelectItem value={ProgrammingRole.Frontend}>
                    Frontend
                  </SelectItem>
                  <SelectItem value={ProgrammingRole.Backend}>
                    Backend
                  </SelectItem>
                  <SelectItem value={ProgrammingRole.Mobile}>Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="company_description">Company Description</Label>
            <Textarea
              id="company_description"
              value={formData.company_description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company_description: e.target.value,
                }))
              }
              placeholder="Describe the company and your work"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    start_date: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    end_date: e.target.value || null,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="job_type">Job Type</Label>
              <Select
                value={formData.job_type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    job_type: value as JobType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={JobType.Full_Time}>Full Time</SelectItem>
                  <SelectItem value={JobType.Part_Time}>Part Time</SelectItem>
                  <SelectItem value={JobType.Contract}>Contract</SelectItem>
                  <SelectItem value={JobType.Freelance}>Freelance</SelectItem>
                </SelectContent>
              </Select>
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
          Work Experience ({portfolio.experience.length})
        </h3>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="grid gap-4">
        {portfolio.experience.map((exp, index) => (
          <Card key={`${exp.company_name}-${index}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{exp.company_name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.start_date}
                    {exp.end_date ? ` - ${exp.end_date}` : " - Present"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {exp.company_description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(index, exp)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(index)}
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
