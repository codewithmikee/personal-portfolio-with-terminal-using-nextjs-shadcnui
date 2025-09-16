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
const PORTFOLIO_DATA_PATH = path.join(DATA_DIR, "portfolio/portfolio.json");
const PUBLIC_DATA_PATH = path.join(__dirname, "../public/data/portfolio.json");

async function validatePortfolioData() {
  console.log("🔍 Validating portfolio data...");

  try {
    // Validate portfolio data
    console.log("\n📖 Validating portfolio data...");
    const portfolioData = await loadAndValidateData(PORTFOLIO_DATA_PATH);

    // Validate public data if it exists
    if (fs.existsSync(PUBLIC_DATA_PATH)) {
      console.log("\n📖 Validating public data...");
      const publicData = await loadAndValidateData(PUBLIC_DATA_PATH);
    } else {
      console.log("⚠️  Public data not found. Run build-data.js first.");
    }

    console.log("\n✅ All portfolio data validation passed!");
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
    "profile",
    "techStacks",
    "projects",
    "experience",
    "skills",
    "tools",
    "blogs",
    "contacts",
  ];
  requiredFields.forEach((field) => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Validate profile data
  const profile = data.profile;
  if (!profile.full_name || !profile.email || !profile.description) {
    errors.push("Invalid profile data structure");
  }

  // Validate tech stacks
  if (!Array.isArray(data.techStacks)) {
    errors.push("Tech stacks must be an array");
  } else {
    data.techStacks.forEach((tech, index) => {
      if (!tech.title || !tech.key || !tech.level || !tech.type) {
        errors.push(`Invalid tech stack at index ${index}`);
      }
    });
  }

  // Validate projects
  if (!Array.isArray(data.projects)) {
    errors.push("Projects must be an array");
  } else {
    data.projects.forEach((project, index) => {
      if (!project.title || !project.description || !project.link) {
        errors.push(`Invalid project at index ${index}`);
      }
    });
  }

  // Validate experience
  if (!Array.isArray(data.experience)) {
    errors.push("Experience must be an array");
  } else {
    data.experience.forEach((exp, index) => {
      if (!exp.company_name || !exp.role || !exp.start_date) {
        errors.push(`Invalid experience at index ${index}`);
      }
    });
  }

  // Validate skills
  if (!Array.isArray(data.skills)) {
    errors.push("Skills must be an array");
  } else {
    data.skills.forEach((skill, index) => {
      if (!skill.title) {
        errors.push(`Invalid skill at index ${index}`);
      }
    });
  }

  // Validate tools
  if (!Array.isArray(data.tools)) {
    errors.push("Tools must be an array");
  }

  // Validate blogs
  if (!Array.isArray(data.blogs)) {
    errors.push("Blogs must be an array");
  }

  // Validate contacts
  if (!Array.isArray(data.contacts)) {
    errors.push("Contacts must be an array");
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
