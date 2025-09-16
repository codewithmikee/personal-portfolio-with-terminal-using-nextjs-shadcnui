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
  // Handle profile updates separately since it's a one-to-one relationship
  if (
    data.profile &&
    typeof data.profile === "object" &&
    "update" in data.profile
  ) {
    const profileData = data.profile.update as any;

    // Extract contacts if present and handle them separately
    const { contacts, ...profileFields } = profileData;

    // Update the profile without contacts first
    await prisma.profile.update({
      where: { portfolioId: id },
      data: profileFields,
    });

    // Handle contacts if they exist
    if (contacts && Array.isArray(contacts)) {
      // Get the profile ID first
      const profile = await prisma.profile.findUnique({
        where: { portfolioId: id },
        select: { id: true },
      });

      if (profile) {
        // Delete existing contacts
        await prisma.profileContact.deleteMany({
          where: { profileId: profile.id },
        });

        // Create new contacts
        for (const contact of contacts) {
          // First, find or create the contact
          let contactRecord = await prisma.contact.findFirst({
            where: {
              OR: [{ externalId: contact.externalId }, { link: contact.link }],
            },
          });

          if (!contactRecord) {
            contactRecord = await prisma.contact.create({
              data: {
                externalId: contact.externalId || `contact-${Date.now()}`,
                name: contact.name,
                icon: contact.icon,
                link: contact.link,
              },
            });
          }

          // Create the profile-contact relationship
          await prisma.profileContact.create({
            data: {
              profileId: profile.id,
              contactId: contactRecord.id,
            },
          });
        }
      }
    }

    // Remove profile from the main update
    const { profile, ...restData } = data;
    return prisma.portfolio.update({ where: { id }, data: restData });
  }

  return prisma.portfolio.update({ where: { id }, data });
}

export async function deletePortfolio(id: string) {
  return prisma.portfolio.delete({ where: { id } });
}
