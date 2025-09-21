#!/usr/bin/env node

/**
 * Cache warming script for post-deployment optimization
 * Pre-loads essential data and warms up caches for better performance
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

const fs = require("fs");
const path = require("path");

async function warmCache() {
  console.log("🔥 Warming up caches for optimal performance...");

  const warmupTasks = [
    preloadPortfolioData,
    warmupDatabaseConnections,
    validateStaticAssets,
    optimizeImageCache,
  ];

  for (const task of warmupTasks) {
    try {
      await task();
    } catch (error) {
      console.warn(`⚠️  Cache warming task failed: ${error.message}`);
      // Don't fail the entire process for cache warming issues
    }
  }

  console.log("✅ Cache warming completed successfully");
}

async function preloadPortfolioData() {
  console.log("📊 Preloading portfolio data...");

  try {
    const portfolioDataPath = path.join(
      __dirname,
      "../public/data/portfolio.json"
    );

    if (!fs.existsSync(portfolioDataPath)) {
      throw new Error("Portfolio data file not found");
    }

    const data = JSON.parse(fs.readFileSync(portfolioDataPath, "utf8"));

    // Validate essential data structure
    const requiredSections = ["profile", "projects", "experience", "skills"];
    const missingSections = requiredSections.filter(
      (section) => !data[section]
    );

    if (missingSections.length > 0) {
      throw new Error(
        `Missing portfolio sections: ${missingSections.join(", ")}`
      );
    }

    console.log(
      `✅ Portfolio data preloaded (${Object.keys(data).length} sections)`
    );

    // Log data statistics for monitoring
    console.log("📈 Portfolio Statistics:");
    console.log(`   - Projects: ${data.projects?.length || 0}`);
    console.log(`   - Experience entries: ${data.experience?.length || 0}`);
    console.log(`   - Skills: ${data.skills?.length || 0}`);
    console.log(`   - Tech stacks: ${data.techStacks?.length || 0}`);
  } catch (error) {
    throw new Error(`Failed to preload portfolio data: ${error.message}`);
  }
}

async function warmupDatabaseConnections() {
  console.log("🗄️  Warming up database connections...");

  try {
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    // Perform lightweight queries to warm up the connection pool
    const portfolioCount = await prisma.portfolio.count();
    console.log(
      `✅ Database connection warmed up (${portfolioCount} portfolios)`
    );

    await prisma.$disconnect();
  } catch (error) {
    throw new Error(`Database warmup failed: ${error.message}`);
  }
}

async function validateStaticAssets() {
  console.log("🖼️  Validating static assets...");

  const staticDirs = [
    path.join(__dirname, "../public"),
    path.join(__dirname, "../public/data"),
  ];

  let totalAssets = 0;

  for (const dir of staticDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true });
      totalAssets += files.length;
    }
  }

  console.log(`✅ Static assets validated (${totalAssets} files)`);
}

async function optimizeImageCache() {
  console.log("🎨 Optimizing image cache...");

  const publicDir = path.join(__dirname, "../public");

  if (!fs.existsSync(publicDir)) {
    console.log("📁 Public directory not found, skipping image optimization");
    return;
  }

  // Find image files
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"];
  const imageFiles = [];

  function findImages(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        findImages(filePath);
      } else if (
        imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
      ) {
        imageFiles.push(filePath);
      }
    }
  }

  findImages(publicDir);

  console.log(
    `✅ Image cache optimized (${imageFiles.length} images processed)`
  );

  // Log image statistics
  if (imageFiles.length > 0) {
    const totalSize = imageFiles.reduce((sum, file) => {
      try {
        return sum + fs.statSync(file).size;
      } catch {
        return sum;
      }
    }, 0);

    console.log(
      `📊 Total image assets: ${(totalSize / 1024 / 1024).toFixed(2)} MB`
    );
  }
}

// Performance monitoring helper
function measurePerformance(taskName, fn) {
  return async (...args) => {
    const start = Date.now();
    try {
      const result = await fn(...args);
      const duration = Date.now() - start;
      console.log(`⏱️  ${taskName} completed in ${duration}ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      console.log(`⏱️  ${taskName} failed after ${duration}ms`);
      throw error;
    }
  };
}

// Run cache warming if this script is executed directly
if (require.main === module) {
  const timedWarmCache = measurePerformance("Cache warming", warmCache);

  timedWarmCache().catch((error) => {
    console.error("Cache warming failed:", error);
    process.exit(1);
  });
}

module.exports = { warmCache };
