#!/usr/bin/env node

/**
 * Build script for portfolio data processing
 * Validates, optimizes, and prepares data for production
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

const fs = require("fs");
const path = require("path");

/**
 * Build script for processing portfolio data
 * Converts development data to production-optimized format
 */

const DATA_DIR = path.join(__dirname, "../public/data");
const PORTFOLIO_DATA_PATH = path.join(DATA_DIR, "portfolio.json");
const PUBLIC_DATA_PATH = path.join(__dirname, "../public/data/portfolio.json");

async function buildPortfolioData() {
  console.log("🏗️  Building portfolio data...");

  try {
    // Ensure public data directory exists
    const publicDataDir = path.dirname(PUBLIC_DATA_PATH);
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }

    // Load portfolio data
    const portfolioData = await loadPortfolioData();

    // Validate data structure
    const isValid = await validateData(portfolioData);
    if (!isValid) {
      throw new Error("Data validation failed");
    }

    // Optimize for production
    const optimizedData = optimizeForProduction(portfolioData);

    // Write to public directory for static export
    fs.writeFileSync(PUBLIC_DATA_PATH, JSON.stringify(optimizedData, null, 2));
    console.log("📁 Copied to public directory for static export");

    // Generate stats
    const stats = generateStats(portfolioData, optimizedData);
    console.log("✅ Enhanced portfolio data built successfully");
    console.log(`📁 Output: ${PUBLIC_DATA_PATH}`);
    console.log(`📊 Stats:`, stats);
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

async function loadPortfolioData() {
  try {
    const data = JSON.parse(fs.readFileSync(PORTFOLIO_DATA_PATH, "utf8"));
    console.log("📖 Loaded portfolio data");
    return data;
  } catch (error) {
    throw new Error(`Failed to load portfolio data: ${error.message}`);
  }
}

async function validateData(data) {
  console.log("🔍 Validating portfolio data structure...");

  const requiredFields = [
    "profile",
    "techStacks",
    "projects",
    "experience",
    "skills",
    "tools",
    "blogs",
    "contacts",
  ];
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    console.error("❌ Missing required fields:", missingFields);
    return false;
  }

  // Validate profile data
  if (!data.profile.full_name || !data.profile.email) {
    console.error("❌ Invalid profile data");
    return false;
  }

  // Validate projects
  if (!Array.isArray(data.projects)) {
    console.error("❌ Projects must be an array");
    return false;
  }

  // Validate experience
  if (!Array.isArray(data.experience)) {
    console.error("❌ Experience must be an array");
    return false;
  }

  // Validate tech stacks
  if (!Array.isArray(data.techStacks)) {
    console.error("❌ Tech stacks must be an array");
    return false;
  }

  // Validate skills
  if (!Array.isArray(data.skills)) {
    console.error("❌ Skills must be an array");
    return false;
  }

  console.log("✅ Enhanced data validation passed");
  return true;
}

function optimizeForProduction(data) {
  console.log("⚡ Optimizing portfolio data for production...");

  return {
    ...data,
    // Add any production-specific optimizations
    // The enhanced data structure is already optimized
  };
}

function generateStats(portfolioData, prodData) {
  const portfolioSize = Buffer.byteLength(
    JSON.stringify(portfolioData),
    "utf8"
  );
  const prodSize = Buffer.byteLength(JSON.stringify(prodData), "utf8");

  return {
    "Portfolio Size": `${(portfolioSize / 1024).toFixed(2)} KB`,
    "Production Size": `${(prodSize / 1024).toFixed(2)} KB`,
    Projects: portfolioData.projects?.length || 0,
    Experience: portfolioData.experience?.length || 0,
    TechStacks: portfolioData.techStacks?.length || 0,
    Skills: portfolioData.skills?.length || 0,
    Tools: portfolioData.tools?.length || 0,
    Blogs: portfolioData.blogs?.length || 0,
  };
}

// Run the build if this script is executed directly
if (require.main === module) {
  buildPortfolioData().catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
}

module.exports = { buildPortfolioData, validateData, optimizeForProduction };
