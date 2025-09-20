"use client";

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import {
  Github,
  ExternalLink,
  Heart,
  Code,
  Terminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [showAbout, setShowAbout] = useState(false);

  const repoUrl =
    "https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui";

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-4">
        {/* Simple footer with about button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by Mikiyas Birhanu</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAbout(!showAbout)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Code className="h-4 w-4" />
            About this portfolio
            {showAbout ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Expandable about section */}
        {showAbout && (
          <div className="mt-4 pt-4 border-t">
            <Card>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      About This Portfolio
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A modern, interactive portfolio built with Next.js,
                      TypeScript, and Tailwind CSS. Features a unique terminal
                      interface, CV view, and responsive design.
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Terminal Interface</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Modern Tech Stack</span>
                    </div>
                    <div className="text-muted-foreground">
                      Built with Next.js 14, TypeScript, Tailwind CSS, and
                      Shadcn/ui components.
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Source Code</h4>
                    <p className="text-sm text-muted-foreground">
                      This portfolio is open source and available on GitHub.
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="gap-2"
                    >
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        View Repository
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      <code className="bg-muted px-2 py-1 rounded text-xs">
                        codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui
                      </code>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Connect</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="gap-2"
                      >
                        <a
                          href="https://github.com/codewithmikee"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="gap-2"
                      >
                        <a
                          href="https://linkedin.com/in/mikiyas-birhanu-957b71131"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </footer>
  );
}
