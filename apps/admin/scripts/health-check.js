#!/usr/bin/env node

/**
 * Health check script for post-deployment verification
 * Validates database connectivity, API endpoints, and essential services
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

const fs = require("fs");
const path = require("path");

async function runHealthCheck() {
  console.log("🏥 Running post-deployment health check...");

  const checks = [
    checkDatabaseConnection,
    checkDataFiles,
    checkAPIEndpoints,
    checkEnvironmentVariables,
    checkPrismaGeneration,
  ];

  let allPassed = true;

  for (const check of checks) {
    try {
      await check();
    } catch (error) {
      console.error(`❌ Health check failed: ${error.message}`);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log("✅ All health checks passed! Deployment is ready.");
    process.exit(0);
  } else {
    console.error(
      "❌ Some health checks failed. Please review and fix issues."
    );
    process.exit(1);
  }
}

async function checkDatabaseConnection() {
  console.log("🔍 Checking database connection...");

  try {
    // Dynamic import for ESM compatibility
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    // Test connection with a simple query
    await prisma.$connect();
    await prisma.$disconnect();

    console.log("✅ Database connection successful");
  } catch (error) {
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

async function checkDataFiles() {
  console.log("🔍 Checking essential data files...");

  const requiredFiles = [
    path.join(__dirname, "../public/data/portfolio.json"),
    path.join(__dirname, "../prisma/schema.prisma"),
  ];

  for (const filePath of requiredFiles) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required file missing: ${filePath}`);
    }

    // Check if portfolio.json is valid JSON
    if (filePath.endsWith("portfolio.json")) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        JSON.parse(content);
      } catch (error) {
        throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
      }
    }
  }

  console.log("✅ All required data files are present and valid");
}

async function checkAPIEndpoints() {
  console.log("🔍 Checking API endpoints availability...");

  // For local health check, we'll just verify the API structure exists
  const apiDir = path.join(__dirname, "../app/api");

  if (!fs.existsSync(apiDir)) {
    throw new Error("API directory not found");
  }

  const requiredEndpoints = [
    path.join(apiDir, "portfolios"),
    path.join(apiDir, "portfolio"),
  ];

  for (const endpoint of requiredEndpoints) {
    if (!fs.existsSync(endpoint)) {
      throw new Error(`API endpoint directory missing: ${endpoint}`);
    }
  }

  console.log("✅ API endpoints structure is valid");
}

async function checkEnvironmentVariables() {
  console.log("🔍 Checking environment variables...");

  const requiredEnvVars = ["DATABASE_URL"];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingVars.join(", ")}`);
  }

  // Validate DATABASE_URL format for PostgreSQL
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://")) {
    throw new Error(
      "DATABASE_URL must be a valid PostgreSQL connection string"
    );
  }

  // Additional PostgreSQL URL validation
  try {
    const url = new URL(dbUrl);
    if (!url.hostname || !url.pathname || url.pathname === "/") {
      throw new Error(
        "DATABASE_URL missing required components (host/database)"
      );
    }
  } catch (error) {
    throw new Error(`Invalid DATABASE_URL format: ${error.message}`);
  }

  console.log("✅ Environment variables are properly configured");
}

async function checkPrismaGeneration() {
  console.log("🔍 Checking Prisma client generation...");

  const prismaClientPath = path.join(__dirname, "../app/generated/prisma");

  if (!fs.existsSync(prismaClientPath)) {
    throw new Error("Prisma client not generated. Run 'pnpm db:generate'");
  }

  // Check if index.js exists in the generated client
  const indexPath = path.join(prismaClientPath, "index.js");
  if (!fs.existsSync(indexPath)) {
    throw new Error("Prisma client generation incomplete");
  }

  console.log("✅ Prisma client is properly generated");
}

// Run health check if this script is executed directly
if (require.main === module) {
  runHealthCheck().catch((error) => {
    console.error("Health check failed:", error);
    process.exit(1);
  });
}

module.exports = { runHealthCheck };
