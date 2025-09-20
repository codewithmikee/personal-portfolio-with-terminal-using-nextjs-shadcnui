"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { Plus, X } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectsFormProps {
  projects: Project[];
  onUpdate: (index: number, updates: Partial<Project>) => void;
  onAdd: (project: Project) => void;
  onRemove: (index: number) => void;
}

export function ProjectsForm({
  projects,
  onUpdate,
  onAdd,
  onRemove,
}: ProjectsFormProps) {
  const addProject = () => {
    const newProject: Project = {
      title: "",
      description: "",
      link: "",
      features: [],
    };
    onAdd(newProject);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Projects</CardTitle>
          <Button onClick={addProject} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm text-muted-foreground">
                Project #{index + 1}
              </h4>
              <Button
                onClick={() => onRemove(index)}
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => onUpdate(index, { title: e.target.value })}
                  placeholder="My Awesome Project"
                />
              </div>
              <div>
                <Label>Project Link</Label>
                <Input
                  value={project.link}
                  onChange={(e) => onUpdate(index, { link: e.target.value })}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  onUpdate(index, { description: e.target.value })
                }
                placeholder="Brief description of the project and its key features..."
                rows={3}
              />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No projects added yet.</p>
            <p className="text-sm">
              Click "Add Project" to showcase your work.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
