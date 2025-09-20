import React from "react";
import IconRenderer from "@workspace/ui/components/icon-renderer";

const IconDemoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Icon Renderer Demo</h1>
          <p className="text-muted-foreground text-lg">
            A flexible component for rendering Lucide React icons dynamically by
            name.
          </p>
        </div>

        {/* Basic Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
          <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
            <IconRenderer name="home" />
            <IconRenderer name="user" />
            <IconRenderer name="settings" />
            <IconRenderer name="heart" />
            <IconRenderer name="star" />
            <IconRenderer name="mail" />
          </div>
        </section>

        {/* Different Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Different Sizes</h2>
          <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="xs" />
              <span className="text-xs text-muted-foreground">xs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="sm" />
              <span className="text-xs text-muted-foreground">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="md" />
              <span className="text-xs text-muted-foreground">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="lg" />
              <span className="text-xs text-muted-foreground">lg</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="xl" />
              <span className="text-xs text-muted-foreground">xl</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="star" size="2xl" />
              <span className="text-xs text-muted-foreground">2xl</span>
            </div>
          </div>
        </section>

        {/* Different Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Different Variants</h2>
          <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="heart" variant="default" size="lg" />
              <span className="text-xs text-muted-foreground">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer name="heart" variant="outline" size="lg" />
              <span className="text-xs text-muted-foreground">outline</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <IconRenderer
                name="heart"
                variant="filled"
                size="lg"
                className="text-red-500"
              />
              <span className="text-xs text-muted-foreground">filled</span>
            </div>
          </div>
        </section>

        {/* Social Icons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Social Icons</h2>
          <div className="flex items-center gap-6 p-6 bg-card rounded-lg border">
            <IconRenderer
              name="github"
              size="lg"
              className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            />
            <IconRenderer
              name="twitter"
              size="lg"
              className="text-blue-400 hover:text-blue-600 transition-colors cursor-pointer"
            />
            <IconRenderer
              name="linkedin"
              size="lg"
              className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            />
            <IconRenderer
              name="facebook"
              size="lg"
              className="text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
            />
            <IconRenderer
              name="instagram"
              size="lg"
              className="text-pink-500 hover:text-pink-700 transition-colors cursor-pointer"
            />
            <IconRenderer
              name="youtube"
              size="lg"
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
            />
          </div>
        </section>

        {/* Common Icons Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Common Icons</h2>
          <div className="grid grid-cols-8 gap-4 p-6 bg-card rounded-lg border">
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
              <div
                key={iconName}
                className="flex flex-col items-center gap-2 p-2 hover:bg-muted rounded"
              >
                <IconRenderer name={iconName} size="lg" />
                <span className="text-xs text-muted-foreground text-center">
                  {iconName}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Code Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Usage Example</h2>
          <div className="p-6 bg-card rounded-lg border">
            <pre className="text-sm overflow-x-auto">
              <code>{`import IconRenderer from "@workspace/ui/components/icon-renderer";

// Basic usage
<IconRenderer name="home" />

// With size and styling
<IconRenderer 
  name="heart" 
  size="lg" 
  className="text-red-500 hover:text-red-700 transition-colors" 
/>

// Different variants
<IconRenderer name="star" variant="outline" />
<IconRenderer name="star" variant="filled" className="text-yellow-500" />

// Custom size
<IconRenderer name="user" size={32} />`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IconDemoPage;
