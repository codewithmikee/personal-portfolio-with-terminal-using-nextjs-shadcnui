#!/usr/bin/env node

/**
 * Data validation script for portfolio data
 * Validates JSON data structure against TypeScript schemas
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

const fs = require("fs");
const path = require("path");

/**
 * Data validation script
 * Validates portfolio data structure and content
 */

const DATA_DIR = path.join(__dirname, "../data");
const DEV_DATA_PATH = path.join(DATA_DIR, "development/portfolio.json");
const PROD_DATA_PATH = path.join(DATA_DIR, "production/portfolio.json");

async function validatePortfolioData() {
  console.log("🔍 Validating portfolio data...");

  try {
    // Validate development data
    console.log("\n📖 Validating development data...");
    const devData = await loadAndValidateData(DEV_DATA_PATH);

    // Validate production data if it exists
    if (fs.existsSync(PROD_DATA_PATH)) {
      console.log("\n📖 Validating production data...");
      const prodData = await loadAndValidateData(PROD_DATA_PATH);
    } else {
      console.log("⚠️  Production data not found. Run build-data.js first.");
    }

    console.log("\n✅ All data validation passed!");
  } catch (error) {
    console.error("\n❌ Validation failed:", error.message);
    process.exit(1);
  }
}

async function loadAndValidateData(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const validation = await validateDataStructure(data);

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(", ")}`);
    }

    console.log("✅ Data structure is valid");
    return data;
  } catch (error) {
    throw new Error(`Failed to load ${filePath}: ${error.message}`);
  }
}

async function validateDataStructure(data) {
  const errors = [];

  // Check required top-level fields
  const requiredFields = [
    "metadata",
    "personal",
    "projects",
    "experience",
    "skills",
  ];
  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate metadata
  if (!data.metadata.version || !data.metadata.last_updated) {
    errors.push("Invalid metadata structure");
  }

  // Validate personal data
  const personal = data.personal;
  if (!personal.name || !personal.title || !personal.bio) {
    errors.push("Invalid personal data structure");
  }

  // Validate projects
  if (!Array.isArray(data.projects.projects)) {
    errors.push("Projects must be an array");
  } else {
    data.projects.projects.forEach((project, index) => {
      if (!project.id || !project.title || !project.description) {
        errors.push(`Invalid project at index ${index}`);
      }
    });
  }

  // Validate experience
  if (!Array.isArray(data.experience)) {
    errors.push("Experience must be an array");
  } else {
    data.experience.forEach((exp, index) => {
      if (!exp.id || !exp.company || !exp.position) {
        errors.push(`Invalid experience at index ${index}`);
      }
    });
  }

  // Validate skills
  if (!Array.isArray(data.skills.skills)) {
    errors.push("Skills must be an array");
  } else {
    data.skills.skills.forEach((skill, index) => {
      if (!skill.name || !skill.level || !skill.category) {
        errors.push(`Invalid skill at index ${index}`);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
}

// Run validation if this script is executed directly
if (require.main === module) {
  validatePortfolioData().catch((error) => {
    console.error("Validation failed:", error);
    process.exit(1);
  });
}

module.exports = { validatePortfolioData, validateDataStructure };
