import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconRendererProps {
  name: string;
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  variant?: "default" | "outline" | "filled";
  [key: string]: any; // Allow other props to be passed through
}

// Type for valid Lucide icon names
type LucideIconName = keyof typeof LucideIcons;

// Common icon size presets
const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
} as const;

type IconSize = keyof typeof iconSizes | number | string;

const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  size = "md",
  className,
  color,
  strokeWidth = 2,
  variant = "default",
  ...props
}) => {
  // Convert kebab-case to PascalCase for Lucide icon names
  const iconName = name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("") as LucideIconName;

  // Get the icon component from Lucide
  const IconComponent = LucideIcons[iconName] as React.ComponentType<any>;

  // Handle size - convert preset to number or use provided value
  const iconSize =
    typeof size === "string" && size in iconSizes
      ? iconSizes[size as keyof typeof iconSizes]
      : size;

  // If icon doesn't exist, return a fallback
  if (!IconComponent) {
    console.warn(
      `Icon "${name}" not found in Lucide React. Using fallback icon.`
    );
    const FallbackIcon = LucideIcons.HelpCircle as React.ComponentType<any>;
    return (
      <FallbackIcon
        size={iconSize}
        className={cn("text-muted-foreground", className)}
        strokeWidth={strokeWidth}
        {...props}
      />
    );
  }

  // Apply variant-based styling
  const variantClasses = {
    default: "",
    outline: "stroke-2",
    filled: "fill-current stroke-0",
  };

  return (
    <IconComponent
      size={iconSize}
      className={cn(variantClasses[variant], className)}
      color={color}
      strokeWidth={variant === "filled" ? 0 : strokeWidth}
      {...props}
    />
  );
};

// Export the component and types
export default IconRenderer;
export type { IconRendererProps, IconSize };
