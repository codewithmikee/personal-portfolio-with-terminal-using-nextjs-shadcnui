# Personal Portfolio Builder with Terminal Interface

A modern, full-stack portfolio management system built with Next.js, TypeScript, and shadcn/ui. Features a terminal-style interface for portfolio editing and a comprehensive admin dashboard for portfolio management.

## 🚀 Features

- **Portfolio Management Dashboard**: Complete CRUD operations for portfolios
- **Dynamic Portfolio Preview**: Real-time preview of portfolio changes
- **Terminal Interface**: Unique terminal-style editing experience
- **Export Functionality**: Export portfolios as PDF, JSON, Markdown, and CSV
- **Responsive Design**: Mobile-first, responsive UI
- **TypeScript Support**: Full type safety throughout the application
- **Database Integration**: Prisma ORM with SQLite database
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🏗️ Architecture

This is a monorepo containing:

- **`apps/admin`**: Portfolio management dashboard
- **`apps/web`**: Public portfolio display
- **`packages/ui`**: Shared UI component library
- **`packages/shared`**: Shared types and utilities

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Library**: shadcn/ui, Tailwind CSS
- **State Management**: Zustand
- **Database**: Prisma ORM with SQLite
- **Package Manager**: pnpm
- **Build Tool**: Turbo

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git

# Install dependencies
pnpm install

# Set up the database
cd apps/admin
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# Start development servers
pnpm dev
```

## 🚀 Development

```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm --filter admin dev
pnpm --filter web dev

# Build all apps
pnpm build

# Run type checking
pnpm typecheck

# Run linting
pnpm lint
```

## 📁 Project Structure

```
├── apps/
│   ├── admin/                 # Portfolio management dashboard
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   ├── lib/             # Utilities and services
│   │   ├── hooks/           # Custom React hooks
│   │   └── prisma/          # Database schema and migrations
│   └── web/                 # Public portfolio display
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── shared/              # Shared types and utilities
│   ├── eslint-config/       # ESLint configurations
│   └── typescript-config/   # TypeScript configurations
└── README.md
```

## 🎯 Usage

### Admin Dashboard

1. Navigate to `/admin` to access the portfolio management dashboard
2. Create, edit, and manage portfolios
3. Preview portfolios in real-time
4. Export portfolios in various formats

### Portfolio Management

- **Create Portfolio**: Add new portfolios with personal information
- **Edit Portfolio**: Modify portfolio content with live preview
- **Export Portfolio**: Download as PDF, JSON, Markdown, or CSV
- **Preview Portfolio**: See how the portfolio will look to visitors

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the `apps/admin` directory:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Database Setup

The application uses Prisma with SQLite. To set up the database:

```bash
cd apps/admin
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## 📚 API Documentation

The admin app provides RESTful APIs for portfolio management:

- `GET /api/portfolios` - List all portfolios
- `POST /api/portfolios` - Create a new portfolio
- `GET /api/portfolios/[id]` - Get a specific portfolio
- `PATCH /api/portfolios/[id]` - Update a portfolio
- `DELETE /api/portfolios/[id]` - Delete a portfolio

## 🚀 Deployment

See the deployment guides:

- [Admin App Deployment](./apps/admin/DEPLOYMENT.md)
- [Web App Deployment](./apps/web/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mikiyas Birhanu**

- Email: codewithmikee@gmail.com
- GitHub: [@codewithmikee](https://github.com/codewithmikee)
- Repository: [personal-portfolio-with-terminal-using-nextjs-shadcnui](https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Prisma](https://prisma.io/) for the database ORM
- [Tailwind CSS](https://tailwindcss.com/) for styling
