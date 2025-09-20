/**
 * Terminal commands hook for portfolio terminal interface
 * Handles command execution and navigation in terminal mode
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { usePortfolioData } from "@/hooks/use-portfolio-data";
import { useNavigationMode } from "@/lib/hooks/use-navigation-mode";
import { useTerminalNavigation } from "@/lib/hooks/use-terminal-navigation";
import type {
  EnhancedPortfolio,
  Project,
  Experience,
  TechStack,
  Contact,
  Skill,
} from "@/types/portfolio";

interface CommandResult {
  type: "output" | "error" | "success" | "warning";
  output: string;
}

export function useTerminalCommands() {
  const { portfolio: data } = usePortfolioData();

  if (!data) {
    return {
      executeCommand: () => ({
        type: "error",
        output: "Portfolio data not available",
      }),
    };
  }
  const { setMode } = useNavigationMode();
  const { currentPath, currentDirectory, navigateTo, goBack, goHome, setPath } =
    useTerminalNavigation();

  const executeCommand = (input: string): CommandResult => {
    const [command, ...args] = input.toLowerCase().trim().split(" ");

    try {
      switch (command) {
        case "help":
          return {
            type: "output",
            output: `Available commands:
  help                    - Show this help message
  clear                   - Clear the terminal
  ls                      - List files and directories
  cd <directory>          - Change directory
  cat <file>              - Display file contents
  whoami                  - Display user information
  projects                - List all projects
  project <id>            - Show project details
  experience              - Show work experience
  skills                  - Show technical skills
  about                   - Show about information
  contact                 - Show contact information
  ui                      - Switch to UI mode
  exit                    - Exit terminal mode`,
          };

        case "clear":
          return { type: "success", output: "" };

        case "ls":
          return {
            type: "output",
            output: currentDirectory
              .map(
                (item) =>
                  `${item.type === "directory" ? "📁" : "📄"} ${item.name}`
              )
              .join("\n"),
          };

        case "cd":
          if (args.length === 0) {
            goHome();
            return { type: "success", output: "Changed to home directory" };
          }

          const targetDir = args[0];
          const result = navigateTo(targetDir);
          if (result.success) {
            return { type: "success", output: `Changed to ${targetDir}` };
          } else {
            return {
              type: "error",
              output: result.error || "Directory not found",
            };
          }

        case "cat":
          if (args.length === 0) {
            return { type: "error", output: "Usage: cat <file>" };
          }

          const fileName = args[0];
          const file = currentDirectory.find(
            (item) => item.name === fileName && item.type === "file"
          );

          if (!file) {
            return { type: "error", output: "File not found" };
          }

          return { type: "output", output: file.content || "File is empty" };

        case "whoami":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `${data.profile.full_name}
${data.profile.description}

Location: ${data.profile.address}
Email: ${data.profile.email}
GitHub: ${
              data.profile.contacts.find((c: Contact) => c.name === "GitHub")
                ?.link || "Not available"
            }
LinkedIn: ${
              data.profile.contacts.find((c: Contact) => c.name === "LinkedIn")
                ?.link || "Not available"
            }`,
          };

        case "projects":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `Projects:\n\n${data.projects
              .map(
                (project: Project, index: number) =>
                  `${index + 1}. ${project.title}\n   ${
                    project.description
                  }\n   Link: ${project.link}\n`
              )
              .join("\n")}`,
          };

        case "project":
          if (args.length === 0) {
            return { type: "error", output: "Usage: project <id>" };
          }

          if (!data) {
            return { type: "error", output: "No data available" };
          }

          const projectId = parseInt(args[0]) - 1;
          const project = data.projects[projectId];

          if (!project) {
            return { type: "error", output: "Project not found" };
          }

          return {
            type: "output",
            output: `${project.title}\n\n${project.description}\n\nLink: ${
              project.link
            }\n\nFeatures:\n${project.features
              .map(
                (feature: any) =>
                  `- ${feature.title}: ${
                    feature.description
                  }\n  Technologies: ${feature.techStacks
                    .map((tech: TechStack) => tech.title)
                    .join(", ")}`
              )
              .join("\n")}`,
          };

        case "experience":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `Work Experience:\n\n${data.experience
              .map(
                (exp: Experience, index: number) =>
                  `${index + 1}. ${exp.role} at ${exp.company_name}\n   ${
                    exp.company_description
                  }\n   ${exp.job_type} | ${new Date(
                    exp.start_date
                  ).toLocaleDateString()} - ${
                    exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString()
                      : "Present"
                  }\n`
              )
              .join("\n")}`,
          };

        case "skills":
          if (!data) {
            return { type: "error", output: "No data available" };
          }

          const skillsByType = (data.techStacks || []).reduce(
            (acc: Record<string, TechStack[]>, tech: TechStack) => {
              if (!acc[tech.type]) {
                acc[tech.type] = [];
              }
              acc[tech.type].push(tech);
              return acc;
            },
            {} as Record<string, TechStack[]>
          );

          return {
            type: "output",
            output: `Technical Skills:\n\n${Object.entries(skillsByType)
              .map(
                ([type, skills]) =>
                  `${type}:\n${skills
                    .map(
                      (skill: TechStack) =>
                        `  - ${skill.title} (${skill.level})`
                    )
                    .join("\n")}`
              )
              .join("\n\n")}`,
          };

        case "about":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `About ${data.profile.full_name}:\n\n${data.profile.description}\n\nLocation: ${data.profile.address}\nEmail: ${data.profile.email}`,
          };

        case "contact":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `Contact Information:\n\nEmail: ${
              data.profile.email
            }\nLocation: ${
              data.profile.address
            }\n\nSocial Links:\n${data.profile.contacts
              .map((contact: Contact) => `${contact.name}: ${contact.link}`)
              .join("\n")}`,
          };

        case "web":
          setMode("web");
          return { type: "success", output: "Switched to UI mode" };

        case "exit":
          setMode("web");
          return { type: "success", output: "Exiting terminal mode" };

        case "pwd":
          return {
            type: "output",
            output: `/home/portfolio/${currentPath.join("/")}`,
          };

        case "history":
          return {
            type: "output",
            output: "Command history is not implemented in this demo.",
          };

        case "tree":
          return {
            type: "output",
            output: `Portfolio Structure:\n\n📁 portfolio/\n  📁 projects/\n  📁 experience/\n  📁 skills/\n  📁 about/\n  📁 contact/\n  📄 resume.pdf\n  📄 README.md`,
          };

        case "stats":
          if (!data) {
            return { type: "error", output: "No data available" };
          }
          return {
            type: "output",
            output: `Portfolio Statistics:\n\nName: ${
              data.profile.full_name
            }\n\nTotal Projects: ${data.projects.length}\nTotal Experience: ${
              data.experience.length
            } positions\nTechnical Skills: ${
              (data.techStacks || []).length
            } technologies\nSkill Categories: ${
              [
                ...new Set(
                  (data.techStacks || []).map((s: TechStack) => s.type)
                ),
              ].length
            } categories`,
          };

        default:
          return {
            type: "error",
            output: `Command not found: ${command}. Type 'help' for available commands.`,
          };
      }
    } catch (error) {
      return {
        type: "error",
        output: `Error executing command: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  };

  return {
    executeCommand,
    currentPath,
    currentDirectory,
  };
}
