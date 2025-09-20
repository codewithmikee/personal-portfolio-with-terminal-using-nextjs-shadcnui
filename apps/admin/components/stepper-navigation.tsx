"use client";

import { useState, useEffect, useRef, ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { User, Briefcase, Code, BookOpen, Mail, Home } from "lucide-react";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";

interface StepperNavigationProps {
  className?: string;
}

interface Section {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home", icon: Home, href: "#hero" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "projects", label: "Projects", icon: Code, href: "#projects" },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    href: "#experience",
  },
  { id: "skills", label: "Skills", icon: BookOpen, href: "#skills" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

// StepperLine: renders the connecting line between steps
function StepperLine({
  isActive,
  isLast,
  index,
}: {
  isActive: boolean;
  isLast: boolean;
  index: number;
}) {
  if (isLast) return null;
  return (
    <div
      className={cn(
        "absolute transition-all duration-300",
        // Desktop: vertical line
        "md:left-1/2 md:-translate-x-1/2 md:top-8 md:w-0.5 md:h-6",
        // Mobile: vertical line (same as desktop for vertical layout)
        "left-1/2 -translate-x-1/2 top-8 w-0.5 h-6",
        isActive ? "bg-primary" : "bg-muted"
      )}
    />
  );
}

// StepperButton: renders the button for each step
function StepperButton({
  section,
  isActive,
  onClick,
  isFocused,
}: {
  section: Section;
  isActive: boolean;
  onClick: () => void;
  isFocused: boolean;
}) {
  const Icon = section.icon;
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "relative transition-all duration-300 group",
        // Desktop: circular button
        "md:h-10 md:w-10 md:rounded-full md:p-0",
        // Mobile: very tiny button
        "h-3 w-3 px-0 rounded-full",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg scale-110"
          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105"
        // Focus state
        // !isFocused && "opacity-30 hover:opacity-100"
      )}
    >
      <Icon
        className={cn(
          "transition-all duration-300",
          // Desktop: larger icon
          "md:h-5 md:w-5",
          // Mobile: very tiny icon
          "h-2 w-2"
        )}
      />
    </Button>
  );
}

// StepperLabel: renders the label for each step
function StepperLabel({
  label,
  isActive,
  isFocused,
}: {
  label: string;
  isActive: boolean;
  isFocused: boolean;
}) {
  return (
    <span
      className={cn(
        "transition-all duration-300 font-medium",
        // Desktop: below icon
        "md:mt-2 md:text-center md:text-xs",
        // Mobile: below icon, very small, truncated
        "mt-1 text-center text-[7px] leading-tight max-w-[20px] overflow-hidden whitespace-nowrap",
        isActive ? "text-primary" : "text-muted-foreground"
        // Focus state
        // !isFocused && "opacity-30"
      )}
      title={label} // Show full label on hover
    >
      {/* Show only first 3 characters on mobile screens */}
      <span className="md:hidden">{label.substring(0, 3)}</span>
      <span className="hidden md:inline">{label}</span>
    </span>
  );
}

// StepperActiveDot: renders the active indicator dot for mobile
function StepperActiveDot({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;
  return (
    <div
      className={cn(
        "absolute transition-all duration-300",
        // Desktop: no dot
        "lg:hidden",
        // Mobile: small dot
        "w-1 h-1 bg-primary rounded-full -top-1 -right-1"
      )}
    />
  );
}

// StepperItem: combines all stepper subcomponents for a section
function StepperItem({
  section,
  isActive,
  isLast,
  onClick,
  index,
  isFocused,
}: {
  section: Section;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
  index: number;
  isFocused: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex w-fit",
        // Desktop: vertical layout
        "md:flex-col",
        // Mobile: vertical layout, very compact
        "flex-col items-center justify-center min-w-0"
      )}
    >
      {/* <StepperLine isActive={isActive} isLast={isLast} index={index} /> */}
      <StepperButton
        section={section}
        isActive={isActive}
        onClick={onClick}
        isFocused={isFocused}
      />
      <StepperLabel
        label={section.label}
        isActive={isActive}
        isFocused={isFocused}
      />
      <StepperActiveDot isActive={isActive} />
    </div>
  );
}

export function StepperNavigation({ className }: StepperNavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll to section function
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      const element = document.querySelector(section.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isScrolling]);

  // Focus management
  useEffect(() => {
    const handleMouseEnter = () => setIsFocused(true);
    const handleMouseLeave = () => setIsFocused(false);

    const stepper = stepperRef.current;
    if (stepper) {
      stepper.addEventListener("mouseenter", handleMouseEnter);
      stepper.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (stepper) {
        stepper.removeEventListener("mouseenter", handleMouseEnter);
        stepper.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const MobileStepper = () => {
    return (
      <div
        className={cn(
          "fixed md:hidden right-1 top-1/2 -translate-y-1/2 flex-col justify-center items-center space-y-1 z-50 w-fit",
          isFocused ? "opacity-100" : "opacity-60 hover:opacity-100"
        )}
      >
        {sections.map((section, index) => (
          <StepperItem
            key={section.id}
            section={section}
            isActive={activeSection === section.id}
            isLast={index === sections.length - 1}
            onClick={() => scrollToSection(section.href)}
            index={index}
            isFocused={isFocused}
          />
        ))}
      </div>
    );
  };

  const DesktopStepper = () => {
    return (
      <div className="hidden md:flex justify-center items-center sticky left-4 top-1/2 -translate-y-1/2 flex-col space-y-2 z-40">
        {sections.map((section, index) => (
          <StepperItem
            key={section.id}
            section={section}
            isActive={activeSection === section.id}
            isLast={index === sections.length - 1}
            onClick={() => scrollToSection(section.href)}
            index={index}
            isFocused={isFocused}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={stepperRef}
      className={cn(
        "transition-all duration-300"
        // Desktop: sticky positioning, part of layout flow
        // "lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:space-y-2 lg:z-40",
        // // Mobile: fixed positioning, right side
        // "fixed right-4 top-1/2 -translate-y-1/2 flex-row space-x-1 z-50",
        // // Focus state - only on mobile
        // isFocused
        //   ? "opacity-100"
        //   : "opacity-80 sm:opacity-100 hover:opacity-100",
        // className
      )}
    >
      <MobileStepper />
      <DesktopStepper />
    </div>
  );
}
