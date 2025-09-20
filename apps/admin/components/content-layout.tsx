"use client";

import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { StepperNavigation } from "@/components/stepper-navigation";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-transparent">
      {/* Desktop: Layout with stepper on left */}
      <div className="hidden md:flex h-full">
        {/* Desktop Stepper - part of layout flow */}
        <div className="w-20 flex-shrink-0 flex items-center justify-center">
          <StepperNavigation />
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </div>
      </div>

      {/* Mobile: Layout with fixed stepper */}
      <div className="md:hidden h-full">
        {/* Mobile Stepper - fixed positioned */}
        <StepperNavigation />

        {/* Main content area with right padding for stepper */}
        <div className="h-full overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 pr-16">{children}</div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
