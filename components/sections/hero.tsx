/**
 * Hero section component
 * Displays the main introduction and call-to-action
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useEnhancedPortfolioData } from "@/lib/hooks/use-portfolio-data";
import Image from "next/image";

export function Hero() {
  const { data, loading } = useEnhancedPortfolioData();

  if (loading || !data) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded mb-8 w-3/4 mx-auto"></div>
              <div className="h-4 bg-muted rounded mb-12 w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { profile } = data;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src={
                profile.profile_picture ||
                "/placeholder.svg?height=150&width=150&query=professional developer avatar"
              }
              alt={profile.full_name}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-6 border-4 border-primary/20"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Hi, I'm <span className="text-primary">{profile.full_name}</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Full Stack Developer
          </h2>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            {profile.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={scrollToContact}
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="lg" asChild>
                <a
                  href={
                    profile.contacts.find((c) => c.name === "GitHub")?.link ||
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a
                  href={
                    profile.contacts.find((c) => c.name === "LinkedIn")?.link ||
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={scrollToAbout}
            className="animate-bounce"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
