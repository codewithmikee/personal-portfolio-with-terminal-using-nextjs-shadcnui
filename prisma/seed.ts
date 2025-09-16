import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Reusable Contacts
  const contacts = await Promise.all([
    prisma.contact.upsert({
      where: { externalId: "contact-linkedin" },
      update: {},
      create: {
        externalId: "contact-linkedin",
        name: "LinkedIn",
        icon: "/icons/linkedin.svg",
        link: "https://linkedin.com/in/mikiyas-birhanu-957b71131",
      },
    }),
    prisma.contact.create({
      data: {
        externalId: "contact-github",
        name: "GitHub",
        icon: "/icons/github.svg",
        link: "https://github.com/mikerashoo",
      },
    }),
    prisma.contact.create({
      data: {
        externalId: "contact-email",
        name: "Email",
        icon: "/icons/email.svg",
        link: "mailto:mkbirhanu@gmail.com",
      },
    }),
    prisma.contact.create({
      data: {
        externalId: "contact-phone-1",
        name: "Phone",
        icon: "/icons/phone.svg",
        link: "tel:+251923213768",
      },
    }),
    prisma.contact.create({
      data: {
        externalId: "contact-phone-2",
        name: "Phone",
        icon: "/icons/phone.svg",
        link: "tel:+251913369576",
      },
    }),
  ]);

  // Reusable TechStacks
  const techTitles = [
    // Backend
    {
      title: "Laravel",
      key: "laravel",
      icon: "/icons/laravel.svg",
      level: "Advanced",
      priority: "main",
      type: "Backend",
    },
    {
      title: "Node.js",
      key: "nodejs",
      icon: "/icons/nodejs.svg",
      level: "Advanced",
      priority: "main",
      type: "Backend",
    },
    {
      title: "PHP",
      key: "php",
      icon: "/icons/php.svg",
      level: "Advanced",
      priority: "main",
      type: "Backend",
    },
    {
      title: "MySQL",
      key: "mysql",
      icon: "/icons/mysql.svg",
      level: "Advanced",
      priority: "main",
      type: "Backend",
    },
    {
      title: "PostgreSQL",
      key: "postgresql",
      icon: "/icons/postgresql.svg",
      level: "Advanced",
      priority: "main",
      type: "Backend",
    },
    {
      title: "MongoDB",
      key: "mongodb",
      icon: "/icons/mongodb.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    // Frontend
    {
      title: "Next.js",
      key: "nextjs",
      icon: "/icons/nextjs.svg",
      level: "Advanced",
      priority: "main",
      type: "Frontend",
    },
    {
      title: "React",
      key: "react",
      icon: "/icons/react.svg",
      level: "Advanced",
      priority: "main",
      type: "Frontend",
    },
    {
      title: "Electron.js",
      key: "electron",
      icon: "/icons/electron.svg",
      level: "Intermediate",
      priority: "side",
      type: "Frontend",
    },
    // Mobile
    {
      title: "Flutter",
      key: "flutter",
      icon: "/icons/flutter.svg",
      level: "Intermediate",
      priority: "side",
      type: "Mobile",
    },
    {
      title: "Android",
      key: "android",
      icon: "/icons/android.svg",
      level: "Intermediate",
      priority: "side",
      type: "Mobile",
    },
    // DevOps
    {
      title: "Docker",
      key: "docker",
      icon: "/icons/docker.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "AWS",
      key: "aws",
      icon: "/icons/aws.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "Digital Ocean",
      key: "digitalocean",
      icon: "/icons/do.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "Nginx",
      key: "nginx",
      icon: "/icons/nginx.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "Apache",
      key: "apache",
      icon: "/icons/apache.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    // Tools
    {
      title: "Git",
      key: "git",
      icon: "/icons/git.svg",
      level: "Advanced",
      priority: "main",
      type: "Frontend",
    },
    {
      title: "Bitbucket",
      key: "bitbucket",
      icon: "/icons/bitbucket.svg",
      level: "Intermediate",
      priority: "side",
      type: "Frontend",
    },
    {
      title: "Stripe",
      key: "stripe",
      icon: "/icons/stripe.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "Twilio",
      key: "twilio",
      icon: "/icons/twilio.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
    {
      title: "Mailtrap",
      key: "mailtrap",
      icon: "/icons/mailtrap.svg",
      level: "Intermediate",
      priority: "side",
      type: "Backend",
    },
  ];

  for (const t of techTitles) {
    await prisma.techStack
      .create({
        data: {
          externalId: `tech-${t.key}`,
          title: t.title,
          key: t.key,
          icon: t.icon,
          level: t.level as any,
          priority: t.priority as any,
          type: t.type as any,
        },
      })
      .catch(() => {});
  }

  // Create Portfolio
  const portfolio = await prisma.portfolio.create({
    data: {
      externalId: "portfolio-mikiyas",
      profile: {
        create: {
          externalId: "profile-mikiyas",
          full_name: "Mikiyas Birhanu",
          email: "mkbirhanu@gmail.com",
          phone_number: "+251923213768 | +251913369576",
          address: "Addis Ababa, Ethiopia",
          description:
            "Experienced full-stack developer with 6+ years specializing in Laravel and Next.js. Lead Developer at Migranium.com, built backend with payments and notifications.",
          profile_picture: "",
          contacts: {
            create: contacts
              .slice(0, 3)
              .map((c) => ({ contact: { connect: { id: c.id } } })),
          },
        },
      },
      contacts: {
        create: contacts.map((c) => ({ contact: { connect: { id: c.id } } })),
      },
      experience: {
        create: [
          {
            externalId: "exp-migranium",
            company_name: "Migranium.com",
            company_description:
              "Lead Developer: Designed, developed and deployed complete backend system with Stripe/Cashier, Mailtrap, Twilio. Deployed on Digital Ocean.",
            start_date: "2020-10",
            end_date: null,
            role: "FullStack",
            job_type: "Full_Time",
          },
          {
            externalId: "exp-dubbz",
            company_name: "Dubbz (formerly Homie)",
            company_description:
              "Mobile Application Developer: Built Android/iOS apps for food delivery platform in Indian market.",
            start_date: "2021-03",
            end_date: "2023-12",
            role: "Mobile",
            job_type: "Contract",
          },
          {
            externalId: "exp-zayride",
            company_name: "ZayRide",
            company_description:
              "Developed rider and customer applications for Ethiopian ride-hailing service.",
            start_date: "2020-01",
            end_date: "2020-10",
            role: "Mobile",
            job_type: "Contract",
          },
          {
            externalId: "exp-farka",
            company_name: "Farka ICT Solutions",
            company_description:
              "Full-Stack Developer: University Management System; School Inspection Management System using React, Laravel, Node.",
            start_date: "2018-09",
            end_date: "2019-12",
            role: "FullStack",
            job_type: "Full_Time",
          },
        ],
      },
      projects: {
        create: [
          {
            externalId: "proj-migranium-backend",
            title: "Migranium.com Backend",
            description: "Laravel backend for virtual queue management",
            link: "https://migranium.com",
          },
          {
            externalId: "proj-dental",
            title: "Dental Clinic Management",
            description: "Full-stack system with Laravel and React.js",
            link: "",
          },
          {
            externalId: "proj-inventory",
            title: "Inventory Management System",
            description: "Stock and sales tracking system",
            link: "",
          },
          {
            externalId: "proj-packarma",
            title: "Packarma.com",
            description: "Full-stack development with optimization",
            link: "https://packarma.com",
          },
        ],
      },
      skills: {
        create: [
          { externalId: "skill-laravel", title: "Laravel" },
          { externalId: "skill-nextjs", title: "Next.js" },
          { externalId: "skill-react", title: "React.js" },
          { externalId: "skill-php", title: "PHP" },
          { externalId: "skill-node", title: "Node.js" },
          { externalId: "skill-postgres", title: "PostgreSQL" },
          { externalId: "skill-mysql", title: "MySQL" },
          { externalId: "skill-docker", title: "Docker" },
          { externalId: "skill-aws", title: "AWS" },
        ],
      },
      tools: {
        create: [
          { externalId: "tool-git", title: "Git" },
          { externalId: "tool-bitbucket", title: "Bitbucket" },
          { externalId: "tool-stripe", title: "Stripe" },
          { externalId: "tool-twilio", title: "Twilio" },
          { externalId: "tool-mailtrap", title: "Mailtrap" },
        ],
      },
      blogs: { create: [] },
    },
  });

  console.log("Seeded portfolio:", portfolio.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
