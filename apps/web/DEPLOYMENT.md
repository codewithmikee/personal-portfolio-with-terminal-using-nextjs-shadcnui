# Web App Deployment Guide

This guide covers deploying the Portfolio Web App to Vercel.

## 🚀 Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Node.js 18+ installed locally

## 📋 Pre-deployment Setup

### 1. Environment Variables

Create a `.env.local` file in the `apps/web` directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL="https://your-admin-app.vercel.app"

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

### 2. Portfolio Data

The web app displays portfolio data. Ensure your admin app is deployed and accessible.

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

3. **Deploy from web directory**:
   ```bash
   cd apps/web
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set root directory to `apps/web`
   - Configure build settings

### Method 2: Vercel Dashboard

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

3. **Environment Variables**:
   - Add all required environment variables
   - Set `NEXT_PUBLIC_API_URL` to your admin app URL

## 🔧 Build Configuration

### Vercel Configuration

Create a `vercel.json` file in the `apps/web` directory:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
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

## 🔗 API Integration

### Admin App Connection

The web app fetches portfolio data from the admin app's API:

1. **Set API URL**:
   ```env
   NEXT_PUBLIC_API_URL="https://your-admin-app.vercel.app"
   ```

2. **CORS Configuration**:
   Ensure your admin app allows requests from the web app domain.

3. **API Endpoints**:
   The web app uses these endpoints:
   - `GET /api/portfolios` - List portfolios
   - `GET /api/portfolios/[id]` - Get specific portfolio

## 🔐 Security Considerations

### CORS Configuration

Update your admin app's API routes to allow requests from the web app:

```typescript
// In your API route
export async function GET() {
  const response = await fetch(url);
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://your-web-app.vercel.app',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable system
- Keep API URLs secure

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**:
   - Go to project settings
   - Enable Vercel Analytics
   - Add tracking code to your app

2. **Custom Analytics**:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

### Performance Monitoring

Consider adding performance monitoring:

```bash
pnpm add @vercel/speed-insights
```

## 🚀 Deployment Steps

1. **Prepare Repository**:
   ```bash
   git add .
   git commit -m "feat: prepare web app for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Connect repository to Vercel
   - Configure build settings
   - Set environment variables
   - Deploy

3. **Verify Deployment**:
   - Check build logs
   - Test portfolio display
   - Verify API connections

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

2. **API Connection Issues**:
   - Verify NEXT_PUBLIC_API_URL is correct
   - Check CORS configuration
   - Ensure admin app is accessible

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

# Test API connection
curl https://your-admin-app.vercel.app/api/portfolios
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

### Caching Strategy

1. **Static Generation**:
   - Use `getStaticProps` for portfolio data
   - Implement ISR for dynamic content
   - Cache API responses

2. **CDN Configuration**:
   - Use Vercel's CDN
   - Configure cache headers
   - Optimize asset delivery

## 🔗 Domain Configuration

### Custom Domain

1. **Add Custom Domain**:
   - Go to project settings
   - Add your custom domain
   - Configure DNS records

2. **SSL Certificate**:
   - Vercel automatically provides SSL
   - Ensure HTTPS is enforced
   - Update API URLs to use HTTPS

## 📱 Mobile Optimization

### Responsive Design

1. **Mobile-First Approach**:
   - Design for mobile devices first
   - Use responsive breakpoints
   - Test on various screen sizes

2. **Performance**:
   - Optimize images for mobile
   - Minimize JavaScript bundle
   - Use lazy loading

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Vercel Analytics](https://vercel.com/docs/analytics)

## 👨‍💻 Author

**Mikiyas Birhanu**
- Email: codewithmikee@gmail.com
- GitHub: [@codewithmikee](https://github.com/codewithmikee)
- Repository: [personal-portfolio-with-terminal-using-nextjs-shadcnui](https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git)
