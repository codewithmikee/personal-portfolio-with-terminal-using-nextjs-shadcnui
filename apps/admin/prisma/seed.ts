import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional - use carefully in production)
  // await prisma.portfolioContact.deleteMany();
  // await prisma.profileContact.deleteMany();
  // await prisma.experienceContact.deleteMany();
  // await prisma.featureTechStack.deleteMany();
  // await prisma.blogTechStack.deleteMany();
  // await prisma.contact.deleteMany();
  // await prisma.techStack.deleteMany();
  // await prisma.feature.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.experience.deleteMany();
  // await prisma.skill.deleteMany();
  // await prisma.tool.deleteMany();
  // await prisma.blog.deleteMany();
  // await prisma.profile.deleteMany();
  // await prisma.portfolio.deleteMany();

  // Create Contacts
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
    prisma.contact.upsert({
      where: { externalId: "contact-github" },
      update: {},
      create: {
        externalId: "contact-github",
        name: "GitHub",
        icon: "/icons/github.svg",
        link: "https://github.com/codewithmikee",
      },
    }),
    prisma.contact.upsert({
      where: { externalId: "contact-email" },
      update: {},
      create: {
        externalId: "contact-email",
        name: "Email",
        icon: "/icons/email.svg",
        link: "mailto:mkbirhanu@gmail.com",
      },
    }),
    prisma.contact.upsert({
      where: { externalId: "contact-phone-1" },
      update: {},
      create: {
        externalId: "contact-phone-1",
        name: "Phone",
        icon: "/icons/phone.svg",
        link: "tel:+251923213768",
      },
    }),
    prisma.contact.upsert({
      where: { externalId: "contact-medium" },
      update: {},
      create: {
        externalId: "contact-medium",
        name: "Medium",
        icon: "/icons/medium.svg",
        link: "https://medium.com/@codewithmikee",
      },
    }),
    prisma.contact.upsert({
      where: { externalId: "contact-devto" },
      update: {},
      create: {
        externalId: "contact-devto",
        name: "Dev.to",
        icon: "/icons/devto.svg",
        link: "https://dev.to/codewithmikee",
      },
    }),
  ]);

  // Create Tech Stacks
  const techStacks = await Promise.all([
    // Backend
    prisma.techStack.upsert({
      where: { externalId: "tech-laravel" },
      update: {},
      create: {
        externalId: "tech-laravel",
        title: "Laravel",
        key: "laravel",
        icon: "/icons/laravel.svg",
        level: "Expert",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-php" },
      update: {},
      create: {
        externalId: "tech-php",
        title: "PHP",
        key: "php",
        icon: "/icons/php.svg",
        level: "Expert",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-redis" },
      update: {},
      create: {
        externalId: "tech-redis",
        title: "Redis",
        key: "redis",
        icon: "/icons/redis.svg",
        level: "Advanced",
        priority: "main",
        type: "Backend",
      },
    }),
    // Frontend
    prisma.techStack.upsert({
      where: { externalId: "tech-nextjs" },
      update: {},
      create: {
        externalId: "tech-nextjs",
        title: "Next.js",
        key: "nextjs",
        icon: "/icons/nextjs.svg",
        level: "Advanced",
        priority: "main",
        type: "Frontend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-typescript" },
      update: {},
      create: {
        externalId: "tech-typescript",
        title: "TypeScript",
        key: "typescript",
        icon: "/icons/typescript.svg",
        level: "Advanced",
        priority: "main",
        type: "Frontend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-react" },
      update: {},
      create: {
        externalId: "tech-react",
        title: "React",
        key: "react",
        icon: "/icons/react.svg",
        level: "Advanced",
        priority: "main",
        type: "Frontend",
      },
    }),
    // Mobile
    prisma.techStack.upsert({
      where: { externalId: "tech-flutter" },
      update: {},
      create: {
        externalId: "tech-flutter",
        title: "Flutter",
        key: "flutter",
        icon: "/icons/flutter.svg",
        level: "Advanced",
        priority: "main",
        type: "Mobile",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-dart" },
      update: {},
      create: {
        externalId: "tech-dart",
        title: "Dart",
        key: "dart",
        icon: "/icons/dart.svg",
        level: "Advanced",
        priority: "main",
        type: "Mobile",
      },
    }),
    // Database
    prisma.techStack.upsert({
      where: { externalId: "tech-postgresql" },
      update: {},
      create: {
        externalId: "tech-postgresql",
        title: "PostgreSQL",
        key: "postgresql",
        icon: "/icons/postgresql.svg",
        level: "Advanced",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-mysql" },
      update: {},
      create: {
        externalId: "tech-mysql",
        title: "MySQL",
        key: "mysql",
        icon: "/icons/mysql.svg",
        level: "Advanced",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-prisma" },
      update: {},
      create: {
        externalId: "tech-prisma",
        title: "Prisma",
        key: "prisma",
        icon: "/icons/prisma.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
    // Integrations
    prisma.techStack.upsert({
      where: { externalId: "tech-twilio" },
      update: {},
      create: {
        externalId: "tech-twilio",
        title: "Twilio",
        key: "twilio",
        icon: "/icons/twilio.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-mailtrap" },
      update: {},
      create: {
        externalId: "tech-mailtrap",
        title: "Mailtrap",
        key: "mailtrap",
        icon: "/icons/mailtrap.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
    // Tools
    prisma.techStack.upsert({
      where: { externalId: "tech-docker" },
      update: {},
      create: {
        externalId: "tech-docker",
        title: "Docker",
        key: "docker",
        icon: "/icons/docker.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-aws" },
      update: {},
      create: {
        externalId: "tech-aws",
        title: "AWS",
        key: "aws",
        icon: "/icons/aws.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-git" },
      update: {},
      create: {
        externalId: "tech-git",
        title: "Git",
        key: "git",
        icon: "/icons/git.svg",
        level: "Advanced",
        priority: "main",
        type: "Frontend",
      },
    }),
    // Additional Technologies from CV
    prisma.techStack.upsert({
      where: { externalId: "tech-pusher" },
      update: {},
      create: {
        externalId: "tech-pusher",
        title: "Pusher",
        key: "pusher",
        icon: "/icons/pusher.svg",
        level: "Advanced",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-rabbitmq" },
      update: {},
      create: {
        externalId: "tech-rabbitmq",
        title: "RabbitMQ",
        key: "rabbitmq",
        icon: "/icons/rabbitmq.svg",
        level: "Advanced",
        priority: "main",
        type: "Backend",
      },
    }),
    prisma.techStack.upsert({
      where: { externalId: "tech-azure" },
      update: {},
      create: {
        externalId: "tech-azure",
        title: "Azure",
        key: "azure",
        icon: "/icons/azure.svg",
        level: "Intermediate",
        priority: "side",
        type: "Backend",
      },
    }),
  ]);

  // Create Portfolio
  const portfolio = await prisma.portfolio.upsert({
    where: { externalId: "portfolio-mikiyas" },
    update: {},
    create: {
      externalId: "portfolio-mikiyas",
      profile: {
        create: {
          externalId: "profile-mikiyas",
          full_name: "Mikiyas Birhanu",
          email: "mkbirhanu@gmail.com",
          phone_number: "+251923213768",
          address: "Addis Ababa, Ethiopia",
          description:
            "Senior Full-Stack Developer with 5+ years of experience specializing in Laravel backend development and Next.js frontend applications. Proven expertise in building scalable web applications, RESTful APIs, and cross-platform mobile applications. Lead Developer at Migranium with strong background in payment integrations, real-time systems, and cloud deployment.",
          profile_picture: "/images/profile.jpg",
          contacts: {
            create: [
              { contact: { connect: { externalId: "contact-linkedin" } } },
              { contact: { connect: { externalId: "contact-github" } } },
              { contact: { connect: { externalId: "contact-email" } } },
              { contact: { connect: { externalId: "contact-phone-1" } } },
            ],
          },
        },
      },
      contacts: {
        create: contacts.map((contact) => ({
          contact: { connect: { id: contact.id } },
        })),
      },
      experience: {
        create: [
          {
            externalId: "exp-migranium",
            company_name: "Migranium.com",
            company_description:
              "Lead Developer: Architected and developed comprehensive multi-tenant SaaS healthcare platform using Laravel 12 microservices architecture with event-driven communication via RabbitMQ. Built advanced patient scheduling system with hierarchical business structure and complex service availability logic. Implemented real-time notification system using Pusher with WebSocket integration. Developed sophisticated automation workflow engine supporting 7+ action types with template variable processing. Created dynamic form management system with conditional logic and multi-level validation. Built comprehensive client portal security system with JWT authentication, 2FA, SSO integration (SAML2, OAuth), and role-based access control. Optimized database performance with Redis caching reducing API response times by 35%.",
            start_date: "2023-10",
            end_date: null,
            role: "FullStack",
            job_type: "Full_Time",
            contacts: {
              create: [
                { contact: { connect: { externalId: "contact-linkedin" } } },
              ],
            },
          },
          {
            externalId: "exp-packarma",
            company_name: "Packarma.com",
            company_description:
              "Full-Stack Developer: Migrated React frontend to Next.js with TypeScript, improving SEO ranking by 40%. Optimized Laravel API endpoints reducing server response time by 50%. Implemented real-time features using Laravel Echo and WebSockets. Enhanced user authentication system with role-based access control. Developed admin dashboard with advanced analytics and reporting features.",
            start_date: "2022-01",
            end_date: "2023-09",
            role: "FullStack",
            job_type: "Full_Time",
          },
          {
            externalId: "exp-dubbz",
            company_name: "Dubbz (formerly Homie)",
            company_description:
              "Mobile Developer: Developed cross-platform Flutter applications for food delivery platform serving Indian market. Integrated with Laravel backend APIs for order management and real-time tracking. Collaborated with remote teams using Agile methodologies and Slack/Trello. Implemented responsive UI designs supporting both Android and iOS platforms. Optimized application performance reducing load times by 30%.",
            start_date: "2021-03",
            end_date: "2023-12",
            role: "Mobile",
            job_type: "Contract",
          },
          {
            externalId: "exp-zayride",
            company_name: "ZayRide",
            company_description:
              "Mobile Application Developer for Ethiopian ride-hailing service. Developed rider and customer applications with Flutter.",
            start_date: "2020-01",
            end_date: "2020-10",
            role: "Mobile",
            job_type: "Contract",
          },
          {
            externalId: "exp-farka",
            company_name: "Farka ICT Solutions",
            company_description:
              "Full-Stack Developer: Developed university management system using Laravel backend and React frontend. Created school inspection management system deployed across 50+ institutions. Implemented complex reporting features with data visualization dashboards. Designed database schemas and optimized SQL queries for performance. Collaborated with cross-functional teams to deliver projects on schedule.",
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
            externalId: "proj-migranium",
            title: "Migranium Healthcare Platform",
            description:
              "Comprehensive multi-tenant SaaS healthcare platform using Laravel 12 microservices architecture with event-driven communication via RabbitMQ. Advanced patient scheduling system with hierarchical business structure supporting complex service availability logic and multi-level validation.",
            link: "https://migranium.com",
            features: {
              create: [
                {
                  externalId: "feature-migranium-1",
                  title: "Microservices Architecture",
                  description:
                    "Architected Laravel 12 microservices with event-driven communication via RabbitMQ for inter-service messaging",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-rabbitmq" } },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-migranium-2",
                  title: "Real-time Notifications",
                  description:
                    "Implemented real-time notification system using Pusher with WebSocket integration, supporting user-specific and channel-based messaging",
                  techStacks: {
                    create: [
                      { techStack: { connect: { externalId: "tech-pusher" } } },
                      { techStack: { connect: { externalId: "tech-twilio" } } },
                      {
                        techStack: { connect: { externalId: "tech-mailtrap" } },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-migranium-3",
                  title: "Advanced Security System",
                  description:
                    "Built comprehensive client portal security system with JWT authentication, 2FA, SSO integration (SAML2, OAuth), and role-based access control",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-redis" } },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-migranium-4",
                  title: "Performance Optimization",
                  description:
                    "Optimized database performance with Redis caching, query optimization, and indexing strategies reducing API response times by 35%",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-redis" } },
                      },
                      {
                        techStack: {
                          connect: { externalId: "tech-postgresql" },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            externalId: "proj-dental-clinic",
            title: "Dental Clinic Management System",
            description:
              "Comprehensive clinic management platform for multiple dental practices with patient records, appointment scheduling, and payment processing. Reduced administrative tasks by 70% for clinic staff with custom reporting and analytics dashboard.",
            link: "",
            features: {
              create: [
                {
                  externalId: "feature-dental-1",
                  title: "Patient Management",
                  description:
                    "Complete patient records and history tracking with advanced search and filtering capabilities",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                      { techStack: { connect: { externalId: "tech-mysql" } } },
                    ],
                  },
                },
                {
                  externalId: "feature-dental-2",
                  title: "Appointment Scheduling",
                  description:
                    "Calendar-based appointment system with automated reminders and conflict detection",
                  techStacks: {
                    create: [
                      { techStack: { connect: { externalId: "tech-nextjs" } } },
                      {
                        techStack: {
                          connect: { externalId: "tech-typescript" },
                        },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-dental-3",
                  title: "Analytics Dashboard",
                  description:
                    "Custom reporting and analytics dashboard with data visualization for business insights",
                  techStacks: {
                    create: [
                      { techStack: { connect: { externalId: "tech-nextjs" } } },
                      {
                        techStack: { connect: { externalId: "tech-react" } },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            externalId: "proj-inventory-system",
            title: "Inventory Management System",
            description:
              "Custom inventory solution for local retail businesses with real-time stock tracking, low inventory alerts, and advanced reporting. Deployed to 10+ local businesses with customized configurations and sales analytics.",
            link: "",
            features: {
              create: [
                {
                  externalId: "feature-inventory-1",
                  title: "Real-time Stock Management",
                  description:
                    "Real-time inventory tracking with automated low stock alerts and automated reorder suggestions",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                      {
                        techStack: {
                          connect: { externalId: "tech-postgresql" },
                        },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-inventory-2",
                  title: "Advanced Analytics",
                  description:
                    "Comprehensive reporting dashboard with sales analytics, profit margins, and business insights",
                  techStacks: {
                    create: [
                      { techStack: { connect: { externalId: "tech-nextjs" } } },
                      {
                        techStack: {
                          connect: { externalId: "tech-typescript" },
                        },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-inventory-3",
                  title: "Multi-tenant Configuration",
                  description:
                    "Customized configurations for different business types with flexible settings and permissions",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-redis" } },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            externalId: "proj-food-delivery",
            title: "Food Delivery Mobile App (Dubbz/Homie)",
            description:
              "Cross-platform food delivery application for Indian market with real-time order tracking, notification system, integrated payment processing, and rating system. Supported 1000+ daily active users.",
            link: "",
            features: {
              create: [
                {
                  externalId: "feature-delivery-1",
                  title: "Real-time Order Tracking",
                  description:
                    "Live order tracking with GPS integration and real-time status updates",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-flutter" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-dart" } },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-delivery-2",
                  title: "Payment Integration",
                  description:
                    "Integrated payment processing with multiple payment methods and secure transactions",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-flutter" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                    ],
                  },
                },
                {
                  externalId: "feature-delivery-3",
                  title: "Rating & Review System",
                  description:
                    "Comprehensive rating and review system for restaurants and delivery partners",
                  techStacks: {
                    create: [
                      {
                        techStack: { connect: { externalId: "tech-flutter" } },
                      },
                      {
                        techStack: { connect: { externalId: "tech-laravel" } },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      skills: {
        create: [
          { externalId: "skill-laravel", title: "Laravel" },
          { externalId: "skill-nextjs", title: "Next.js" },
          { externalId: "skill-typescript", title: "TypeScript" },
          { externalId: "skill-react", title: "React" },
          { externalId: "skill-php", title: "PHP" },
          { externalId: "skill-postgresql", title: "PostgreSQL" },
          { externalId: "skill-mysql", title: "MySQL" },
          { externalId: "skill-redis", title: "Redis" },
          { externalId: "skill-flutter", title: "Flutter" },
          { externalId: "skill-dart", title: "Dart" },
          { externalId: "skill-docker", title: "Docker" },
          { externalId: "skill-aws", title: "AWS" },
          { externalId: "skill-azure", title: "Azure" },
          { externalId: "skill-prisma", title: "Prisma" },
        ],
      },
      tools: {
        create: [
          { externalId: "tool-git", title: "Git" },
          { externalId: "tool-bitbucket", title: "Bitbucket" },
          { externalId: "tool-twilio", title: "Twilio" },
          { externalId: "tool-mailtrap", title: "Mailtrap" },
          { externalId: "tool-pusher", title: "Pusher" },
          { externalId: "tool-rabbitmq", title: "RabbitMQ" },
          { externalId: "tool-trello", title: "Trello" },
          { externalId: "tool-slack", title: "Slack" },
          { externalId: "tool-linear", title: "Linear" },
          { externalId: "tool-docker", title: "Docker" },
          { externalId: "tool-aws", title: "AWS" },
          { externalId: "tool-azure", title: "Azure" },
        ],
      },
      blogs: {
        create: [
          {
            externalId: "blog-laravel-nextjs",
            title: "Building Full-Stack Apps with Laravel and Next.js",
            link: "https://dev.to/codewithmikee/building-full-stack-apps-with-laravel-and-nextjs",
            techStacks: {
              create: [
                { techStack: { connect: { externalId: "tech-laravel" } } },
                { techStack: { connect: { externalId: "tech-nextjs" } } },
              ],
            },
          },
          {
            externalId: "blog-api-design",
            title: "RESTful API Design Best Practices",
            link: "https://medium.com/@codewithmikee/restful-api-design-best-practices",
            techStacks: {
              create: [
                { techStack: { connect: { externalId: "tech-laravel" } } },
                { techStack: { connect: { externalId: "tech-php" } } },
              ],
            },
          },
          {
            externalId: "blog-microservices",
            title: "Microservices Architecture with Laravel and RabbitMQ",
            link: "https://dev.to/codewithmikee/microservices-architecture-with-laravel-and-rabbitmq",
            techStacks: {
              create: [
                { techStack: { connect: { externalId: "tech-laravel" } } },
                { techStack: { connect: { externalId: "tech-rabbitmq" } } },
              ],
            },
          },
          {
            externalId: "blog-flutter-laravel",
            title: "Building Mobile Apps with Flutter and Laravel Backend",
            link: "https://medium.com/@codewithmikee/building-mobile-apps-with-flutter-and-laravel-backend",
            techStacks: {
              create: [
                { techStack: { connect: { externalId: "tech-flutter" } } },
                { techStack: { connect: { externalId: "tech-laravel" } } },
              ],
            },
          },
        ],
      },
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
