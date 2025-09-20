"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Plus, X } from "lucide-react";
import { type Experience, ProgrammingRole, JobType } from "@/types/portfolio";

interface ExperienceFormProps {
  experience: Experience[];
  onUpdate: (index: number, updates: Partial<Experience>) => void;
  onAdd: (experience: Experience) => void;
  onRemove: (index: number) => void;
}

export function ExperienceForm({
  experience,
  onUpdate,
  onAdd,
  onRemove,
}: ExperienceFormProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      company_name: "",
      company_description: "",
      start_date: "",
      end_date: null,
      role: ProgrammingRole.FullStack,
      job_type: JobType.Full_Time,
      contacts: [],
    };
    onAdd(newExperience);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Work Experience
          </CardTitle>
          <Button onClick={addExperience} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm text-muted-foreground">
                Experience #{index + 1}
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
                <Label>Company Name</Label>
                <Input
                  value={exp.company_name}
                  onChange={(e) =>
                    onUpdate(index, { company_name: e.target.value })
                  }
                  placeholder="Company Inc."
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  value={exp.role}
                  onValueChange={(value) =>
                    onUpdate(index, { role: value as ProgrammingRole })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ProgrammingRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={exp.start_date}
                  onChange={(e) =>
                    onUpdate(index, { start_date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={exp.end_date || ""}
                  onChange={(e) =>
                    onUpdate(index, { end_date: e.target.value || null })
                  }
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Select
                  value={exp.job_type}
                  onValueChange={(value) =>
                    onUpdate(index, { job_type: value as JobType })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(JobType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={exp.company_description}
                onChange={(e) =>
                  onUpdate(index, { company_description: e.target.value })
                }
                placeholder="Describe your role and achievements..."
                rows={3}
              />
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
