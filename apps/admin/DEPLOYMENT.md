# Admin App Deployment Guide

This guide covers deploying the Portfolio Management Admin App to Vercel.

## 🚀 Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Node.js 18+ installed locally

## 📋 Pre-deployment Setup

### 1. Environment Variables

Create a `.env.local` file in the `apps/admin` directory with the following variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# API Configuration
NEXT_PUBLIC_API_URL="https://your-admin-app.vercel.app"

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

### 2. Database Setup

The admin app uses Prisma with SQLite. For production, consider using a PostgreSQL database:

```env
# For PostgreSQL (recommended for production)
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

## 🚀 Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy from admin directory**:

   ```bash
   cd apps/admin
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set root directory to `apps/admin`
   - Configure build settings

### Method 2: Vercel Dashboard

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/admin`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

3. **Environment Variables**:
   - Add all required environment variables
   - Set `DATABASE_URL` for your production database

## 🔧 Build Configuration

### Vercel Configuration

Create a `vercel.json` file in the `apps/admin` directory:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Package.json Scripts

Ensure your `package.json` has the correct build scripts:

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev"
  }
}
```

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)

1. **Add Vercel Postgres**:
   - Go to your project dashboard
   - Navigate to "Storage" tab
   - Add "Postgres" database

2. **Update Environment Variables**:

   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   ```

3. **Run Migrations**:
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

### Option 2: External Database

1. **Choose Database Provider**:
   - Supabase
   - PlanetScale
   - Railway
   - Neon

2. **Get Connection String**:
   - Copy the connection string from your provider
   - Add it to Vercel environment variables

3. **Run Migrations**:
   ```bash
   pnpm db:migrate
   pnpm db:seed
   ```

## 🔐 Security Considerations

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable system
- Rotate secrets regularly

### Database Security

- Use connection pooling
- Enable SSL connections
- Set up proper access controls

### API Security

- Implement rate limiting
- Add authentication middleware
- Validate all inputs

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**:
   - Go to project settings
   - Enable Vercel Analytics
   - Add tracking code to your app

2. **Custom Analytics**:

   ```tsx
   import { Analytics } from "@vercel/analytics/react";

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### Error Monitoring

Consider adding error monitoring:

```bash
pnpm add @sentry/nextjs
```

## 🚀 Deployment Steps

1. **Prepare Repository**:

   ```bash
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect repository to Vercel
   - Configure build settings
   - Set environment variables
   - Deploy

3. **Verify Deployment**:
   - Check build logs
   - Test all functionality
   - Verify database connections

## 🔄 Continuous Deployment

### GitHub Integration

1. **Connect GitHub**:
   - Link your GitHub repository
   - Enable automatic deployments

2. **Branch Protection**:
   - Set up branch protection rules
   - Require pull request reviews

3. **Preview Deployments**:
   - Enable preview deployments for PRs
   - Test changes before merging

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel dashboard
   - Verify all dependencies are installed
   - Ensure TypeScript compilation passes

2. **Database Connection Issues**:
   - Verify DATABASE_URL is correct
   - Check database provider status
   - Ensure migrations are run

3. **Environment Variable Issues**:
   - Verify all required variables are set
   - Check variable names and values
   - Restart deployment after changes

### Debug Commands

```bash
# Check build locally
pnpm build

# Run type checking
pnpm typecheck

# Test database connection
pnpm db:generate
```

## 📈 Performance Optimization

### Build Optimization

1. **Enable SWC**:

   ```json
   {
     "compiler": {
       "swcMinify": true
     }
   }
   ```

2. **Image Optimization**:
   - Use Next.js Image component
   - Optimize image formats
   - Implement lazy loading

3. **Bundle Analysis**:
   ```bash
   pnpm add -D @next/bundle-analyzer
   ```

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

## 👨‍💻 Author

**Mikiyas Birhanu**

- Email: codewithmikee@gmail.com
- GitHub: [@codewithmikee](https://github.com/codewithmikee)
- Repository: [personal-portfolio-with-terminal-using-nextjs-shadcnui](https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git)
