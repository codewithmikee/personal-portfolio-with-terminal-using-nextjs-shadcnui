/**
 * Terminal simulator component
 * Provides an interactive terminal interface for portfolio navigation
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { terminalCommands } from "@/lib/portfolio-data";
import { useTerminalCommands } from "@/lib/hooks/use-terminal-commands";
import { useTerminalNavigation } from "@/lib/hooks/use-terminal-navigation";
import { useEnhancedPortfolioData } from "@/lib/hooks/use-portfolio-data";

interface TerminalLine {
  type: "input" | "output" | "error" | "success" | "warning";
  content: string;
  timestamp?: Date;
}

export function TerminalSimulator() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const { executeCommand } = useTerminalCommands();
  const { currentPath } = useTerminalNavigation();
  const { data: portfolioData } = useEnhancedPortfolioData();

  // Construct current directory path
  const currentDirectory = `/home/portfolio/${currentPath.join("/")}`;

  useEffect(() => {
    // Welcome message
    setLines([
      {
        type: "output",
        content: `Welcome to ${
          portfolioData?.profile?.full_name || "Portfolio"
        } Terminal`,
        timestamp: new Date(),
      },
      {
        type: "output",
        content: "Type 'help' to see available commands.",
        timestamp: new Date(),
      },
      {
        type: "output",
        content: "",
      },
    ]);

    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const command = currentInput.trim();

    // Add input to lines
    setLines((prev) => [
      ...prev,
      {
        type: "input",
        content: `${currentDirectory} $ ${command}`,
        timestamp: new Date(),
      },
    ]);

    // Add to command history
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    // Execute command
    const result = executeCommand(command);

    // Handle clear command specially
    if (result.output === "CLEAR_TERMINAL") {
      setLines([
        {
          type: "output",
          content: `Welcome to ${
            portfolioData?.profile?.full_name || "Portfolio"
          } Terminal`,
          timestamp: new Date(),
        },
        {
          type: "output",
          content: "Type 'help' to see available commands.",
          timestamp: new Date(),
        },
        {
          type: "output",
          content: "",
        },
      ]);
    } else {
      // Add output to lines
      setLines((prev) => [
        ...prev,
        {
          type: result.type,
          content: result.output,
          timestamp: new Date(),
        },
      ]);
    }

    // Clear input
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "input":
        return "text-green-400";
      case "output":
        return "text-gray-300";
      case "error":
        return "text-red-400";
      case "success":
        return "text-green-300";
      case "warning":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black rounded-lg border border-gray-700 shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-sm">
              portfolio-terminal - /home/portfolio/{currentPath.join("/")}
            </div>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="h-96 overflow-y-auto p-4 cursor-text"
            onClick={handleTerminalClick}
          >
            {lines.map((line, index) => (
              <div key={index} className="mb-1">
                <div
                  className={`whitespace-pre-wrap ${getLineColor(line.type)}`}
                >
                  {line.content}
                </div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">
                /home/portfolio/{currentPath.join("/")} $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-green-400 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="text-green-400 animate-pulse">_</span>
            </form>
          </div>
        </div>

        {/* Command Reference */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-green-400 font-bold mb-3">Quick Reference:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex">
              <span className="text-yellow-400 w-24 flex-shrink-0">cd</span>
              <span className="text-gray-400">- Change directory</span>
            </div>
            <div className="flex">
              <span className="text-yellow-400 w-24 flex-shrink-0">ls</span>
              <span className="text-gray-400">- List contents</span>
            </div>
            <div className="flex">
              <span className="text-yellow-400 w-24 flex-shrink-0">pwd</span>
              <span className="text-gray-400">- Current directory</span>
            </div>
            <div className="flex">
              <span className="text-yellow-400 w-24 flex-shrink-0">cat</span>
              <span className="text-gray-400">- View file contents</span>
            </div>
            {terminalCommands.slice(0, 4).map((cmd) => (
              <div key={cmd} className="flex">
                <span className="text-yellow-400 w-24 flex-shrink-0">
                  {cmd}
                </span>
                <span className="text-gray-400">- Available command</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
