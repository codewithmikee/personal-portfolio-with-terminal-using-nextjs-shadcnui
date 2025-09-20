import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { PortfolioConverter } from "@/lib/utils/portfolio-converter";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "json";
    const portfolioId = searchParams.get("id") || "portfolio-mikiyas";

    // Fetch portfolio data from database
    const portfolio = await prisma.portfolio.findUnique({
      where: { externalId: portfolioId },
      include: {
        profile: {
          include: {
            contacts: {
              include: {
                contact: true,
              },
            },
          },
        },
        projects: {
          include: {
            features: {
              include: {
                techStacks: {
                  include: {
                    techStack: true,
                  },
                },
              },
            },
          },
        },
        experience: {
          include: {
            contacts: {
              include: {
                contact: true,
              },
            },
          },
        },
        skills: true,
        tools: true,
        blogs: {
          include: {
            techStacks: {
              include: {
                techStack: true,
              },
            },
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Transform the data to match our EnhancedPortfolio interface
    const enhancedPortfolio = {
      id: portfolio.id,
      externalId: portfolio.externalId,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      profile: portfolio.profile
        ? {
            ...portfolio.profile,
            contacts:
              portfolio.profile.contacts?.map((pc: any) => pc.contact) || [],
          }
        : null,
      projects:
        portfolio.projects?.map((project: any) => ({
          ...project,
          features:
            project.features?.map((feature: any) => ({
              ...feature,
              techStacks:
                feature.techStacks?.map((ft: any) => ft.techStack) || [],
            })) || [],
        })) || [],
      experience:
        portfolio.experience?.map((exp: any) => ({
          ...exp,
          contacts: exp.contacts?.map((ec: any) => ec.contact) || [],
        })) || [],
      skills: portfolio.skills || [],
      tools: portfolio.tools || [],
      blogs:
        portfolio.blogs?.map((blog: any) => ({
          ...blog,
          techStacks: blog.techStacks?.map((bt: any) => bt.techStack) || [],
        })) || [],
      techStacks: [],
    };

    const converter = new PortfolioConverter(enhancedPortfolio as any);

    let content: string;
    let mimeType: string;
    let filename: string;

    switch (format) {
      case "json":
        content = converter.toJSON();
        mimeType = "application/json";
        filename = `${
          portfolio.profile?.full_name?.replace(/\s+/g, "_") || "portfolio"
        }_portfolio.json`;
        break;
      case "markdown":
        content = converter.toMarkdown();
        mimeType = "text/markdown";
        filename = `${
          portfolio.profile?.full_name?.replace(/\s+/g, "_") || "portfolio"
        }_portfolio.md`;
        break;
      case "csv":
        content = converter.toCSV();
        mimeType = "text/csv";
        filename = `${
          portfolio.profile?.full_name?.replace(/\s+/g, "_") || "portfolio"
        }_portfolio.csv`;
        break;
      case "summary":
        content = converter.toSummary();
        mimeType = "text/plain";
        filename = `${
          portfolio.profile?.full_name?.replace(/\s+/g, "_") || "portfolio"
        }_summary.txt`;
        break;
      default:
        return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
