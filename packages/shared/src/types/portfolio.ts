/**
 * Enhanced Portfolio Data Structure: TypeScript Definitions
 * 
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */
 *
 * This file contains the new enhanced data structure for the portfolio website.
 * It provides better organization, more detailed information, and improved type safety.
 * Updated to match Prisma schema structure.
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

// Enums matching Prisma schema exactly
export enum ProgrammingRole {
  FullStack = "FullStack",
  Frontend = "Frontend",
  Backend = "Backend",
  Mobile = "Mobile",
}

export enum ProgrammingLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}

export enum JobType {
  Full_Time = "Full_Time",
  Part_Time = "Part_Time",
  Contract = "Contract",
  Freelance = "Freelance",
}

export enum Priority {
  main = "main",
  side = "side",
}

export enum ProjectType {
  Frontend = "Frontend",
  Mobile = "Mobile",
  Fullstack = "Fullstack",
  Backend = "Backend",
}

// Core interfaces matching Prisma schema structure
export interface TechStack {
  id?: string;
  externalId?: string;
  title: string;
  key: string;
  icon: string;
  level: ProgrammingLevel;
  priority: Priority;
  type: ProjectType;
}

export interface Contact {
  id?: string;
  externalId?: string;
  name: string;
  icon: string;
  link: string;
}

export interface Feature {
  id?: string;
  externalId?: string;
  title: string;
  description: string;
  techStacks: TechStack[];
}

export interface Project {
  id?: string;
  externalId?: string;
  title: string;
  description: string;
  link: string;
  features: Feature[];
}

export interface Experience {
  id?: string;
  externalId?: string;
  company_name: string;
  company_description: string;
  start_date: string;
  end_date: string | null;
  role: ProgrammingRole;
  job_type: JobType;
  contacts: Contact[];
}

export interface Skill {
  id?: string;
  externalId?: string;
  title: string;
}

export interface Tool {
  id?: string;
  externalId?: string;
  title: string;
}

export interface Blog {
  id?: string;
  externalId?: string;
  title: string;
  link: string;
  techStacks: TechStack[];
}

export interface Profile {
  id?: string;
  externalId?: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  description: string;
  profile_picture: string;
  contacts: Contact[];
}

// Main portfolio interface matching Prisma schema
export interface Portfolio {
  id?: string;
  externalId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  tools: Tool[];
  blogs: Blog[];
  contacts: Contact[];
  techStacks?: TechStack[];
}

export interface EnhancedPortfolio extends Portfolio {
  techStacks?: TechStack[];
}

// Utility type for portfolios with guaranteed techStacks
export interface PortfolioWithTechStacks extends Portfolio {
  techStacks: TechStack[];
}

// Junction table interfaces for many-to-many relationships
export interface PortfolioContact {
  id: string;
  portfolioId: string;
  contactId: string;
  contact: Contact;
}

export interface ProfileContact {
  id: string;
  profileId: string;
  contactId: string;
  contact: Contact;
}

export interface ExperienceContact {
  id: string;
  experienceId: string;
  contactId: string;
  contact: Contact;
}

export interface FeatureTechStack {
  id: string;
  featureId: string;
  techStackId: string;
  techStack: TechStack;
}

export interface BlogTechStack {
  id: string;
  blogId: string;
  techStackId: string;
  techStack: TechStack;
}

// Utility types for better type safety
export type TechStackKey = TechStack["key"];
export type TechStackLevel = TechStack["level"];
export type TechStackPriority = TechStack["priority"];
export type TechStackType = TechStack["type"];

// Helper types for filtering and searching
export interface TechStackFilter {
  level?: ProgrammingLevel;
  priority?: Priority;
  type?: ProjectType;
  search?: string;
}

export interface ProjectFilter {
  techStack?: TechStackKey;
  type?: ProjectType;
  search?: string;
}

