-- CreateEnum
CREATE TYPE "public"."ProgrammingRole" AS ENUM ('FullStack', 'Frontend', 'Backend', 'Mobile');

-- CreateEnum
CREATE TYPE "public"."ProgrammingLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- CreateEnum
CREATE TYPE "public"."JobType" AS ENUM ('Full_Time', 'Part_Time', 'Contract', 'Freelance');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('main', 'side');

-- CreateEnum
CREATE TYPE "public"."ProjectType" AS ENUM ('Frontend', 'Mobile', 'Fullstack', 'Backend');

-- CreateTable
CREATE TABLE "public"."Portfolio" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PortfolioContact" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "PortfolioContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProfileContact" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "ProfileContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TechStack" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "level" "public"."ProgrammingLevel" NOT NULL,
    "priority" "public"."Priority" NOT NULL,
    "type" "public"."ProjectType" NOT NULL,

    CONSTRAINT "TechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feature" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeatureTechStack" (
    "id" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "techStackId" TEXT NOT NULL,

    CONSTRAINT "FeatureTechStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_description" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT,
    "role" "public"."ProgrammingRole" NOT NULL,
    "job_type" "public"."JobType" NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExperienceContact" (
    "id" TEXT NOT NULL,
    "experienceId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "ExperienceContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tool" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Blog" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogTechStack" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "techStackId" TEXT NOT NULL,

    CONSTRAINT "BlogTechStack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_externalId_key" ON "public"."Portfolio"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_externalId_key" ON "public"."Profile"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_portfolioId_key" ON "public"."Profile"("portfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_externalId_key" ON "public"."Contact"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioContact_portfolioId_contactId_key" ON "public"."PortfolioContact"("portfolioId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileContact_profileId_contactId_key" ON "public"."ProfileContact"("profileId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_externalId_key" ON "public"."TechStack"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "TechStack_key_key" ON "public"."TechStack"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Project_externalId_key" ON "public"."Project"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_externalId_key" ON "public"."Feature"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureTechStack_featureId_techStackId_key" ON "public"."FeatureTechStack"("featureId", "techStackId");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_externalId_key" ON "public"."Experience"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceContact_experienceId_contactId_key" ON "public"."ExperienceContact"("experienceId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_externalId_key" ON "public"."Skill"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_externalId_key" ON "public"."Tool"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_externalId_key" ON "public"."Blog"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTechStack_blogId_techStackId_key" ON "public"."BlogTechStack"("blogId", "techStackId");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PortfolioContact" ADD CONSTRAINT "PortfolioContact_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PortfolioContact" ADD CONSTRAINT "PortfolioContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileContact" ADD CONSTRAINT "ProfileContact_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileContact" ADD CONSTRAINT "ProfileContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feature" ADD CONSTRAINT "Feature_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeatureTechStack" ADD CONSTRAINT "FeatureTechStack_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "public"."Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeatureTechStack" ADD CONSTRAINT "FeatureTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "public"."TechStack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExperienceContact" ADD CONSTRAINT "ExperienceContact_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "public"."Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ExperienceContact" ADD CONSTRAINT "ExperienceContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tool" ADD CONSTRAINT "Tool_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "public"."Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogTechStack" ADD CONSTRAINT "BlogTechStack_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "public"."Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogTechStack" ADD CONSTRAINT "BlogTechStack_techStackId_fkey" FOREIGN KEY ("techStackId") REFERENCES "public"."TechStack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
