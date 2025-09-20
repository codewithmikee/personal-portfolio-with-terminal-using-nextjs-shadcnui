"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import {
  Save,
  Eye,
  Settings,
  User,
  Briefcase,
  Award,
  Code,
  Database,
} from "lucide-react";
import { toast } from "sonner";
import { usePortfolioEdit } from "@/providers/portfolio-edit-provider";
import { EditPersonalInfoEditor } from "./edit-personal-info-editor";
import { EditProjectsEditor } from "./edit-projects-editor";
import { EditExperienceEditor } from "./edit-experience-editor";
import { EditSkillsEditor } from "./edit-skills-editor";
import { DataManager } from "./data-manager";
import { PortfolioDisplay } from "../../../../packages/ui/src/components/portfolio-display";

interface PortfolioEditWrapperProps {
  onSave: (portfolio: any) => void;
  isSaving: boolean;
  showPreview: boolean;
  onTogglePreview: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PortfolioEditWrapper({
  onSave,
  isSaving,
  showPreview,
  onTogglePreview,
  activeTab,
  onTabChange,
}: PortfolioEditWrapperProps) {
  const { portfolio } = usePortfolioEdit();

  const handleSave = () => {
    if (portfolio) {
      onSave(portfolio);
    }
  };

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Edit Panel */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Portfolio Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={onTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger
                  value="personal"
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="flex items-center gap-2"
                >
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
                <EditPersonalInfoEditor />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <EditProjectsEditor />
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <EditExperienceEditor />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <EditSkillsEditor />
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <DataManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden max-h-[80vh] overflow-y-auto">
                <PortfolioDisplay
                  portfolio={portfolio}
                  isLoading={false}
                  error={null}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
