#!/bin/bash
# migration.sh

echo "Updating imports..."

# Replace usePortfolioStore imports in admin components
find components/admin -name "*.tsx" -type f -exec sed -i 's/usePortfolioStore/usePortfolioData/g' {} \;

# Update imports in manage page
find app/manage -name "*.tsx" -type f -exec sed -i 's/usePortfolioStore/usePortfolioData/g' {} \;

echo "Migration complete. Please verify the changes."
