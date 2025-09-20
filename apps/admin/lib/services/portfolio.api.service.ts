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

export async function getPortfolioByExternalId(externalId: string) {
  return prisma.portfolio.findUnique({
    where: { externalId },
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

export async function createPortfolio(data: any) {
  const {
    profile,
    projects,
    experience,
    skills,
    tools,
    blogs,
    contacts,
    techStacks,
    ...portfolioData
  } = data;

  return prisma.portfolio.create({
    data: {
      ...portfolioData,
      profile: profile
        ? {
            create: {
              externalId: profile.externalId || `profile-${Date.now()}`,
              full_name: profile.full_name,
              email: profile.email,
              phone_number: profile.phone_number || "",
              address: profile.address || "",
              description: profile.description || "",
              profile_picture:
                profile.profile_picture || "/placeholder-user.jpg",
              contacts: profile.contacts
                ? {
                    create: profile.contacts.map((contact: any) => ({
                      contact: {
                        create: {
                          externalId:
                            contact.externalId || `contact-${Date.now()}`,
                          name: contact.name,
                          icon: contact.icon,
                          link: contact.link,
                        },
                      },
                    })),
                  }
                : undefined,
            },
          }
        : undefined,
      projects: projects
        ? {
            create: projects.map((project: any) => ({
              externalId: project.externalId || `project-${Date.now()}`,
              title: project.title,
              description: project.description,
              link: project.link,
              features: project.features
                ? {
                    create: project.features.map((feature: any) => ({
                      externalId: feature.externalId || `feature-${Date.now()}`,
                      title: feature.title,
                      description: feature.description,
                      techStacks: feature.techStacks
                        ? {
                            create: feature.techStacks.map((tech: any) => ({
                              techStack: {
                                create: {
                                  externalId:
                                    tech.externalId || `tech-${Date.now()}`,
                                  title: tech.title,
                                  key: tech.key,
                                  icon: tech.icon,
                                  level: tech.level,
                                  priority: tech.priority,
                                  type: tech.type,
                                },
                              },
                            })),
                          }
                        : undefined,
                    })),
                  }
                : undefined,
            })),
          }
        : undefined,
      experience: experience
        ? {
            create: experience.map((exp: any) => ({
              externalId: exp.externalId || `exp-${Date.now()}`,
              company_name: exp.company_name,
              company_description: exp.company_description,
              start_date: exp.start_date,
              end_date: exp.end_date,
              role: exp.role,
              job_type: exp.job_type,
              contacts: exp.contacts
                ? {
                    create: exp.contacts.map((contact: any) => ({
                      contact: {
                        create: {
                          externalId:
                            contact.externalId || `contact-${Date.now()}`,
                          name: contact.name,
                          icon: contact.icon,
                          link: contact.link,
                        },
                      },
                    })),
                  }
                : undefined,
            })),
          }
        : undefined,
      skills: skills
        ? {
            create: skills.map((skill: any) => ({
              externalId: skill.externalId || `skill-${Date.now()}`,
              title: skill.title,
            })),
          }
        : undefined,
      tools: tools
        ? {
            create: tools.map((tool: any) => ({
              externalId: tool.externalId || `tool-${Date.now()}`,
              title: tool.title,
            })),
          }
        : undefined,
      blogs: blogs
        ? {
            create: blogs.map((blog: any) => ({
              externalId: blog.externalId || `blog-${Date.now()}`,
              title: blog.title,
              link: blog.link,
              techStacks: blog.techStacks
                ? {
                    create: blog.techStacks.map((tech: any) => ({
                      techStack: {
                        create: {
                          externalId: tech.externalId || `tech-${Date.now()}`,
                          title: tech.title,
                          key: tech.key,
                          icon: tech.icon,
                          level: tech.level,
                          priority: tech.priority,
                          type: tech.type,
                        },
                      },
                    })),
                  }
                : undefined,
            })),
          }
        : undefined,
      contacts: contacts
        ? {
            create: contacts.map((contact: any) => ({
              contact: {
                create: {
                  externalId: contact.externalId || `contact-${Date.now()}`,
                  name: contact.name,
                  icon: contact.icon,
                  link: contact.link,
                },
              },
            })),
          }
        : undefined,
    },
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
