/**
 * Portfolio Data Converter Utility
 * Converts portfolio data to various formats (JSON, Markdown, CSV)
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 */

import type {
  EnhancedPortfolio,
  Project,
  Experience,
  TechStack,
  Contact,
  Skill,
  Tool,
  Blog,
} from "@/types/portfolio";

export class PortfolioConverter {
  private portfolio: EnhancedPortfolio;

  constructor(portfolio: EnhancedPortfolio) {
    this.portfolio = portfolio;
  }

  /**
   * Convert portfolio to JSON string
   */
  toJSON(): string {
    return JSON.stringify(this.portfolio, null, 2);
  }

  /**
   * Convert portfolio to Markdown format
   */
  toMarkdown(): string {
    const { profile, experience, projects, skills, tools, blogs, contacts } =
      this.portfolio;

    let markdown = `# ${profile.full_name}\n\n`;

    // Header section
    markdown += `**${profile.description}**\n\n`;
    markdown += `📧 ${profile.email} | 📱 ${profile.phone_number} | 📍 ${profile.address}\n\n`;

    // Social links
    if (contacts && contacts.length > 0) {
      markdown += `## Contact & Social Links\n\n`;
      contacts.forEach((contact) => {
        markdown += `- **${contact.name}**: [${contact.link}](${contact.link})\n`;
      });
      markdown += `\n`;
    }

    // Experience section
    if (experience && experience.length > 0) {
      markdown += `## Professional Experience\n\n`;
      experience.forEach((exp, index) => {
        markdown += `### ${index + 1}. ${exp.role} at ${exp.company_name}\n\n`;
        markdown += `**Duration**: ${exp.start_date} - ${
          exp.end_date || "Present"
        }\n`;
        markdown += `**Type**: ${exp.job_type}\n\n`;
        markdown += `${exp.company_description}\n\n`;
        markdown += `---\n\n`;
      });
    }

    // Projects section
    if (projects && projects.length > 0) {
      markdown += `## Key Projects\n\n`;
      projects.forEach((project, index) => {
        markdown += `### ${index + 1}. ${project.title}\n\n`;
        markdown += `${project.description}\n\n`;

        if (project.link) {
          markdown += `🔗 **Project Link**: [${project.link}](${project.link})\n\n`;
        }

        if (project.features && project.features.length > 0) {
          markdown += `**Key Features:**\n`;
          project.features.forEach((feature) => {
            markdown += `- **${feature.title}**: ${feature.description}\n`;
            if (feature.techStacks && feature.techStacks.length > 0) {
              markdown += `  - *Technologies*: ${feature.techStacks
                .map((tech) => tech.title)
                .join(", ")}\n`;
            }
          });
          markdown += `\n`;
        }
        markdown += `---\n\n`;
      });
    }

    // Skills section
    if (skills && skills.length > 0) {
      markdown += `## Technical Skills\n\n`;
      const skillsByType = this.groupSkillsByType(skills);
      Object.entries(skillsByType).forEach(([type, skillList]) => {
        markdown += `### ${type}\n`;
        skillList.forEach((skill) => {
          markdown += `- ${skill.title}\n`;
        });
        markdown += `\n`;
      });
    }

    // Tools section
    if (tools && tools.length > 0) {
      markdown += `## Tools & Technologies\n\n`;
      tools.forEach((tool) => {
        markdown += `- ${tool.title}\n`;
      });
      markdown += `\n`;
    }

    // Tech Stacks section
    if (this.portfolio.techStacks && this.portfolio.techStacks.length > 0) {
      markdown += `## Tech Stack Details\n\n`;
      const techStacksByType = this.groupTechStacksByType(
        this.portfolio.techStacks
      );
      Object.entries(techStacksByType).forEach(([type, techList]) => {
        markdown += `### ${type}\n`;
        techList.forEach((tech) => {
          markdown += `- **${tech.title}** (${tech.level})\n`;
        });
        markdown += `\n`;
      });
    }

    // Blogs section
    if (blogs && blogs.length > 0) {
      markdown += `## Blog Posts & Articles\n\n`;
      blogs.forEach((blog) => {
        markdown += `- [${blog.title}](${blog.link})\n`;
        if ("description" in blog && blog.description) {
          markdown += `  - ${blog.description}\n`;
        }
      });
      markdown += `\n`;
    }

    return markdown;
  }

