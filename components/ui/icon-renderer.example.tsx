import React from "react";
import IconRenderer from "./icon-renderer";

// Example usage of the IconRenderer component
const IconRendererExample: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Icon Renderer Examples</h2>

      {/* Basic Usage */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="home" />
          <IconRenderer name="user" />
          <IconRenderer name="settings" />
          <IconRenderer name="heart" />
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="star" size="xs" />
          <IconRenderer name="star" size="sm" />
          <IconRenderer name="star" size="md" />
          <IconRenderer name="star" size="lg" />
          <IconRenderer name="star" size="xl" />
          <IconRenderer name="star" size="2xl" />
        </div>
      </div>

      {/* Custom Sizes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Sizes</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="mail" size={16} />
          <IconRenderer name="mail" size={32} />
          <IconRenderer name="mail" size={48} />
        </div>
      </div>

      {/* Different Variants */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Variants</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="heart" variant="default" />
          <IconRenderer name="heart" variant="outline" />
          <IconRenderer
            name="heart"
            variant="filled"
            className="text-red-500"
          />
        </div>
      </div>

      {/* With Custom Styling */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Custom Styling</h3>
        <div className="flex items-center gap-4">
          <IconRenderer
            name="github"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          />
          <IconRenderer
            name="twitter"
            className="text-blue-400 hover:text-blue-600 transition-colors"
          />
          <IconRenderer
            name="linkedin"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          />
        </div>
      </div>

      {/* With Custom Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Custom Colors</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="palette" color="#ff6b6b" />
          <IconRenderer name="palette" color="#4ecdc4" />
          <IconRenderer name="palette" color="#45b7d1" />
          <IconRenderer name="palette" color="#96ceb4" />
        </div>
      </div>

      {/* Different Stroke Widths */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Different Stroke Widths</h3>
        <div className="flex items-center gap-4">
          <IconRenderer name="circle" strokeWidth={1} />
          <IconRenderer name="circle" strokeWidth={2} />
          <IconRenderer name="circle" strokeWidth={3} />
          <IconRenderer name="circle" strokeWidth={4} />
        </div>
      </div>

      {/* Common Icons */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Common Icons</h3>
        <div className="grid grid-cols-8 gap-4">
          {[
            "home",
            "user",
            "settings",
            "search",
            "mail",
            "phone",
            "calendar",
            "clock",
            "heart",
            "star",
            "bookmark",
            "share",
            "download",
            "upload",
            "edit",
            "trash",
            "plus",
            "minus",
            "check",
            "x",
            "arrow-left",
            "arrow-right",
            "arrow-up",
            "arrow-down",
            "github",
            "twitter",
            "linkedin",
            "facebook",
            "instagram",
            "youtube",
            "discord",
            "slack",
          ].map((iconName) => (
            <div key={iconName} className="flex flex-col items-center gap-1">
              <IconRenderer name={iconName} size="lg" />
              <span className="text-xs text-gray-500">{iconName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconRendererExample;
