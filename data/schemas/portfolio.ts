/**
 * Enhanced Portfolio Data Structure: TypeScript Definitions
 *
 * This file contains the new enhanced data structure for the portfolio website.
 * It provides better organization, more detailed information, and improved type safety.
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

// Enums for better type safety and consistency
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
  FullTime = "Full Time",
  PartTime = "Part Time",
  Contract = "Contract",
  Freelance = "Freelance",
}

export enum Priority {
  Main = "main",
  Side = "side",
}

export enum ProjectType {
  Frontend = "Frontend",
  Mobile = "Mobile",
  Fullstack = "Fullstack",
  Backend = "Backend",
}

// Core interfaces
export interface TechStack {
  title: string;
  key: string;
  icon: string;
  level: ProgrammingLevel;
  priority: Priority;
  type: ProjectType;
}

export interface Contact {
  name: string;
  icon: string;
  link: string;
}

export interface Feature {
  title: string;
  description: string;
  techStacks: TechStack[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
  features: Feature[];
}

export interface Experience {
  company_name: string;
  company_description: string;
  start_date: string;
  end_date: string | null;
  role: ProgrammingRole;
  job_type: JobType;
  contacts: Contact[];
}

export interface Skill {
  title: string;
}

export interface Tool {
  title: string;
}

export interface Blog {
  title: string;
  link: string;
  techStacks: TechStack[];
}

export interface Profile {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  description: string;
  profile_picture: string;
  contacts: Contact[];
}

// Main portfolio interface
export interface EnhancedPortfolio {
  profile: Profile;
  techStacks: TechStack[];
  contacts: Contact[];
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  tools: Tool[];
  blogs: Blog[];
}

export interface Portfolio extends EnhancedPortfolio {}

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

// Migration helper types
export interface LegacyToEnhancedMapping {
  personal: Profile;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  tools: Tool[];
  blogs: Blog[];
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

// All types are already exported above as interfaces
