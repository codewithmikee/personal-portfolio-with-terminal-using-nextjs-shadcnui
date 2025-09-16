"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context";
import { Plus, Save, Trash2 } from "lucide-react";
import type { Skill } from "@/data/schemas/portfolio";

export function SkillsEditor() {
  const { data, updateSkills } = usePortfolioContext();

  if (!data) {
    return <div>Loading...</div>;
  }

  const [skills, setSkills] = useState<Skill[]>(data.skills);
  const [newSkill, setNewSkill] = useState<string>("");

  useEffect(() => {
    if (data?.skills) setSkills(data.skills);
  }, [data]);

  const handleAddSkill = () => {
    const title = newSkill.trim();
    if (title) {
      const skill: Skill = { title };
      setSkills([...skills, skill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleUpdateSkill = (index: number, value: string) => {
    const updated = [...skills];
    updated[index] = { title: value };
    setSkills(updated);
  };

  const handleSave = () => {
    updateSkills(skills);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g., React"
            />
            <Button onClick={handleAddSkill}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Current Skills ({skills.length})</CardTitle>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={skill.title}
                  onChange={(e) => handleUpdateSkill(index, e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveSkill(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
