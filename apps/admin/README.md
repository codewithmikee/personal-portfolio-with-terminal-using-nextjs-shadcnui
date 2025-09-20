# 🚀 Ultimate Portfolio Website with Terminal Interface

A modern, interactive portfolio website built with Next.js 14, featuring a unique terminal interface, comprehensive admin panel, and real-time data management. Perfect for developers who want to showcase their work with style and functionality.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features

- **Interactive Terminal Interface** - Navigate your portfolio like a developer
- **Real-time Admin Panel** - Manage your portfolio data with live updates
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes seamlessly
- **Toast Notifications** - User-friendly feedback for all actions
- **Optimistic Updates** - Instant UI updates with rollback on errors

### 🛠 Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Prisma ORM** with SQLite database
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Radix UI** components
- **Lucide React** icons
- **Toast notifications** for user feedback

### 🛠 Development Tools

This project was built and maintained using modern development tools:

- **Cursor** - AI-powered code editor for enhanced development experience
- **21dev** - UI component library and design system integration
- **Docker** - Containerization for consistent development environments
- **Git** - Version control and collaboration
- **Composer** - PHP dependency management
- **npm/pnpm** - Node.js package management
- **PHPUnit** - PHP testing framework
- **Postman** - API testing and documentation

### 📊 Portfolio Management

- **Profile Management** - Personal information and contact details
- **Experience Tracking** - Work history with detailed descriptions
- **Project Showcase** - Featured projects with links and descriptions
- **Skills & Tools** - Technical skills and tools you use
- **Real-time Editing** - Edit content directly in the admin panel
- **Data Export/Import** - JSON-based data portability

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/codewithmikee/ultimate-portfolio-website.git
   cd ultimate-portfolio-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db seed
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── manage/            # Portfolio management
│   └── page.tsx           # Main portfolio page
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── sections/          # Portfolio sections
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── services/          # API services
│   └── stores/            # State management
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🎨 Customization

### Personal Information

1. Navigate to `/admin` or `/manage`
2. Update your profile information
3. Add your work experience
4. Showcase your projects
5. List your skills and tools

### Styling

- Modify `app/globals.css` for global styles
- Update component styles in `components/`
- Customize theme colors in `tailwind.config.js`

### Database Schema

- Edit `prisma/schema.prisma` to modify data structure
- Run `pnpm prisma db push` to apply changes

## 🔧 API Documentation

### Portfolio Endpoints

#### GET `/api/portfolios`

Retrieve all portfolios

```typescript
Response: EnhancedPortfolio[]
```

#### GET `/api/portfolios/[id]`

Retrieve specific portfolio

```typescript
Response: EnhancedPortfolio;
```

#### PATCH `/api/portfolios/[id]`

Update portfolio data

```typescript
Body: {
  profile?: { update: Partial<Profile> },
  experience?: { create: Experience } | { updateMany: { where: { id: number }, data: Partial<Experience> } } | { deleteMany: { id: number } },
  projects?: { create: Project } | { updateMany: { where: { id: number }, data: Partial<Project> } } | { deleteMany: { id: number } },
  skills?: { set: Skill[] },
  tools?: { set: Tool[] }
}
```

## 🎣 Hooks API

### `usePortfolioData()`

Main hook for portfolio management

```typescript
const {
  portfolio, // Current portfolio data
  isLoading, // Loading state
  error, // Error message
  loadPortfolio, // Load data from API
  retry, // Retry failed operations
  updateProfile, // Update profile info
  addExperience, // Add work experience
  updateExperience, // Update experience
  removeExperience, // Remove experience
  addProject, // Add project
  updateProject, // Update project
  removeProject, // Remove project
  updateSkills, // Update skills
  updateTools, // Update tools
  exportJSON, // Export as JSON
  importJSON, // Import from JSON
  resetToDefault, // Reset to defaults
} = usePortfolioData();
```

### `usePortfolioDataReadOnly()`

Read-only access for display components

```typescript
const { portfolio, isLoading, error } = usePortfolioDataReadOnly();
```

### `usePortfolioActions()`

CRUD operations only

```typescript
const {
  updateProfile,
  addExperience,
  // ... other actions
} = usePortfolioActions();
```

## 🎨 Components

### Portfolio Sections

- **Hero** - Introduction and main CTA
- **About** - Personal information and bio
- **Experience** - Work history timeline
- **Projects** - Featured projects showcase
- **Skills** - Technical skills and tools
- **Contact** - Contact information and social links

### Admin Components

- **AdminPanel** - Main admin interface
- **DataManager** - Data import/export
- **Editors** - Individual section editors
- **CVBuilder** - Resume/CV builder interface

## 🗺️ Roadmap & Future Features

### 🚧 In Development

- **AI Agent Integration** - Interactive AI assistant for portfolio navigation and Q&A
- **CV/PDF Export** - Generate downloadable CV and PDF versions of the portfolio
- **Contact Form** - Interactive contact form with backend integration and email notifications
- **Data Source Enhancement** - More comprehensive portfolio data structure and validation

### 🎯 Planned Features

- **Multi-language Support** - Internationalization for global reach
- **Analytics Dashboard** - Visitor insights and portfolio performance metrics
- **Blog Integration** - Content management system for blog posts
- **Project Demos** - Interactive project demonstrations and live previews
- **Testimonials** - Client and colleague testimonials section
- **Advanced Terminal Commands** - More interactive terminal features and games

### 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables if needed
4. Deploy!

### Other Platforms

- **Netlify** - Static export with API routes
- **Railway** - Full-stack deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Vercel** for hosting and deployment
- **Prisma** team for the excellent ORM
- **Radix UI** for accessible components
- **Tailwind CSS** for utility-first styling

## 📞 Support

- **Issues** - [GitHub Issues](https://github.com/codewithmikee/ultimate-portfolio-website/issues)
- **Discussions** - [GitHub Discussions](https://github.com/codewithmikee/ultimate-portfolio-website/discussions)
- **Email** - codewithmikee@gmail.com

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ by [Mikiyas Birhanu](https://github.com/codewithmikee)**

_Building the future, one portfolio at a time._
