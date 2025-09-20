# Portfolio Converter Utility

A comprehensive utility for converting portfolio data to various formats including JSON, Markdown, CSV, and plain text summary.

## Features

- **Multiple Format Support**: Convert portfolio data to JSON, Markdown, CSV, and summary formats
- **Download Functionality**: Direct download of converted data as files
- **React Hook Integration**: Easy-to-use React hook for components
- **Type Safety**: Full TypeScript support with proper type definitions
- **Flexible API**: Both class-based and utility function approaches

## Usage

### Class-based Approach

```typescript
import { PortfolioConverter } from "@/lib/utils/portfolio-converter";
import type { EnhancedPortfolio } from "@/types/portfolio";

const portfolio: EnhancedPortfolio = {
  /* your portfolio data */
};
const converter = new PortfolioConverter(portfolio);

// Convert to different formats
const jsonData = converter.toJSON();
const markdownData = converter.toMarkdown();
const csvData = converter.toCSV();
const summaryData = converter.toSummary();

// Download files
converter.downloadAs("json", "my-portfolio.json");
converter.downloadAs("markdown", "my-portfolio.md");
converter.downloadAs("csv", "my-portfolio.csv");
converter.downloadAs("summary", "my-summary.txt");
```

### Utility Functions Approach

```typescript
import { PortfolioUtils } from "@/lib/utils/portfolio-converter";

// Quick conversions
const jsonData = PortfolioUtils.toJSON(portfolio);
const markdownData = PortfolioUtils.toMarkdown(portfolio);

// Quick downloads
PortfolioUtils.downloadAsJSON(portfolio, "my-portfolio.json");
PortfolioUtils.downloadAsMarkdown(portfolio, "my-portfolio.md");
```

### React Hook Approach

```typescript
import { usePortfolioConverter } from "@/hooks/use-portfolio-converter";

function MyComponent() {
  const { portfolio } = usePortfolioContext();
  const {
    toJSON,
    toMarkdown,
    downloadAsJSON,
    downloadAsMarkdown,
    isAvailable,
  } = usePortfolioConverter(portfolio);

  if (!isAvailable) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => downloadAsJSON()}>Download as JSON</button>
      <button onClick={() => downloadAsMarkdown()}>Download as Markdown</button>
    </div>
  );
}
```

## API Reference

### PortfolioConverter Class

#### Constructor

- `new PortfolioConverter(portfolio: EnhancedPortfolio)`

#### Methods

##### Conversion Methods

- `toJSON(): string` - Convert to JSON format
- `toMarkdown(): string` - Convert to Markdown format
- `toCSV(): string` - Convert to CSV format
- `toSummary(): string` - Convert to summary format
- `toSimplifiedJSON(): string` - Convert to simplified JSON format

##### Download Methods

- `downloadAs(format: 'json' | 'markdown' | 'csv' | 'summary', filename?: string): void`

### PortfolioUtils Object

#### Functions

- `createConverter(portfolio: EnhancedPortfolio): PortfolioConverter`
- `toJSON(portfolio: EnhancedPortfolio): string`
- `toMarkdown(portfolio: EnhancedPortfolio): string`
- `toCSV(portfolio: EnhancedPortfolio): string`
- `toSummary(portfolio: EnhancedPortfolio): string`
- `downloadAsJSON(portfolio: EnhancedPortfolio, filename?: string): void`
- `downloadAsMarkdown(portfolio: EnhancedPortfolio, filename?: string): void`
- `downloadAsCSV(portfolio: EnhancedPortfolio, filename?: string): void`
- `downloadAsSummary(portfolio: EnhancedPortfolio, filename?: string): void`

### usePortfolioConverter Hook

#### Parameters

- `portfolio: EnhancedPortfolio | null`

#### Returns

- `converter: PortfolioConverter | null`
- `toJSON: () => string`
- `toMarkdown: () => string`
- `toCSV: () => string`
- `toSummary: () => string`
- `downloadAs: (format, filename?) => void`
- `downloadAsJSON: (filename?) => void`
- `downloadAsMarkdown: (filename?) => void`
- `downloadAsCSV: (filename?) => void`
- `downloadAsSummary: (filename?) => void`
- `isAvailable: boolean`

## Format Examples

### JSON Format

```json
{
  "id": "portfolio-123",
  "profile": {
    "full_name": "John Doe",
    "email": "john@example.com",
    "description": "Full-stack developer..."
  },
  "projects": [...],
  "experience": [...],
  "skills": [...],
  "tools": [...],
  "techStacks": [...],
  "blogs": [...]
}
```

### Markdown Format

```markdown
# John Doe

**Full-stack developer with 5+ years of experience...**

📧 john@example.com | 📱 +1234567890 | 📍 New York, NY

## Professional Experience

### 1. Senior Developer at Tech Corp

**Duration**: 2020 - Present
**Type**: Full_Time

Led development of web applications...

## Key Projects

### 1. E-commerce Platform

Built a modern e-commerce solution...

🔗 **Project Link**: https://example.com
```

### CSV Format

```csv
Section,Field,Value
Profile,Full Name,"John Doe"
Profile,Email,"john@example.com"
Experience,Company,Role,Job Type,Start Date,End Date,Description
Experience,"Tech Corp","Senior Developer","Full_Time","2020","Present","Led development..."
```

### Summary Format

```
Portfolio Summary for John Doe
=====================================

📧 john@example.com
📍 New York, NY

Professional Summary:
Full-stack developer with 5+ years of experience...

📊 Statistics:
- Experience: 3 positions
- Projects: 5 projects
- Skills: 15 skills
- Tools: 10 tools
- Tech Stacks: 20 technologies
- Blog Posts: 3 articles
```

## API Endpoints

### GET /api/portfolio/export

Export portfolio data in various formats.

#### Query Parameters

- `format` (optional): Export format (`json`, `markdown`, `csv`, `summary`). Default: `json`
- `id` (optional): Portfolio ID. Default: `portfolio-mikiyas`

#### Examples

```
GET /api/portfolio/export?format=json
GET /api/portfolio/export?format=markdown&id=portfolio-123
GET /api/portfolio/export?format=csv
```

#### Response

Returns the portfolio data in the requested format as a downloadable file.

## Error Handling

The utility includes comprehensive error handling:

- **Invalid Portfolio Data**: Returns empty strings for conversion methods
- **Download Errors**: Logs errors to console
- **Format Validation**: Validates format parameters
- **File Creation**: Handles file creation and download errors gracefully

## Dependencies

- React (for hooks)
- TypeScript (for type safety)
- Lucide React (for icons in demo components)

## Browser Support

- Modern browsers with ES6+ support
- File download functionality requires modern browser APIs
- Clipboard API for copy functionality (optional)

## License

This utility is part of the portfolio project and follows the same license terms.
