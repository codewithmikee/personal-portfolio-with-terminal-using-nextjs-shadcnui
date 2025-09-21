#!/usr/bin/env node

/**
 * PostgreSQL setup script for portfolio builder
 * Helps with initial database setup and migration from SQLite
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function setupPostgreSQL() {
  console.log("🐘 Setting up PostgreSQL for portfolio builder...");

  try {
    // Check if .env.local exists
    await checkEnvironmentSetup();

    // Check if Docker is available
    await checkDockerAvailability();

    // Start PostgreSQL if not running
    await startPostgreSQL();

    // Wait for database to be ready
    await waitForDatabase();

    // Generate Prisma client
    await generatePrismaClient();

    // Run initial migration
    await runInitialMigration();

    // Seed the database
    await seedDatabase();

    console.log("✅ PostgreSQL setup completed successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Run 'pnpm dev' to start the development server");
    console.log("2. Visit http://localhost:3000 to see your application");
    console.log("3. Use 'pnpm db:studio' to manage your database");
  } catch (error) {
    console.error("❌ PostgreSQL setup failed:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Make sure Docker is installed and running");
    console.log("2. Check your .env.local file has the correct DATABASE_URL");
    console.log("3. Try running 'pnpm docker:reset' to reset the database");
    process.exit(1);
  }
}

async function checkEnvironmentSetup() {
  console.log("🔍 Checking environment setup...");

  const envPath = path.join(__dirname, "../.env.local");
  const envExamplePath = path.join(__dirname, "../env.example");

  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      console.log("📄 Creating .env.local from env.example...");
      fs.copyFileSync(envExamplePath, envPath);
      console.log(
        "⚠️  Please update .env.local with your actual database credentials"
      );
    } else {
      throw new Error(
        ".env.local file not found. Please create it with DATABASE_URL"
      );
    }
  }

  // Load environment variables
  const envContent = fs.readFileSync(envPath, "utf8");
  if (!envContent.includes("DATABASE_URL")) {
    throw new Error("DATABASE_URL not found in .env.local");
  }

  console.log("✅ Environment setup verified");
}

async function checkDockerAvailability() {
  console.log("🐳 Checking Docker availability...");

  try {
    execSync("docker --version", { stdio: "ignore" });
    console.log("✅ Docker is available");
  } catch (error) {
    throw new Error(
      "Docker is not installed or not running. Please install Docker first."
    );
  }
}

async function startPostgreSQL() {
  console.log("🚀 Starting PostgreSQL database...");

  try {
    // Check if already running
    try {
      execSync("docker-compose ps postgres", { stdio: "ignore" });
      console.log("📍 PostgreSQL is already running");
      return;
    } catch (error) {
      // Not running, start it
    }

    execSync("docker-compose up -d postgres", { stdio: "inherit" });
    console.log("✅ PostgreSQL started successfully");
  } catch (error) {
    throw new Error(`Failed to start PostgreSQL: ${error.message}`);
  }
}

async function waitForDatabase() {
  console.log("⏳ Waiting for database to be ready...");

  const maxAttempts = 30;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      execSync(
        "docker-compose exec -T postgres pg_isready -U portfolio_user -d portfolio_db",
        { stdio: "ignore" }
      );
      console.log("✅ Database is ready");
      return;
    } catch (error) {
      attempts++;
      console.log(`⏳ Waiting for database... (${attempts}/${maxAttempts})`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw new Error("Database did not become ready in time");
}

async function generatePrismaClient() {
  console.log("🔧 Generating Prisma client...");

  try {
    execSync("pnpm db:generate", { stdio: "inherit" });
    console.log("✅ Prisma client generated");
  } catch (error) {
    throw new Error(`Failed to generate Prisma client: ${error.message}`);
  }
}

async function runInitialMigration() {
  console.log("📊 Running initial database migration...");

  try {
    execSync("pnpm db:migrate", { stdio: "inherit" });
    console.log("✅ Database migration completed");
  } catch (error) {
    throw new Error(`Failed to run migration: ${error.message}`);
  }
}

async function seedDatabase() {
  console.log("🌱 Seeding database with initial data...");

  try {
    execSync("pnpm db:seed", { stdio: "inherit" });
    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.warn(
      "⚠️  Database seeding failed, but this is optional:",
      error.message
    );
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupPostgreSQL().catch((error) => {
    console.error("Setup failed:", error);
    process.exit(1);
  });
}

module.exports = { setupPostgreSQL };
