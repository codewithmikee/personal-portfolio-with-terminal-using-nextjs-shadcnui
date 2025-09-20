/**
 * Admin panel component for portfolio management
 * Provides interface for editing all portfolio content sections
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";
import { Button } from "@workspace/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Settings,
  User,
  Briefcase,
  Code,
  Award,
  X,
  Database,
} from "lucide-react";
import { ExperienceEditor } from "@admin/experience-editor";
import { ProjectsEditor } from "@admin/projects-editor";
import { SkillsEditor } from "@admin/skills-editor";
import { PersonalInfoEditor } from "@admin/personal-info-editor";
import { DataManager } from "@admin/data-manager";
import { usePortfolioStore } from "@/lib/stores/portfolio.store";

// Temporary placeholders to keep Admin UI active without pulling in
// editors that are still being migrated to the enhanced schema.
function Placeholder({ title }: { title: string }) {
  return (
    <div className="rounded-md border p-6 text-sm text-muted-foreground">
      <p className="mb-2 font-medium text-foreground">{title}</p>
      <p>
        This section is being migrated to the enhanced data structure. The UI
        remains active; editing capabilities will be restored shortly.
      </p>
    </div>
  );
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { portfolio, isLoading, error } = usePortfolioStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Portfolio Content Manager
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Database Mode</div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 h-[calc(100vh-8rem)] overflow-auto">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Data
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

            <TabsContent value="data" className="mt-6">
              <DataManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
