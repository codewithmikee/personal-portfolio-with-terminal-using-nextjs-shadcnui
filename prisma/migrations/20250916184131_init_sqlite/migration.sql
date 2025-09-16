-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Profile_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PortfolioContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "PortfolioContact_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PortfolioContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProfileContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "ProfileContact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Project_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeatureTechStack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "featureId" TEXT NOT NULL,
    "techStackId" TEXT NOT NULL,
    CONSTRAINT "FeatureTechStack_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FeatureTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_description" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "role" TEXT NOT NULL,
    "job_type" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Experience_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExperienceContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "experienceId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    CONSTRAINT "ExperienceContact_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExperienceContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Skill_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Tool_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    CONSTRAINT "Blog_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogTechStack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "blogId" TEXT NOT NULL,
    "techStackId" TEXT NOT NULL,
    CONSTRAINT "BlogTechStack_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BlogTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "TechStack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_externalId_key" ON "Portfolio"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_externalId_key" ON "Profile"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_portfolioId_key" ON "Profile"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_externalId_key" ON "Contact"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioContact_portfolioId_contactId_key" ON "PortfolioContact"("portfolioId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileContact_profileId_contactId_key" ON "ProfileContact"("profileId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_externalId_key" ON "TechStack"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_key_key" ON "TechStack"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Project_externalId_key" ON "Project"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_externalId_key" ON "Feature"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureTechStack_featureId_techStackId_key" ON "FeatureTechStack"("featureId", "techStackId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_externalId_key" ON "Experience"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceContact_experienceId_contactId_key" ON "ExperienceContact"("experienceId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_externalId_key" ON "Skill"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_externalId_key" ON "Tool"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_externalId_key" ON "Blog"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTechStack_blogId_techStackId_key" ON "BlogTechStack"("blogId", "techStackId");
