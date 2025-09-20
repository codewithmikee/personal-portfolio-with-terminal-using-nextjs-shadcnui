import type {
  EnhancedPortfolio,
  Profile,
  Contact,
  Project,
  Feature,
  TechStack,
  Experience,
  Skill,
  Tool,
  Blog,
} from "../types/portfolio.js";

// Helper to map junction contacts to plain contacts
function mapContacts(
  items?: Array<{ contact: { name: string; icon: string; link: string } }>
): Contact[] {
  if (!items) return [];
  return items.map((c) => ({
    name: c.contact.name,
    icon: c.contact.icon,
    link: c.contact.link,
  }));
}

function uniqueByKey<T extends { key?: string; title?: string }>(
  items: T[]
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const k = item.key || item.title || "";
    if (!seen.has(k)) {
      seen.add(k);
      result.push(item);
    }
  }
  return result;
}

export function adaptDbPortfolio(db: any): EnhancedPortfolio {
  const profile: Profile = {
    full_name: db.profile?.full_name || "",
    email: db.profile?.email || "",
    phone_number: db.profile?.phone_number || "",
    address: db.profile?.address || "",
    description: db.profile?.description || "",
    profile_picture: db.profile?.profile_picture || "/placeholder-user.jpg",
    contacts: mapContacts(db.profile?.contacts),
  };

  const projects: Project[] = (db.projects || []).map((p: any) => {
    const features: Feature[] = (p.features || []).map(
      (f: any): Feature => ({
        title: f.title,
        description: f.description,
        techStacks: (f.techStacks || []).map(
          (t: any) =>
            ({
              title: t.techStack.title,
              key: t.techStack.key,
              icon: t.techStack.icon,
              level: t.techStack.level,
              priority: t.techStack.priority,
              type: t.techStack.type,
            }) as TechStack
        ),
      })
    );
    return {
      title: p.title,
      description: p.description,
      link: p.link,
      features,
    } as Project;
  });

  const experience: Experience[] = (db.experience || []).map((e: any) => ({
    company_name: e.company_name,
    company_description: e.company_description,
    start_date: e.start_date,
    end_date: e.end_date || null,
    role: e.role,
    job_type: e.job_type,
    contacts: mapContacts(e.contacts),
  }));

  const blogs: Blog[] = (db.blogs || []).map((b: any) => ({
    title: b.title,
    link: b.link,
    techStacks: (b.techStacks || []).map(
      (t: any) =>
        ({
          title: t.techStack.title,
          key: t.techStack.key,
          icon: t.techStack.icon,
          level: t.techStack.level,
          priority: t.techStack.priority,
          type: t.techStack.type,
        }) as TechStack
    ),
  }));

  // Derive portfolio-level techStacks from projects + blogs
  const derivedTechStacks: TechStack[] = uniqueByKey([
    ...projects.flatMap((p) => p.features.flatMap((f) => f.techStacks)),
    ...blogs.flatMap((b) => b.techStacks),
  ]);

  const contacts: Contact[] = mapContacts(db.contacts);

  const skills: Skill[] = (db.skills || []).map((s: any) => ({
    title: s.title,
  }));
  const tools: Tool[] = (db.tools || []).map((t: any) => ({ title: t.title }));

  return {
    profile,
    techStacks: derivedTechStacks,
    contacts,
    projects,
    experience,
    skills,
    tools,
    blogs,
  };
}
