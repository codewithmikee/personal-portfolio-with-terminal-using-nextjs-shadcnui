# IconRenderer Component

A flexible React component for rendering Lucide React icons dynamically by name.

## Features

- 🎯 **Dynamic Icon Loading**: Render any Lucide icon by name
- 📏 **Flexible Sizing**: Support for preset sizes and custom dimensions
- 🎨 **Multiple Variants**: Default, outline, and filled styles
- 🛡️ **Type Safety**: Full TypeScript support
- 🔄 **Fallback Handling**: Graceful fallback for missing icons
- 🎛️ **Customizable**: Support for all Lucide icon props

## Installation

The component uses `lucide-react` which is already installed in this project.

## Usage

### Basic Usage

```tsx
import IconRenderer from '@/components/ui/icon-renderer';

// Simple icon
<IconRenderer name="home" />

// With size
<IconRenderer name="user" size="lg" />

// With custom styling
<IconRenderer name="heart" className="text-red-500" />
```

### Props

| Prop          | Type                                 | Default     | Description                                                                            |
| ------------- | ------------------------------------ | ----------- | -------------------------------------------------------------------------------------- |
| `name`        | `string`                             | -           | **Required.** Icon name in kebab-case (e.g., "user-circle", "arrow-right")             |
| `size`        | `number \| string`                   | `"md"`      | Icon size. Can be preset ("xs", "sm", "md", "lg", "xl", "2xl", "3xl") or custom number |
| `className`   | `string`                             | -           | Additional CSS classes                                                                 |
| `color`       | `string`                             | -           | Icon color (overrides className color)                                                 |
| `strokeWidth` | `number`                             | `2`         | Stroke width for outline icons                                                         |
| `variant`     | `"default" \| "outline" \| "filled"` | `"default"` | Icon style variant                                                                     |
| `...props`    | `any`                                | -           | Additional props passed to the Lucide icon                                             |

### Size Presets

| Preset | Size |
| ------ | ---- |
| `xs`   | 12px |
| `sm`   | 16px |
| `md`   | 20px |
| `lg`   | 24px |
| `xl`   | 32px |
| `2xl`  | 40px |
| `3xl`  | 48px |

### Variants

- **`default`**: Standard Lucide icon appearance
- **`outline`**: Enhanced stroke width for better visibility
- **`filled`**: Filled version (removes stroke, uses fill)

## Examples

### Different Sizes

```tsx
<div className="flex items-center gap-4">
  <IconRenderer name="star" size="xs" />
  <IconRenderer name="star" size="sm" />
  <IconRenderer name="star" size="md" />
  <IconRenderer name="star" size="lg" />
  <IconRenderer name="star" size="xl" />
</div>
```

### Custom Styling

```tsx
<IconRenderer
  name="github"
  className="text-gray-600 hover:text-gray-800 transition-colors"
  size="lg"
/>
```

### Different Variants

```tsx
<div className="flex items-center gap-4">
  <IconRenderer name="heart" variant="default" />
  <IconRenderer name="heart" variant="outline" />
  <IconRenderer name="heart" variant="filled" className="text-red-500" />
</div>
```

### With Custom Colors

```tsx
<IconRenderer name="palette" color="#ff6b6b" />
<IconRenderer name="palette" color="#4ecdc4" />
```

## Icon Naming Convention

Icons are referenced using kebab-case names that correspond to Lucide React icon names:

- `user` → `User`
- `user-circle` → `UserCircle`
- `arrow-right` → `ArrowRight`
- `chevron-down` → `ChevronDown`

## Error Handling

If an icon name doesn't exist in Lucide React, the component will:

1. Log a warning to the console
2. Render a fallback `HelpCircle` icon
3. Apply muted styling to indicate the missing icon

## TypeScript Support

The component exports TypeScript types for better development experience:

```tsx
import IconRenderer, {
  IconRendererProps,
  IconSize,
} from "@/components/ui/icon-renderer";
```

## Available Icons

This component supports all icons from the Lucide React library. You can browse available icons at [lucide.dev](https://lucide.dev/icons).

Common icons include:

- `home`, `user`, `settings`, `search`, `mail`, `phone`
- `heart`, `star`, `bookmark`, `share`, `download`, `upload`
- `plus`, `minus`, `check`, `x`, `edit`, `trash`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `github`, `twitter`, `linkedin`, `facebook`, `instagram`
- And many more!
