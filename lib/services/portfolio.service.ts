import { prisma } from "@/lib/db";
import type { Prisma } from "@/app/generated/prisma";

export async function listPortfolios() {
  return prisma.portfolio.findMany({
    include: {
      profile: { include: { contacts: { include: { contact: true } } } },
      contacts: { include: { contact: true } },
      projects: {
        include: {
          features: {
            include: { techStacks: { include: { techStack: true } } },
          },
        },
      },
      experience: { include: { contacts: { include: { contact: true } } } },
      skills: true,
      tools: true,
      blogs: { include: { techStacks: { include: { techStack: true } } } },
    },
  });
}

export async function getPortfolio(id: string) {
  return prisma.portfolio.findUnique({
    where: { id },
    include: {
      profile: { include: { contacts: { include: { contact: true } } } },
      contacts: { include: { contact: true } },
      projects: {
        include: {
          features: {
            include: { techStacks: { include: { techStack: true } } },
          },
        },
      },
      experience: { include: { contacts: { include: { contact: true } } } },
      skills: true,
      tools: true,
      blogs: { include: { techStacks: { include: { techStack: true } } } },
    },
  });
}

export async function createPortfolio(data: Prisma.PortfolioCreateInput) {
  return prisma.portfolio.create({ data });
}

export async function updatePortfolio(
  id: string,
  data: Prisma.PortfolioUpdateInput
) {
  return prisma.portfolio.update({ where: { id }, data });
}

export async function deletePortfolio(id: string) {
  return prisma.portfolio.delete({ where: { id } });
}
