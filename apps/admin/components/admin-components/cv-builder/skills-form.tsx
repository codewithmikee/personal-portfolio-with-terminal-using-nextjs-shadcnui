"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Plus, X } from "lucide-react";
import type { Skill, Tool } from "@/types/portfolio";
import { useState } from "react";

interface SkillsFormProps {
  skills: Skill[];
  tools: Tool[];
  onUpdateSkills: (skills: Skill[]) => void;
  onUpdateTools: (tools: Tool[]) => void;
}

export function SkillsForm({
  skills,
  tools,
  onUpdateSkills,
  onUpdateTools,
}: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newTool, setNewTool] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      onUpdateSkills([
        ...skills,
        {
          id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: newSkill.trim(),
        },
      ]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    onUpdateSkills(skills.filter((_, i) => i !== index));
  };

  const addTool = () => {
    if (newTool.trim()) {
      onUpdateTools([...tools, { title: newTool.trim() }]);
      setNewTool("");
    }
  };

  const removeTool = (index: number) => {
    onUpdateTools(tools.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill (e.g., React, Python, UI/UX Design)"
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {skill.title}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No skills added yet. Add your technical and soft skills above.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tools & Technologies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              placeholder="Add a tool (e.g., Docker, Git, VS Code)"
              onKeyPress={(e) => e.key === "Enter" && addTool()}
            />
            <Button onClick={addTool} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1"
              >
                {tool.title}
                <button
                  onClick={() => removeTool(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {tools.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No tools added yet. Add the tools and technologies you use.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
