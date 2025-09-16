# Development Guide

This document provides detailed information for developers working on the Ultimate Portfolio Website project.

## 🛠 Development Tools

### Primary Tools

- **Cursor** - AI-powered code editor for enhanced development experience
- **21dev** - UI component library and design system integration
- **Docker** - Containerization for consistent development environments

### Supporting Tools

- **Git** - Version control and collaboration
- **Composer** - PHP dependency management
- **npm/pnpm** - Node.js package management
- **PHPUnit** - PHP testing framework
- **Postman** - API testing and documentation

## 🚧 Current Development Status

### In Progress Features

#### 1. AI Agent Integration

- **Status**: Planning
- **Description**: Interactive AI assistant for portfolio navigation and Q&A
- **Tech Stack**: OpenAI API, React hooks, TypeScript
- **Files**: `components/ai-agent/`, `lib/ai/`

#### 2. CV/PDF Export

- **Status**: Planning
- **Description**: Generate downloadable CV and PDF versions of the portfolio
- **Tech Stack**: Puppeteer, jsPDF, React components
- **Files**: `lib/export/`, `components/export/`

#### 3. Contact Form

- **Status**: Planning
- **Description**: Interactive contact form with backend integration and email notifications
- **Tech Stack**: Next.js API routes, Nodemailer, Prisma
- **Files**: `app/api/contact/`, `components/contact-form/`

#### 4. Data Source Enhancement

- **Status**: Planning
- **Description**: More comprehensive portfolio data structure and validation
- **Tech Stack**: Zod, Prisma, TypeScript
- **Files**: `types/`, `lib/validation/`, `prisma/schema.prisma`

### Planned Features

#### 1. Multi-language Support

- **Priority**: Medium
- **Description**: Internationalization for global reach
- **Tech Stack**: next-intl, i18n

#### 2. Analytics Dashboard

- **Priority**: Low
- **Description**: Visitor insights and portfolio performance metrics
- **Tech Stack**: Google Analytics, Chart.js

#### 3. Blog Integration

- **Priority**: Medium
- **Description**: Content management system for blog posts
- **Tech Stack**: MDX, Prisma, React

#### 4. Project Demos

- **Priority**: High
- **Description**: Interactive project demonstrations and live previews
- **Tech Stack**: iframe, Web Components

#### 5. Testimonials

- **Priority**: Medium
- **Description**: Client and colleague testimonials section
- **Tech Stack**: Prisma, React components

#### 6. Advanced Terminal Commands

- **Priority**: Low
- **Description**: More interactive terminal features and games
- **Tech Stack**: React, TypeScript

## 🏗️ Architecture Overview

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI + Custom components
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend

- **API**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js (planned)
- **File Storage**: Local filesystem (planned: AWS S3)

### Development

- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library (planned)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin panel
│   ├── manage/            # CV builder
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── sections/          # Portfolio sections
│   ├── ui/                # UI components
│   └── terminal-simulator.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── services/          # API services
│   └── stores/            # Zustand stores
├── prisma/                # Database schema
├── public/                # Static assets
├── types/                 # TypeScript types
└── docs/                  # Documentation
```

## 🔧 Development Workflow

### 1. Setup

```bash
# Clone repository
git clone <repository-url>
cd portfolio-website

# Install dependencies
pnpm install

# Setup database
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed

# Start development server
pnpm dev
```

### 2. Feature Development

1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement changes
3. Test thoroughly
4. Update documentation
5. Create pull request

### 3. Code Standards

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for functions
- Write tests for new features
- Update documentation

## 🧪 Testing

### Current Testing

- Type checking with TypeScript
- Build verification with Next.js

### Planned Testing

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- API tests with Supertest

## 📚 Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

### Tools

- [Cursor Editor](https://cursor.sh/)
- [21dev Components](https://21st.dev/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Getting Help

- Check existing issues on GitHub
- Create new issue with detailed description
- Join our Discord community (coming soon)
- Contact maintainers directly

## 📝 Contributing Guidelines

1. Follow the existing code style
2. Write clear commit messages
3. Update documentation for new features
4. Add tests for new functionality
5. Ensure all checks pass before submitting PR

---

**Happy coding! 🚀**
