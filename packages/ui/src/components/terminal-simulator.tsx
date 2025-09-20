/**
 * Enhanced Terminal simulator component
 * Provides an interactive terminal interface for portfolio navigation with modern dark mode design
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import type React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronRight,
  Folder,
  File,
  GitBranch,
  User,
  Calendar,
  Code,
  Download,
  ExternalLink,
} from "lucide-react";
import type { EnhancedPortfolio } from "@workspace/shared/types/portfolio";

interface Command {
  input: string;
  output: string[];
  type: "success" | "error" | "info";
}

interface TerminalSimulatorProps {
  portfolio?: EnhancedPortfolio | null;
  initialCommands?: Command[];
  prompt?: string;
  className?: string;
}

export function TerminalSimulator({
  portfolio,
  initialCommands = [],
  prompt = "mikiyas@portfolio",
  className = "",
}: TerminalSimulatorProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Construct current directory path
  const currentDirectory = `/home/portfolio/`;

  const availableCommands: Record<string, Command> = useMemo(
    () => ({
      help: {
        input: "help",
        output: [
          "Available commands:",
          "  help     - Show this help message",
          "  clear    - Clear the terminal",
          "  whoami   - Display user information",
          "  ls       - List directory contents",
          "  pwd      - Print working directory",
          "  date     - Show current date",
          "  echo     - Display a line of text",
          "  projects - Show portfolio projects",
          "  skills   - Display technical skills",
          "  contact  - Show contact information",
          "  about    - Learn more about me",
          "  resume   - Download resume information",
          "  fun      - Fun facts about me",
          "",
          "💡 Tip: Try typing any command to see what happens!",
        ],
        type: "info",
      },
      clear: {
        input: "clear",
        output: [],
        type: "success",
      },
      ls: {
        input: "ls",
        output: [
          "drwxr-xr-x  8 mikiyas staff   256 Dec 15 10:30 .",
          "drwxr-xr-x  3 mikiyas staff    96 Dec 15 10:30 ..",
          "drwxr-xr-x  12 mikiyas staff   384 Dec 15 10:30 .git",
          "-rw-r--r--  1 mikiyas staff  1024 Dec 15 10:30 README.md",
          "drwxr-xr-x  5 mikiyas staff   160 Dec 15 10:30 src/",
          "drwxr-xr-x  3 mikiyas staff    96 Dec 15 10:30 public/",
          "-rw-r--r--  1 mikiyas staff   512 Dec 15 10:30 package.json",
          "-rw-r--r--  1 mikiyas staff   256 Dec 15 10:30 tsconfig.json",
        ],
        type: "success",
      },
      "ls -la": {
        input: "ls -la",
        output: [
          "drwxr-xr-x  8 mikiyas staff   256 Dec 15 10:30 .",
          "drwxr-xr-x  3 mikiyas staff    96 Dec 15 10:30 ..",
          "drwxr-xr-x  12 mikiyas staff   384 Dec 15 10:30 .git",
          "-rw-r--r--  1 mikiyas staff  1024 Dec 15 10:30 README.md",
          "drwxr-xr-x  5 mikiyas staff   160 Dec 15 10:30 src/",
          "drwxr-xr-x  3 mikiyas staff    96 Dec 15 10:30 public/",
          "-rw-r--r--  1 mikiyas staff   512 Dec 15 10:30 package.json",
          "-rw-r--r--  1 mikiyas staff   256 Dec 15 10:30 tsconfig.json",
        ],
        type: "success",
      },
      pwd: {
        input: "pwd",
        output: [currentDirectory],
        type: "success",
      },
      date: {
        input: "date",
        output: [new Date().toString()],
        type: "success",
      },
      projects: {
        input: "projects",
        output: portfolio?.projects?.map(
          (project) => `• ${project.title} - ${project.description}`
        ) || ["No projects available"],
        type: "info",
      },
      skills: {
        input: "skills",
        output: portfolio?.skills?.map((skill) => `• ${skill.title}`) || [
          "No skills available",
        ],
        type: "info",
      },
      contact: {
        input: "contact",
        output: [
          `Email: ${portfolio?.profile?.email || "mikiyas@example.com"}`,
          `Phone: ${portfolio?.profile?.phone_number || "+1 (555) 123-4567"}`,
          `Location: ${portfolio?.profile?.address || "San Francisco, CA"}`,
          `GitHub: https://github.com/codewithmikee`,
          `LinkedIn: https://linkedin.com/in/mikiyasbirhanu`,
        ],
        type: "info",
      },
      about: {
        input: "about",
        output: [
          "👋 Hi! I'm Mikiyas Birhanu",
          "",
          "🚀 Full Stack Developer passionate about creating amazing digital experiences",
          "💻 I love working with React, Next.js, Node.js, and modern web technologies",
          "🎨 I enjoy designing beautiful, functional user interfaces",
          "🌱 Always learning and exploring new technologies",
          "",
          "Let's build something amazing together! 🚀",
        ],
        type: "info",
      },
      resume: {
        input: "resume",
        output: [
          "📄 Download my resume:",
          "",
          "• PDF Version: [Click here to download]",
          "• Online Portfolio: Switch to UI mode to view full portfolio",
          "",
          "💼 Experience: 3+ years in full-stack development",
          "🎓 Education: Computer Science & Software Engineering",
          "🏆 Certifications: AWS, Google Cloud, MongoDB",
        ],
        type: "info",
      },
      fun: {
        input: "fun",
        output: [
          "🎉 Fun facts about me:",
          "",
          "• I can solve a Rubik's cube in under 2 minutes",
          "• I love hiking and exploring nature on weekends",
          "• I'm a coffee enthusiast ☕",
          "• I enjoy playing guitar and making music",
          "• I'm always up for a good coding challenge!",
          "",
          "Want to know more? Try 'about' or 'contact' commands! 😊",
        ],
        type: "info",
      },
    }),
    [
      portfolio?.profile?.email,
      portfolio?.profile?.phone_number,
      portfolio?.profile?.address,
      portfolio?.projects,
      portfolio?.skills,
    ]
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, currentInput]);

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      const input = currentInput.trim();

      if (input === "clear") {
        setCommands([]);
        setCurrentInput("");
        return;
      }

      let command: Command;
      if (availableCommands[input]) {
        command = availableCommands[input];
      } else if (input.startsWith("echo ")) {
        command = {
          input,
          output: [input.slice(5)],
          type: "success",
        };
      } else if (input === "whoami") {
        command = {
          input,
          output: [portfolio?.profile?.full_name || "Mikiyas Birhanu"],
          type: "success",
        };
      } else if (input === "cat skills.txt") {
        command = {
          input,
          output: [
            "Frontend: React, TypeScript, Next.js, Tailwind CSS",
            "Backend: Node.js, Python, PostgreSQL, MongoDB",
            "DevOps: Docker, AWS, CI/CD, Kubernetes",
            "Tools: Git, VS Code, Figma, Linear",
          ],
          type: "info",
        };
      } else if (input === "git status") {
        command = {
          input,
          output: [
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            "nothing to commit, working tree clean",
          ],
          type: "success",
        };
      } else {
        command = {
          input,
          output: [
            `Command not found: ${input}. Type 'help' for available commands.`,
          ],
          type: "error",
        };
      }

      setCommands((prev) => [...prev, command]);
      setCurrentInput("");
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getOutputColor = (type: Command["type"]) => {
    switch (type) {
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-foreground";
    }
  };

  const formatOutput = (line: string) => {
    // Simple syntax highlighting for file listings
    if (line.startsWith("drwxr-xr-x")) {
      const parts = line.split(/\s+/);
      const fileName = parts[parts.length - 1];
      return (
        <span>
          <span className="text-muted-foreground">
            {fileName ? line.replace(fileName, "") : line}
          </span>
          <span className="text-blue-400 flex items-center gap-1">
            <Folder className="w-3 h-3" />
            {fileName || ""}
          </span>
        </span>
      );
    } else if (line.startsWith("-rw-r--r--")) {
      const parts = line.split(/\s+/);
      const fileName = parts[parts.length - 1];
      return (
        <span>
          <span className="text-muted-foreground">
            {fileName ? line.replace(fileName, "") : line}
          </span>
          <span className="text-yellow-400 flex items-center gap-1">
            <File className="w-3 h-3" />
            {fileName || ""}
          </span>
        </span>
      );
    } else if (line.includes("branch")) {
      return (
        <span className="flex items-center gap-1">
          <GitBranch className="w-3 h-3 text-purple-400" />
          {line}
        </span>
      );
    } else if (line.includes("@") && line.includes(".")) {
      return (
        <a href={`mailto:${line}`} className="text-cyan-400 hover:underline">
          {line}
        </a>
      );
    } else if (line.includes("github.com") || line.includes("linkedin.com")) {
      return (
        <a
          href={`https://${line}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:underline flex items-center gap-1"
        >
          {line}
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    }

    return line;
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
          </div>
          <div className="ml-auto text-xs text-gray-500">{prompt}</div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="bg-black p-4 h-[75vh] overflow-y-auto font-mono text-sm cursor-text"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#10b981 #1f2937",
          }}
        >
          <AnimatePresence>
            {commands.map((command, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                {/* Command Input */}
                <div className="flex items-center gap-2 text-white mb-1">
                  <span className="text-green-400">{prompt}</span>
                  <span className="text-gray-500">~</span>
                  <ChevronRight className="w-3 h-3 text-blue-400" />
                  <span>{command.input}</span>
                </div>

                {/* Command Output */}
                {command.output.length > 0 && (
                  <div className={`ml-4 ${getOutputColor(command.type)}`}>
                    {command.output.map((line, lineIndex) => (
                      <motion.div
                        key={lineIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: lineIndex * 0.1 }}
                        className="py-0.5"
                      >
                        {formatOutput(line)}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current Input Line */}
          <div className="flex items-center gap-2 text-white">
            <span className="text-green-400">{prompt}</span>
            <span className="text-gray-500">~</span>
            <ChevronRight className="w-3 h-3 text-blue-400" />
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleInputSubmit}
                className="bg-transparent border-none outline-none text-white w-full font-mono"
                disabled={isTyping}
                autoFocus
              />
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-white"
                >
                  |
                </motion.span>
              )}
            </div>
          </div>

          {/* Help Text */}
          {commands.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-gray-500 text-xs"
            >
              Type 'help' to see available commands or try typing your own!
            </motion.div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-gray-900 px-4 py-2 text-xs text-gray-500 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <span>
              Type help for available commands • Use ↑/↓ arrows for command
              history
            </span>
            <span>Press Ctrl+C to interrupt • clear to reset terminal</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