  /**
   * Convert portfolio to CSV format
   */
  toCSV(): string {
    const { profile, experience, projects, skills, tools, blogs } =
      this.portfolio;

    let csv = "";

    // Profile section
    csv += "Section,Field,Value\n";
    csv += `Profile,Full Name,"${profile.full_name}"\n`;
    csv += `Profile,Email,"${profile.email}"\n`;
    csv += `Profile,Phone,"${profile.phone_number}"\n`;
    csv += `Profile,Address,"${profile.address}"\n`;
    csv += `Profile,Description,"${profile.description.replace(/"/g, '""')}"\n`;
    csv += "\n";

    // Experience section
    if (experience && experience.length > 0) {
      csv += "Section,Company,Role,Job Type,Start Date,End Date,Description\n";
      experience.forEach((exp) => {
        csv += `Experience,"${exp.company_name}","${exp.role}","${
          exp.job_type
        }","${exp.start_date}","${
          exp.end_date || "Present"
        }","${exp.company_description.replace(/"/g, '""')}"\n`;
      });
      csv += "\n";
    }

    // Projects section
    if (projects && projects.length > 0) {
      csv += "Section,Title,Description,Link\n";
      projects.forEach((project) => {
        csv += `Project,"${project.title}","${project.description.replace(
          /"/g,
          '""'
        )}","${project.link || ""}"\n`;
      });
      csv += "\n";
    }

    // Skills section
    if (skills && skills.length > 0) {
      csv += "Section,Skill\n";
      skills.forEach((skill) => {
        csv += `Skill,"${skill.title}"\n`;
      });
      csv += "\n";
    }

    // Tools section
    if (tools && tools.length > 0) {
      csv += "Section,Tool\n";
      tools.forEach((tool) => {
        csv += `Tool,"${tool.title}"\n`;
      });
      csv += "\n";
    }

    // Tech Stacks section
    if (this.portfolio.techStacks && this.portfolio.techStacks.length > 0) {
      csv += "Section,Technology,Type,Level\n";
      this.portfolio.techStacks.forEach((tech) => {
        csv += `Tech Stack,"${tech.title}","${tech.type}","${tech.level}"\n`;
      });
      csv += "\n";
    }

    // Blogs section
    if (blogs && blogs.length > 0) {
      csv += "Section,Title,Link,Description\n";
      blogs.forEach((blog) => {
        csv += `Blog,"${blog.title}","${blog.link}","${
          "description" in blog ? blog.description || "" : ""
        }"\n`;
      });
    }

    return csv;
  }

  /**
   * Convert portfolio to a simplified JSON format for API responses
   */
  toSimplifiedJSON(): string {
    const simplified = {
      profile: {
        name: this.portfolio.profile.full_name,
        email: this.portfolio.profile.email,
        phone: this.portfolio.profile.phone_number,
        location: this.portfolio.profile.address,
        summary: this.portfolio.profile.description,
      },
      experience:
        this.portfolio.experience?.map((exp) => ({
          company: exp.company_name,
          role: exp.role,
          type: exp.job_type,
          startDate: exp.start_date,
          endDate: exp.end_date,
          description: exp.company_description,
        })) || [],
      projects:
        this.portfolio.projects?.map((project) => ({
          title: project.title,
          description: project.description,
          link: project.link,
          features:
            project.features?.map((feature) => ({
              title: feature.title,
              description: feature.description,
              technologies: feature.techStacks?.map((tech) => tech.title) || [],
            })) || [],
        })) || [],
      skills: this.portfolio.skills?.map((skill) => skill.title) || [],
      tools: this.portfolio.tools?.map((tool) => tool.title) || [],
      techStacks:
        this.portfolio.techStacks?.map((tech) => ({
          name: tech.title,
          type: tech.type,
          level: tech.level,
        })) || [],
      blogs:
        this.portfolio.blogs?.map((blog) => ({
          title: blog.title,
          link: blog.link,
          description: "description" in blog ? blog.description : undefined,
        })) || [],
    };

    return JSON.stringify(simplified, null, 2);
  }

