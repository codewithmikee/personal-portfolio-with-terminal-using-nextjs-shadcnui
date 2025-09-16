/**
 * TypeScript interfaces for portfolio data structure
 * Defines all data types used throughout the portfolio application
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

export interface PersonalProfile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  avatar: string;
  resume_url?: string;
  specializations: string[];
  years_experience: number;
  current_status: "available" | "employed" | "freelancing";
  contact: {
    email: string;
    phone?: string;
    website?: string;
    github: string;
    linkedin: string;
    twitter?: string;
    blog_url?: string;
  };
  stats: {
    projects_completed: number;
    blog_posts_written: number;
    years_experience: number;
    technologies_mastered: number;
  };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailed_description: string;
  category: "fullstack" | "backend" | "frontend" | "api" | "integration";
  subcategory?: string;
  technologies: {
    backend: string[];
    frontend: string[];
    database: string[];
    apis: string[];
    tools: string[];
  };
  laravel_features?: {
    authentication: string[];
    integrations: string[];
    packages: string[];
    architecture: string[];
  };
  status: "completed" | "in-progress" | "maintenance" | "archived";
  timeline: {
    start_date: string;
    end_date?: string;
    duration_months: number;
  };
  urls: {
    live_url?: string;
    github_url?: string;
    case_study_url?: string;
    blog_post_url?: string;
  };
  media: {
    thumbnail: string;
    gallery: string[];
    demo_video?: string;
  };
  client?: string;
  team_size?: number;
  my_role: string;
  key_challenges: string[];
  solutions_implemented: string[];
  metrics?: {
    users_impacted?: number;
    performance_improvement?: string;
    code_coverage?: number;
    uptime?: string;
  };
  featured: boolean;
  order: number;
}

export interface ProjectsData {
  projects: Project[];
  categories: {
    id: string;
    name: string;
    description: string;
    icon: string;
    count: number;
  }[];
  featured_projects: string[];
}

export interface Experience {
  id: string;
  company: string;
  company_url?: string;
  position: string;
  location: string;
  employment_type: "full-time" | "part-time" | "contract" | "freelance";
  timeline: {
    start_date: string;
    end_date?: string;
    duration: string;
  };
  overview: string;
  key_responsibilities: string[];
  achievements: string[];
  technologies_used: string[];
  projects_led: string[];
  team_size?: number;
  backend_work: {
    apis_built: number;
    integrations: string[];
    database_optimizations: string[];
    security_implementations: string[];
  };
  frontend_work?: {
    applications_built: number;
    ui_frameworks: string[];
    performance_improvements: string[];
  };
  order: number;
}

export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category:
    | "backend"
    | "frontend"
    | "database"
    | "devops"
    | "tools"
    | "soft-skills";
  subcategory?: string;
  years_experience: number;
  last_used: string;
  projects_count?: number;
  certifications?: string[];
  endorsements?: number;
  laravel_context?: {
    packages_used: string[];
    features_implemented: string[];
    level_description: string;
  };
}

export interface SkillsData {
  skills: Skill[];
  skill_categories: {
    backend: {
      name: string;
      primary: string[];
      secondary: string[];
    };
    frontend: {
      name: string;
      primary: string[];
      secondary: string[];
    };
    database: {
      name: string;
      primary: string[];
      secondary: string[];
    };
    devops: {
      name: string;
      primary: string[];
      secondary: string[];
    };
  };
  certifications: {
    name: string;
    issuer: string;
    date: string;
    credential_url?: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publication_date: string;
  reading_time: number;
  category: "tutorial" | "case-study" | "opinion" | "announcement";
  tags: string[];
  technologies: string[];
  difficulty_level: "beginner" | "intermediate" | "advanced";
  urls: {
    original_url: string;
    canonical_url?: string;
  };
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  };
  featured: boolean;
}

export interface ContentData {
  blog_posts: BlogPost[];
  featured_posts: string[];
  writing_stats: {
    total_posts: number;
    total_views: number;
    average_reading_time: number;
    most_popular_topics: string[];
  };
}

export interface TerminalStructure {
  filesystem: Record<string, Record<string, string>>;
  commands: Record<string, string>;
}

export interface PortfolioData {
  metadata: {
    version: string;
    last_updated: string;
    environment: "development" | "production";
    build_date?: string;
  };
  personal: PersonalProfile;
  projects: ProjectsData;
  experience: Experience[];
  skills: SkillsData;
  content: ContentData;
  navigation: {
    main_sections: string[];
    featured_items: {
      projects: string[];
      blog_posts: string[];
      skills: string[];
    };
  };
  terminal: TerminalStructure;
  config: {
    theme: "professional" | "creative" | "minimal";
    layout: "single-page" | "multi-page";
    features: string[];
    contact_cta: string;
  };
}

// Legacy interface for backward compatibility
export interface LegacyPortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
    location: string;
    avatar: string;
  };
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
}
