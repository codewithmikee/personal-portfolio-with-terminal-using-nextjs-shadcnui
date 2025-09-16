"use client";

import { create } from "zustand";

interface DirectoryItem {
  name: string;
  type: "file" | "directory";
  content?: string;
}

interface TerminalNavigationState {
  currentPath: string[];
  currentDirectory: DirectoryItem[];
  setPath: (path: string[]) => void;
  navigateTo: (directory: string) => { success: boolean; error?: string };
  goBack: () => void;
  goHome: () => void;
}

const portfolioStructure: Record<string, DirectoryItem[]> = {
  "": [
    { name: "projects", type: "directory" },
    { name: "experience", type: "directory" },
    { name: "skills", type: "directory" },
    { name: "about", type: "file", content: "About information" },
    { name: "contact", type: "file", content: "Contact information" },
    { name: "resume.pdf", type: "file", content: "Resume document" },
    {
      name: "README.md",
      type: "file",
      content: "# Portfolio\n\nWelcome to my portfolio!",
    },
  ],
  projects: [
    {
      name: "ecommerce-platform",
      type: "file",
      content: "E-commerce platform project",
    },
    {
      name: "task-management",
      type: "file",
      content: "Task management application",
    },
    {
      name: "api-documentation",
      type: "file",
      content: "API documentation system",
    },
  ],
  experience: [
    {
      name: "senior-developer",
      type: "file",
      content: "Senior Developer position",
    },
    {
      name: "full-stack-developer",
      type: "file",
      content: "Full Stack Developer position",
    },
  ],
  skills: [
    { name: "frontend", type: "file", content: "Frontend technologies" },
    { name: "backend", type: "file", content: "Backend technologies" },
    { name: "mobile", type: "file", content: "Mobile development" },
    { name: "fullstack", type: "file", content: "Full stack technologies" },
  ],
};

export const useTerminalNavigation = create<TerminalNavigationState>()(
  (set, get) => ({
    currentPath: [],
    currentDirectory: portfolioStructure[""] || [],
    setPath: (path) => {
      const pathKey = path.join("/");
      const directory = portfolioStructure[pathKey] || [];
      set({
        currentPath: path,
        currentDirectory: directory,
      });
    },
    navigateTo: (directory) => {
      const currentPath = get().currentPath;
      const newPath = [...currentPath, directory];
      const pathKey = newPath.join("/");

      if (portfolioStructure[pathKey]) {
        set({
          currentPath: newPath,
          currentDirectory: portfolioStructure[pathKey],
        });
        return { success: true };
      } else {
        return { success: false, error: "Directory not found" };
      }
    },
    goBack: () => {
      const currentPath = get().currentPath;
      if (currentPath.length > 0) {
        const newPath = currentPath.slice(0, -1);
        const pathKey = newPath.join("/");
        set({
          currentPath: newPath,
          currentDirectory: portfolioStructure[pathKey] || [],
        });
      }
    },
    goHome: () =>
      set({
        currentPath: [],
        currentDirectory: portfolioStructure[""] || [],
      }),
  })
);