  /**
   * Generate a portfolio summary
   */
  toSummary(): string {
    const { profile, experience, projects, skills, tools, blogs } =
      this.portfolio;

    let summary = `Portfolio Summary for ${profile.full_name}\n`;
    summary += `=====================================\n\n`;
    summary += `📧 ${profile.email}\n`;
    summary += `📍 ${profile.address}\n\n`;
    summary += `Professional Summary:\n${profile.description}\n\n`;
    summary += `📊 Statistics:\n`;
    summary += `- Experience: ${experience?.length || 0} positions\n`;
    summary += `- Projects: ${projects?.length || 0} projects\n`;
    summary += `- Skills: ${skills?.length || 0} skills\n`;
    summary += `- Tools: ${tools?.length || 0} tools\n`;
    summary += `- Tech Stacks: ${
      this.portfolio.techStacks?.length || 0
    } technologies\n`;
    summary += `- Blog Posts: ${blogs?.length || 0} articles\n`;

    return summary;
  }

  /**
   * Helper method to group skills by type
   */
  private groupSkillsByType(skills: Skill[]): Record<string, Skill[]> {
    const result: Record<string, Skill[]> = {};
    for (const skill of skills) {
      const type = (
        "type" in skill ? skill.type || "Other" : "Other"
      ) as string;
      if (!result[type]) {
        result[type] = [];
      }
      result[type]!.push(skill);
    }
    return result;
  }

  /**
   * Helper method to group tech stacks by type
   */
  private groupTechStacksByType(
    techStacks: TechStack[]
  ): Record<string, TechStack[]> {
    const result: Record<string, TechStack[]> = {};
    for (const tech of techStacks) {
      const type: string = tech.type;
      if (!result[type]) {
        result[type] = [];
      }
      result[type]!.push(tech);
    }
    return result;
  }

  /**
   * Download portfolio data in specified format
   */
  downloadAs(
    format: "json" | "markdown" | "csv" | "summary",
    filename?: string
  ): void {
    let content: string;
    let mimeType: string;
    let extension: string;

    switch (format) {
      case "json":
        content = this.toJSON();
        mimeType = "application/json";
        extension = "json";
        break;
      case "markdown":
        content = this.toMarkdown();
        mimeType = "text/markdown";
        extension = "md";
        break;
      case "csv":
        content = this.toCSV();
        mimeType = "text/csv";
        extension = "csv";
        break;
      case "summary":
        content = this.toSummary();
        mimeType = "text/plain";
        extension = "txt";
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    const defaultFilename = `${this.portfolio.profile.full_name.replace(
      /\s+/g,
      "_"
    )}_portfolio.${extension}`;
    const finalFilename = filename || defaultFilename;

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Utility functions for portfolio conversion
 */
export const PortfolioUtils = {
  /**
   * Create a new PortfolioConverter instance
   */
  createConverter: (portfolio: EnhancedPortfolio) =>
    new PortfolioConverter(portfolio),

  /**
   * Quick conversion functions
   */
  toJSON: (portfolio: EnhancedPortfolio) =>
    new PortfolioConverter(portfolio).toJSON(),
  toMarkdown: (portfolio: EnhancedPortfolio) =>
    new PortfolioConverter(portfolio).toMarkdown(),
  toCSV: (portfolio: EnhancedPortfolio) =>
    new PortfolioConverter(portfolio).toCSV(),
  toSummary: (portfolio: EnhancedPortfolio) =>
    new PortfolioConverter(portfolio).toSummary(),

  /**
   * Quick download functions
   */
  downloadAsJSON: (portfolio: EnhancedPortfolio, filename?: string) =>
    new PortfolioConverter(portfolio).downloadAs("json", filename),
  downloadAsMarkdown: (portfolio: EnhancedPortfolio, filename?: string) =>
    new PortfolioConverter(portfolio).downloadAs("markdown", filename),
  downloadAsCSV: (portfolio: EnhancedPortfolio, filename?: string) =>
    new PortfolioConverter(portfolio).downloadAs("csv", filename),
  downloadAsSummary: (portfolio: EnhancedPortfolio, filename?: string) =>
    new PortfolioConverter(portfolio).downloadAs("summary", filename),
};
