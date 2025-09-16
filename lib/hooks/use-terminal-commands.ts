/**
 * Terminal commands hook for portfolio terminal interface
 * Handles command execution and navigation in terminal mode
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { usePortfolioContext } from "@/lib/hooks/use-portfolio-context";
import { terminalCommands } from "@/lib/portfolio-data";
import { useNavigationMode } from "@/lib/hooks/use-navigation-mode";
import { useTerminalNavigation } from "@/lib/hooks/use-terminal-navigation";

interface CommandResult {
  type: "output" | "error" | "success" | "warning";
  output: string;
}

export function useTerminalCommands() {
  const { data } = usePortfolioContext();
  const { setMode } = useNavigationMode();
  const { currentPath, currentDirectory, navigateTo, goBack, goHome, setPath } =
    useTerminalNavigation();

  const executeCommand = (input: string): CommandResult => {
    const [command, ...args] = input.toLowerCase().trim().split(" ");

    switch (command) {
      case "help":
        return {
          type: "output",
          output: `Available commands:

${terminalCommands
  .map((cmd) => `  ${cmd.command.padEnd(15)} - ${cmd.description}`)
  .join("\n")}

Navigation commands:
  cd <dir>        - Change directory
  ls              - List directory contents
  pwd             - Show current directory
  ..              - Go back one directory
  ~               - Go to home directory

Use arrow keys to navigate command history.`,
        };

      case "pwd":
        return {
          type: "output",
          output: currentDirectory,
        };

      case "cd":
        const targetDir = args[0];

        if (!targetDir || targetDir === "~") {
          goHome();
          return {
            type: "success",
            output: "Changed to home directory",
          };
        }

        if (targetDir === "..") {
          if (currentPath.length > 0) {
            goBack();
            return {
              type: "success",
              output: `Changed to ${
                currentPath.length === 1
                  ? "/home/portfolio"
                  : `/home/portfolio/${currentPath.slice(0, -1).join("/")}`
              }`,
            };
          } else {
            return {
              type: "warning",
              output: "Already at root directory",
            };
          }
        }

        // Handle navigation based on current path
        if (currentPath.length === 0) {
          // At root level
          const validDirs = ["projects", "experience", "skills"];
          if (validDirs.includes(targetDir)) {
            navigateTo(targetDir);
            return {
              type: "success",
              output: `Changed to ${currentDirectory}/${targetDir}`,
            };
          }
        } else if (currentPath[0] === "projects" && currentPath.length === 1) {
          // In projects directory
          if (!data) return { type: "error", output: "No data available" };
          const project = data?.projects.projects.find(
            (p) => p.id === targetDir
          );
          if (project) {
            navigateTo(targetDir);
            return {
              type: "success",
              output: `Changed to project: ${project.title}`,
            };
          }
        }

        return {
          type: "error",
          output: `Directory '${targetDir}' not found. Use 'ls' to see available directories.`,
        };

      case "ls":
        if (currentPath.length === 0) {
          // Root directory
          return {
            type: "output",
            output: `about.txt
projects/
experience/
skills/
contact.txt

Use 'cd <directory>' to navigate or commands like 'about', 'contact' to view files.`,
          };
        } else if (currentPath[0] === "projects" && currentPath.length === 1) {
          // Projects directory
          return {
            type: "output",
            output: `Projects:\n\n${data?.projects.projects
              .map(
                (project) =>
                  `${project.id}/     ${project.title} ${
                    project.featured ? "(Featured)" : ""
                  }`
              )
              .join("\n")}\n\nUse 'cd <project-id>' to view project details.`,
          };
        } else if (currentPath[0] === "projects" && currentPath.length === 2) {
          // Inside a specific project
          const projectId = currentPath[1];
          const project = data?.projects.projects.find(
            (p) => p.id === projectId
          );
          if (project) {
            return {
              type: "output",
              output: `${project.title} Files:

README.md       - Project overview
tech-stack.txt  - Technologies used
links.txt       - GitHub and live demo links
description.txt - Detailed description

Use 'cat <filename>' to view file contents.`,
            };
          }
        } else if (currentPath[0] === "experience") {
          return {
            type: "output",
            output: `Work Experience:\n\n${data?.experience
              .map(
                (exp, index) =>
                  `${index + 1}. ${exp.company
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/     ${exp.position} at ${
                    exp.company
                  }`
              )
              .join("\n")}`,
          };
        } else if (currentPath[0] === "skills") {
          const categories = [
            ...new Set(data?.skills.skills.map((s) => s.category)),
          ];
          return {
            type: "output",
            output: `Skill Categories:\n\n${categories
              .map((cat) => `${cat.toLowerCase()}/     ${cat} skills`)
              .join("\n")}`,
          };
        }

        return {
          type: "output",
          output: "Empty directory",
        };

      case "..":
        if (currentPath.length > 0) {
          goBack();
          return {
            type: "success",
            output: `Changed to ${
              currentPath.length === 1
                ? "/home/portfolio"
                : `/home/portfolio/${currentPath.slice(0, -1).join("/")}`
            }`,
          };
        } else {
          return {
            type: "warning",
            output: "Already at root directory",
          };
        }

      case "cat":
        const filename = args[0];
        if (!filename) {
          return {
            type: "error",
            output: "Usage: cat <filename>\nUse 'ls' to see available files.",
          };
        }

        // Handle file viewing based on current path and filename
        if (currentPath.length === 2 && currentPath[0] === "projects") {
          const projectId = currentPath[1];
          const project = data?.projects.projects.find(
            (p) => p.id === projectId
          );
          if (project) {
            switch (filename) {
              case "readme.md":
                return {
                  type: "output",
                  output: `# ${project.title}\n\n${project.detailed_description}`,
                };
              case "tech-stack.txt":
                return {
                  type: "output",
                  output: `Technologies used:\n\n${Object.values(
                    project.technologies
                  )
                    .flat()
                    .join("\n")}`,
                };
              case "links.txt":
                return {
                  type: "output",
                  output: `Project Links:\n\n${
                    project.urls?.github_url
                      ? `GitHub: ${project.urls.github_url}`
                      : ""
                  }${
                    project.urls?.live_url
                      ? `\nLive Demo: ${project.urls.live_url}`
                      : ""
                  }`,
                };
              case "description.txt":
                return {
                  type: "output",
                  output: project.detailed_description,
                };
            }
          }
        }

        return {
          type: "error",
          output: `File '${filename}' not found in current directory.`,
        };

      case "about":
        return {
          type: "output",
          output: `${data?.personal.name}
${data?.personal.title}

${data?.personal.bio}

Location: ${data?.personal.location}
Email: ${data?.personal.contact.email}

GitHub: ${data?.personal.contact.github}
LinkedIn: ${data?.personal.contact.linkedin}`,
        };

      case "projects":
        return {
          type: "output",
          output: `Projects:

 ${data?.projects.projects
   .map(
     (project, index) =>
       `${index + 1}. ${project.title} ${project.featured ? "(Featured)" : ""}
     ${project.description}
     Tech: ${Object.values(project.technologies).flat().join(", ")}
    ID: ${project.id}`
   )
   .join("\n\n")}

Use 'project <id>' to view details or 'cd projects' to navigate.`,
        };

      case "project":
        const projectId = args[0];
        if (!projectId) {
          return {
            type: "error",
            output:
              "Usage: project <id>\nUse 'projects' to see available project IDs.",
          };
        }

        const project = data?.projects?.projects.find(
          (p) => p.id === projectId
        );
        if (!project) {
          return {
            type: "error",
            output: `Project '${projectId}' not found.\nUse 'projects' to see available projects.`,
          };
        }

        return {
          type: "success",
          output: `${project.title}
${"=".repeat(project.title.length)}

${project.detailed_description}

Technologies: ${Object.values(project.technologies).flat().join(", ")}
Category: ${project.category}
${project.urls?.github_url ? `GitHub: ${project.urls.github_url}` : ""}
${project.urls?.live_url ? `Live Demo: ${project.urls.live_url}` : ""}`,
        };

      case "skills":
        if (!data?.skills?.skills) {
          return {
            type: "error",
            output: "No skills data available",
          };
        }

        const skillsByCategory = data.skills.skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {} as Record<string, typeof data.skills.skills>);

        return {
          type: "output",
          output: `Technical Skills:

${Object.entries(skillsByCategory)
  .map(
    ([category, skills]) =>
      `${category.toUpperCase()}:
 ${skills
   .map(
     (skill) =>
       `  ${skill.name.padEnd(15)} ${"★".repeat(skill.level)}${"☆".repeat(
         5 - skill.level
       )}`
   )
   .join("\n")}`
  )
  .join("\n\n")}`,
        };

      case "experience":
        return {
          type: "output",
          output: `Work Experience:

${data?.experience
  .map(
    (exp) =>
      `${exp.position} at ${exp.company}
${exp.timeline?.duration || "Duration not specified"}

${exp.overview}

Technologies: ${exp.technologies_used?.join(", ") || "Not specified"}`
  )
  .join("\n\n" + "-".repeat(50) + "\n\n")}`,
        };

      case "contact":
        return {
          type: "success",
          output: `Contact Information:

Email: ${data?.personal.contact.email}
Location: ${data?.personal.location}

Social Links:
GitHub: ${data?.personal.contact.github}
LinkedIn: ${data?.personal.contact.linkedin}

Feel free to reach out for collaboration opportunities!`,
        };

      case "clear":
        return {
          type: "output",
          output: "CLEAR_TERMINAL",
        };

      case "ui":
        setMode("ui");
        return {
          type: "success",
          output: "Switching to UI mode...",
        };

      case "whoami":
        return {
          type: "output",
          output: `${data?.personal.name
            .toLowerCase()
            .replace(" ", "")}@portfolio-terminal`,
        };

      case "date":
        return {
          type: "output",
          output: new Date().toString(),
        };

      case "echo":
        return {
          type: "output",
          output: args.join(" "),
        };

      case "stats":
        return {
          type: "success",
          output: `Portfolio Statistics:

Total Projects: ${data?.projects.projects.length}
Featured Projects: ${data?.projects.projects.filter((p) => p.featured).length}
Work Experience: ${data?.experience.length} positions
Technical Skills: ${data?.skills.skills.length} skills
Skill Categories: ${
            [...new Set(data?.skills.skills.map((s) => s.category))].length
          }`,
        };

      default:
        return {
          type: "error",
          output: `Command '${command}' not found. Type 'help' for available commands.`,
        };
    }
  };

  return { executeCommand };
}
