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

const DATA_DIR = path.join(__dirname, "../data");
const DEV_DATA_PATH = path.join(DATA_DIR, "development/portfolio.json");
const PROD_DATA_PATH = path.join(DATA_DIR, "production/portfolio.json");

async function buildPortfolioData() {
  console.log("🏗️  Building portfolio data...");

  try {
    // Ensure production directory exists
    const prodDir = path.dirname(PROD_DATA_PATH);
    if (!fs.existsSync(prodDir)) {
      fs.mkdirSync(prodDir, { recursive: true });
    }

    // Load development data
    const developmentData = await loadDevelopmentData();

    // Validate data structure
    const isValid = await validateData(developmentData);
    if (!isValid) {
      throw new Error("Data validation failed");
    }

    // Optimize for production
    const optimizedData = optimizeForProduction(developmentData);

    // Write production data
    fs.writeFileSync(PROD_DATA_PATH, JSON.stringify(optimizedData, null, 2));

    // Copy to public directory for static export
    const publicDataDir = path.join(__dirname, "../public/data");
    if (!fs.existsSync(publicDataDir)) {
      fs.mkdirSync(publicDataDir, { recursive: true });
    }

    const publicDataPath = path.join(publicDataDir, "portfolio.json");
    fs.copyFileSync(PROD_DATA_PATH, publicDataPath);
    console.log("📁 Copied to public directory for static export");

    // Generate stats
    const stats = generateStats(developmentData, optimizedData);
    console.log("✅ Portfolio data built successfully");
    console.log(`📁 Output: ${PROD_DATA_PATH}`);
    console.log(`📊 Stats:`, stats);
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

async function loadDevelopmentData() {
  try {
    const data = JSON.parse(fs.readFileSync(DEV_DATA_PATH, "utf8"));
    console.log("📖 Loaded development data");
    return data;
  } catch (error) {
    throw new Error(`Failed to load development data: ${error.message}`);
  }
}

async function validateData(data) {
  console.log("🔍 Validating data structure...");

  const requiredFields = [
    "metadata",
    "personal",
    "projects",
    "experience",
    "skills",
  ];
  const missingFields = requiredFields.filter((field) => !data[field]);

  if (missingFields.length > 0) {
    console.error("❌ Missing required fields:", missingFields);
    return false;
  }

  // Validate personal data
  if (!data.personal.name || !data.personal.title) {
    console.error("❌ Invalid personal data");
    return false;
  }

  // Validate projects
  if (!Array.isArray(data.projects.projects)) {
    console.error("❌ Projects must be an array");
    return false;
  }

  // Validate experience
  if (!Array.isArray(data.experience)) {
    console.error("❌ Experience must be an array");
    return false;
  }

  // Validate skills
  if (!Array.isArray(data.skills.skills)) {
    console.error("❌ Skills must be an array");
    return false;
  }

  console.log("✅ Data validation passed");
  return true;
}

function optimizeForProduction(data) {
  console.log("⚡ Optimizing data for production...");

  return {
    ...data,
    metadata: {
      ...data.metadata,
      build_date: new Date().toISOString(),
      environment: "production",
      optimized: true,
      version: data.metadata.version || "1.0.0",
    },
    // Remove any development-only fields
    // Add any production-specific optimizations
  };
}

function generateStats(devData, prodData) {
  const devSize = Buffer.byteLength(JSON.stringify(devData), "utf8");
  const prodSize = Buffer.byteLength(JSON.stringify(prodData), "utf8");

  return {
    "Dev Size": `${(devSize / 1024).toFixed(2)} KB`,
    "Prod Size": `${(prodSize / 1024).toFixed(2)} KB`,
    Projects: devData.projects?.projects?.length || 0,
    Experience: devData.experience?.length || 0,
    Skills: devData.skills?.skills?.length || 0,
    Compression: `${(((devSize - prodSize) / devSize) * 100).toFixed(1)}%`,
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