// Database query types
export interface PortfolioWithRelations {
  id: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile & {
    contacts: ProfileContact[];
  };
  projects: (Project & {
    features: (Feature & {
      techStacks: FeatureTechStack[];
    })[];
  })[];
  experience: (Experience & {
    contacts: ExperienceContact[];
  })[];
  blogs: (Blog & {
    techStacks: BlogTechStack[];
  })[];
  skills: Skill[];
  tools: Tool[];
  contacts: PortfolioContact[];
}

// Migration helper types
export interface LegacyToEnhancedMapping {
  personal: Profile;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  tools: Tool[];
  blogs: Blog[];
}

// Prisma client types (re-exported for convenience)
export type PrismaPortfolio = Portfolio;
export type PrismaProfile = Profile;
export type PrismaContact = Contact;
export type PrismaTechStack = TechStack;
export type PrismaProject = Project;
export type PrismaFeature = Feature;
export type PrismaExperience = Experience;
export type PrismaSkill = Skill;
export type PrismaTool = Tool;
export type PrismaBlog = Blog;

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Validation schemas (can be used with libraries like Zod)
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Database operation types
export interface CreatePortfolioData {
  externalId: string;
  profile: Omit<Profile, "id" | "externalId">;
  projects?: Omit<Project, "id" | "externalId">[];
  experience?: Omit<Experience, "id" | "externalId">[];
  skills?: Omit<Skill, "id" | "externalId">[];
  tools?: Omit<Tool, "id" | "externalId">[];
  blogs?: Omit<Blog, "id" | "externalId">[];
  contacts?: Contact[];
}

export interface UpdatePortfolioData extends Partial<CreatePortfolioData> {
  id: string;
}

// Backward compatibility types for existing code
export interface LegacyContact {
  name: string;
  icon: string;
  link: string;
}

export interface LegacyProfile {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  description: string;
  profile_picture: string;
  contacts: LegacyContact[];
}

export interface LegacyProject {
  title: string;
  description: string;
  link: string;
  features: Feature[];
}

export interface LegacyExperience {
  company_name: string;
  company_description: string;
  start_date: string;
  end_date: string | null;
  role: ProgrammingRole;
  job_type: JobType;
  contacts: LegacyContact[];
}

export interface LegacySkill {
  id: string;
  title: string;
}

export interface LegacyTool {
  title: string;
}

export interface LegacyBlog {
  title: string;
  link: string;
  techStacks: TechStack[];
}

// Helper functions for type conversion
export const convertLegacyContact = (contact: LegacyContact): Contact => ({
  id: "",
  externalId: "",
  ...contact,
});

export const convertLegacyProfile = (profile: LegacyProfile): Profile => ({
  id: "",
  externalId: "",
  ...profile,
  contacts: profile.contacts.map(convertLegacyContact),
});

export const convertLegacyProject = (project: LegacyProject): Project => ({
  id: "",
  externalId: "",
  ...project,
});

export const convertLegacyExperience = (
  experience: LegacyExperience
): Experience => ({
  id: "",
  externalId: "",
  ...experience,
  contacts: experience.contacts.map(convertLegacyContact),
});

export const convertLegacySkill = (skill: LegacySkill): Skill => ({
  externalId: "",
  ...skill,
});

export const convertLegacyTool = (tool: LegacyTool): Tool => ({
  id: "",
  externalId: "",
  ...tool,
});

export const convertLegacyBlog = (blog: LegacyBlog): Blog => ({
  id: "",
  externalId: "",
  ...blog,
});

// Utility functions for type safety
export const ensureTechStacks = (
  portfolio: Portfolio
): PortfolioWithTechStacks => ({
  ...portfolio,
  techStacks: portfolio.techStacks || [],
});

export const isPortfolioWithTechStacks = (
  portfolio: Portfolio
): portfolio is PortfolioWithTechStacks => {
  return portfolio.techStacks !== undefined;
};

export const getTechStacks = (portfolio: Portfolio): TechStack[] => {
  return portfolio.techStacks || [];
};

// All types are already exported above as interfaces
