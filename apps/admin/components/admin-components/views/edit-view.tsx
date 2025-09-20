"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { Button } from "@workspace/ui/components/button";
import { Eye, Save, X } from "lucide-react";
import { ProfileForm } from "@/components/admin-components/cv-builder/profile-form";
import { ExperienceForm } from "@/components/admin-components/cv-builder/experience-form";
import { ProjectsForm } from "@/components/admin-components/cv-builder/projects-form";
import { SkillsForm } from "@/components/admin-components/cv-builder/skills-form";
import { CVPreview } from "@/components/admin-components/cv-builder/cv-preview";
import type { Portfolio, Skill, Tool } from "@/types/portfolio";
import { useState } from "react";

interface EditViewProps {
  portfolio: Portfolio;
  updateProfile: (profile: any) => void;
  updateExperience: (index: number, experience: any) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateProject: (index: number, project: any) => void;
  addProject: () => void;
  removeProject: (index: number) => void;
  updateSkills: (skills: Skill[]) => void;
  updateTools: (tools: Tool[]) => void;
  onPreview: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

export function EditView({
  portfolio,
  updateProfile,
  updateExperience,
  addExperience,
  removeExperience,
  updateProject,
  addProject,
  removeProject,
  updateSkills,
  updateTools,
  onPreview,
  onSave,
  onDiscard,
}: EditViewProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Edit Resume</h2>
          <p className="text-muted-foreground">
            Update your professional information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button
            variant="outline"
            onClick={onDiscard}
            className="flex items-center gap-2 bg-transparent"
          >
            <X className="h-4 w-4" />
            Discard
          </Button>
          <Button onClick={onSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        } h-[calc(100vh-200px)]`}
      >
        {/* Edit Forms */}
        <div className="space-y-6">
          <ScrollArea className="h-full pr-4">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <ProfileForm
                  profile={portfolio.profile}
                  onUpdate={updateProfile}
                />
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <ExperienceForm
                  experience={portfolio.experience}
                  onUpdate={updateExperience}
                  onAdd={addExperience}
                  onRemove={removeExperience}
                />
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <ProjectsForm
                  projects={portfolio.projects}
                  onUpdate={updateProject}
                  onAdd={addProject}
                  onRemove={removeProject}
                />
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <SkillsForm
                  skills={portfolio.skills}
                  tools={portfolio.tools}
                  onUpdateSkills={updateSkills}
                  onUpdateTools={updateTools}
                />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>

        {/* Preview Panel (conditional) */}
        {showPreview && (
          <div className="lg:sticky lg:top-6">
            <ScrollArea className="h-full">
              <div className="bg-white rounded-lg shadow-lg">
                <CVPreview portfolio={portfolio} />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
