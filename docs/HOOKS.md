# Hooks Documentation

This document provides comprehensive documentation for all custom React hooks in the Ultimate Portfolio Website.

## Table of Contents

- [usePortfolioData](#useportfoliodata)
- [usePortfolioDataReadOnly](#useportfoliodatareadonly)
- [usePortfolioActions](#useportfolioactions)
- [usePortfolioStoreDirect](#useportfoliostoredirect)

## usePortfolioData

The main portfolio management hook that provides comprehensive CRUD operations with optimistic updates, error handling, and user feedback via toast notifications.

### Usage

```tsx
import { usePortfolioData } from "@/hooks/use-portfolio-data";

function PortfolioEditor() {
  const { portfolio, isLoading, updateProfile, addProject } =
    usePortfolioData();

  const handleSave = async () => {
    await updateProfile({ full_name: "New Name" });
  };

  return (
    <div>
      {isLoading ? "Loading..." : portfolio?.profile.full_name}
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
```

### Returns

- `portfolio: EnhancedPortfolio | null` - Current portfolio data
- `isLoading: boolean` - Loading state
- `error: string | null` - Current error message
- `loadPortfolio: () => Promise<void>` - Load portfolio from API
- `retry: () => Promise<void>` - Retry failed operations
- `updateProfile: (updates: Partial<Profile>) => Promise<void>` - Update profile information
- `addExperience: () => Promise<void>` - Add new work experience
- `updateExperience: (index: number, updates: Partial<Experience>) => Promise<void>` - Update existing experience
- `removeExperience: (index: number) => Promise<void>` - Remove experience
- `addProject: () => Promise<void>` - Add new project
- `updateProject: (index: number, updates: Partial<Project>) => Promise<void>` - Update existing project
- `removeProject: (index: number) => Promise<void>` - Remove project
- `updateSkills: (skills: Skill[]) => Promise<void>` - Update skills list
- `updateTools: (tools: Tool[]) => Promise<void>` - Update tools list
- `exportJSON: () => string` - Export portfolio as JSON
- `importJSON: (jsonString: string) => boolean` - Import portfolio from JSON
- `resetToDefault: () => Promise<void>` - Reset to default portfolio

## usePortfolioDataReadOnly

Read-only access to portfolio data. Use this in display components that only need to show data.

### Usage

```tsx
import { usePortfolioDataReadOnly } from "@/hooks/use-portfolio-data";

function PortfolioDisplay() {
  const { portfolio, isLoading, error } = usePortfolioDataReadOnly();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!portfolio) return <div>No portfolio found</div>;

  return <div>{portfolio.profile.full_name}</div>;
}
```

### Returns

- `portfolio: EnhancedPortfolio | null` - Current portfolio data
- `isLoading: boolean` - Loading state
- `error: string | null` - Current error message

## usePortfolioActions

Hook that provides only CRUD operations. Use this in admin/management components that need to modify data.

### Usage

```tsx
import { usePortfolioActions } from "@/hooks/use-portfolio-data";

function AdminPanel() {
  const { updateProfile, addProject } = usePortfolioActions();

  const handleSave = async () => {
    await updateProfile({ full_name: "New Name" });
  };

  return <button onClick={handleSave}>Save Changes</button>;
}
```

### Returns

- `updateProfile: (updates: Partial<Profile>) => Promise<void>` - Update profile information
- `addExperience: () => Promise<void>` - Add new work experience
- `updateExperience: (index: number, updates: Partial<Experience>) => Promise<void>` - Update existing experience
- `removeExperience: (index: number) => Promise<void>` - Remove experience
- `addProject: () => Promise<void>` - Add new project
- `updateProject: (index: number, updates: Partial<Project>) => Promise<void>` - Update existing project
- `removeProject: (index: number) => Promise<void>` - Remove project
- `updateSkills: (skills: Skill[]) => Promise<void>` - Update skills list
- `updateTools: (tools: Tool[]) => Promise<void>` - Update tools list
- `exportJSON: () => string` - Export portfolio as JSON
- `importJSON: (jsonString: string) => boolean` - Import portfolio from JSON
- `resetToDefault: () => Promise<void>` - Reset to default portfolio

## usePortfolioStoreDirect

Direct access to portfolio store. **Deprecated** - Use `usePortfolioData()` instead for better type safety.

### Usage

```tsx
import { usePortfolioStoreDirect } from "@/hooks/use-portfolio-data";

function CustomComponent() {
  const store = usePortfolioStoreDirect();
  // Direct store access - use with caution
}
```

### Returns

- Direct access to the Zustand store

## Error Handling

All hooks include comprehensive error handling:

- **Optimistic Updates**: UI updates immediately, rolls back on error
- **Toast Notifications**: User-friendly success/error messages
- **Error States**: Clear error messages in the store
- **Retry Functionality**: Easy retry for failed operations

## Performance Considerations

- **Memoized Callbacks**: All functions are wrapped in `useCallback` for performance
- **Optimistic Updates**: Immediate UI feedback without waiting for API
- **Cache Management**: Automatic cache invalidation after updates
- **Loading States**: Prevents duplicate API calls during loading

## Type Safety

All hooks are fully typed with TypeScript:

```tsx
// Full type safety
const { portfolio } = usePortfolioData();
// portfolio is typed as EnhancedPortfolio | null

// Function parameters are typed
const updateProfile = (updates: Partial<Profile>) => {
  // updates is typed as Partial<Profile>
};
```

## Best Practices

1. **Use the right hook for your use case**:

   - `usePortfolioData` for full functionality
   - `usePortfolioDataReadOnly` for display components
   - `usePortfolioActions` for admin components

2. **Handle loading and error states**:

   ```tsx
   if (isLoading) return <LoadingSpinner />;
   if (error) return <ErrorMessage error={error} />;
   ```

3. **Use async/await for operations**:

   ```tsx
   const handleUpdate = async () => {
     try {
       await updateProfile({ full_name: "New Name" });
     } catch (error) {
       // Error is handled by the hook
     }
   };
   ```

4. **Leverage optimistic updates**:
   - UI updates immediately
   - Errors are handled gracefully
   - Users get instant feedback

## Examples

### Complete Portfolio Management

```tsx
function PortfolioManager() {
  const {
    portfolio,
    isLoading,
    error,
    loadPortfolio,
    updateProfile,
    addExperience,
    addProject,
    updateSkills,
    exportJSON,
    importJSON,
  } = usePortfolioData();

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const handleExport = () => {
    const json = exportJSON();
    downloadFile(json, "portfolio.json");
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target?.result as string;
      importJSON(json);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {portfolio && (
        <div>
          <h1>{portfolio.profile.full_name}</h1>
          <button onClick={() => addExperience()}>Add Experience</button>
          <button onClick={() => addProject()}>Add Project</button>
          <button onClick={handleExport}>Export</button>
          <input
            type="file"
            onChange={(e) => handleImport(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
}
```

### Read-Only Display

```tsx
function PortfolioCard() {
  const { portfolio, isLoading } = usePortfolioDataReadOnly();

  if (isLoading) return <Skeleton />;
  if (!portfolio) return <div>No portfolio found</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{portfolio.profile.full_name}</CardTitle>
        <CardDescription>{portfolio.profile.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3>Experience</h3>
          {portfolio.experience.map((exp, index) => (
            <div key={index}>
              <h4>{exp.company_name}</h4>
              <p>{exp.role}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
```
