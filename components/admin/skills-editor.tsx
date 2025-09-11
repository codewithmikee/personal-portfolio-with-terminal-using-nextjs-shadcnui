"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context"
import { Plus, Save, Trash2 } from "lucide-react"
import type { Skill } from "@/lib/portfolio-data"

export function SkillsEditor() {
  const { data, updateSkills } = usePortfolioContext()
  const [skills, setSkills] = useState(data.skills)
  const [newSkill, setNewSkill] = useState<Omit<Skill, "level"> & { level: number[] }>({
    name: "",
    category: "frontend",
    level: [3],
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        name: newSkill.name.trim(),
        category: newSkill.category,
        level: newSkill.level[0],
      }
      setSkills([...skills, skill])
      setNewSkill({ name: "", category: "frontend", level: [3] })
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleUpdateSkill = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...skills]
    if (field === "level" && Array.isArray(value)) {
      updatedSkills[index] = { ...updatedSkills[index], [field]: value[0] }
    } else {
      updatedSkills[index] = { ...updatedSkills[index], [field]: value }
    }
    setSkills(updatedSkills)
  }

  const handleSave = () => {
    updateSkills(skills)
  }

  const skillCategories = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    tools: "Tools & DevOps",
    other: "Other",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={newSkill.name}
                onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., React"
              />
            </div>
            <div>
              <Label htmlFor="skillCategory">Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, category: value as Skill["category"] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(skillCategories).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Skill Level: {newSkill.level[0]}/5</Label>
              <Slider
                value={newSkill.level}
                onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value }))}
                max={5}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
          <Button onClick={handleAddSkill}>
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
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
          <div className="space-y-4">
            {Object.entries(skillCategories).map(([category, label]) => {
              const categorySkills = skills.filter((skill) => skill.category === category)
              if (categorySkills.length === 0) return null

              return (
                <div key={category}>
                  <h4 className="font-semibold mb-3">{label}</h4>
                  <div className="space-y-2">
                    {categorySkills.map((skill, skillIndex) => {
                      const globalIndex = skills.findIndex((s) => s === skill)
                      return (
                        <div key={globalIndex} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="flex-1">
                            <Input
                              value={skill.name}
                              onChange={(e) => handleUpdateSkill(globalIndex, "name", e.target.value)}
                              className="font-medium"
                            />
                          </div>
                          <div className="w-32">
                            <Select
                              value={skill.category}
                              onValueChange={(value) =>
                                handleUpdateSkill(globalIndex, "category", value as Skill["category"])
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(skillCategories).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="w-24 text-center">
                            <span className="text-sm font-medium">{skill.level}/5</span>
                            <Slider
                              value={[skill.level]}
                              onValueChange={(value) => handleUpdateSkill(globalIndex, "level", value)}
                              max={5}
                              min={1}
                              step={1}
                              className="mt-1"
                            />
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleRemoveSkill(globalIndex)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
