"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Briefcase, Code, Award, X } from "lucide-react"
import { PersonalInfoEditor } from "@/components/admin/personal-info-editor"
import { ProjectsEditor } from "@/components/admin/projects-editor"
import { ExperienceEditor } from "@/components/admin/experience-editor"
import { SkillsEditor } from "@/components/admin/skills-editor"

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Portfolio Content Manager
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 h-[calc(100vh-8rem)] overflow-auto">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <PersonalInfoEditor />
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <ProjectsEditor />
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <ExperienceEditor />
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <SkillsEditor />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
