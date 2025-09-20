"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { usePortfolioEdit } from "@/providers/portfolio-edit-provider";
import type { Project } from "@/types/portfolio";
import { Plus, Save, Trash2 } from "lucide-react";

export function EditProjectsEditor() {
  const { portfolio, addProject, updateProject, removeProject } =
    usePortfolioEdit();

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  const emptyProject: Project = {
    title: "",
    description: "",
    link: "",
    features: [],
  };

  const [formData, setFormData] = useState<Project>(emptyProject);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (index: number, project: Project) => {
    setEditingIndex(index);
    setFormData(project);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingIndex(null);
    setFormData(emptyProject);
    setIsCreating(true);
  };

  const handleSave = () => {
    if (isCreating) {
      addProject(formData);
    } else if (editingIndex !== null) {
      updateProject(editingIndex, formData);
    }
    setEditingIndex(null);
    setIsCreating(false);
    setFormData(emptyProject);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsCreating(false);
    setFormData(emptyProject);
  };

  if (isCreating || editingIndex !== null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {isCreating ? "Create New Project" : "Edit Project"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Project name"
              />
            </div>
            <div>
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief project description"
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Project
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
          Projects ({portfolio.projects.length})
        </h3>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {portfolio.projects.map((project: Project, index: number) => (
          <Card key={`${project.title}-${index}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(index, project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeProject(index)}
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
