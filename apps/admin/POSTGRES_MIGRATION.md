# PostgreSQL Migration Guide

This guide helps you migrate from SQLite to PostgreSQL for the Portfolio Builder Admin application.

## 🚀 Quick Start

For a complete automated setup, run:

```bash
pnpm setup:postgres
```

This script will:

- Set up environment configuration
- Start PostgreSQL with Docker
- Generate Prisma client
- Run database migrations
- Seed the database

## 📋 Manual Setup

If you prefer to set up PostgreSQL manually:

### 1. Start PostgreSQL Database

```bash
# Using Docker Compose (recommended)
pnpm docker:up

# Or install PostgreSQL locally and create a database
```

### 2. Configure Environment

```bash
# Copy example environment file
cp env.example .env.local

# Edit .env.local with your database URL
DATABASE_URL="postgresql://portfolio_user:portfolio_password@localhost:5432/portfolio_db?schema=public"
```

### 3. Generate Prisma Client

```bash
pnpm db:generate
```

### 4. Run Database Migration

```bash
# Create and run initial migration
pnpm db:migrate

# If you have existing SQLite data, you'll need to export and import it manually
```

### 5. Seed Database

```bash
pnpm db:seed
```

## 🐳 Docker Commands

```bash
# Start PostgreSQL
pnpm docker:up

# View logs
pnpm docker:logs

# Stop PostgreSQL
pnpm docker:down

# Reset database (removes all data)
pnpm docker:reset
```

## 🔧 Database Management

```bash
# Open Prisma Studio (database GUI)
pnpm db:studio

# Reset database schema
pnpm db:reset

# Deploy migrations (production)
pnpm db:deploy
```

## 🌐 Production Deployment

### Vercel with Vercel Postgres

1. **Add Vercel Postgres to your project**:
   - Go to Vercel dashboard
   - Navigate to Storage tab
   - Add Postgres database

2. **Update environment variables**:
   - Copy the `DATABASE_URL` from Vercel
   - Add it to your environment variables

3. **Deploy with migrations**:
   ```bash
   pnpm deploy:complete
   ```

### Other Cloud Providers

Update your `DATABASE_URL` in production environment:

```bash
# Supabase
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Railway
DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway"

# Neon
DATABASE_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/neondb"
```

## 🔍 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pnpm docker:logs

# Test database connection
pnpm deploy:verify
```

### Migration Issues

```bash
# Reset migrations (development only)
pnpm db:migrate:reset

# Check migration status
npx prisma migrate status
```

### Docker Issues

```bash
# Check Docker status
docker ps

# Restart Docker containers
pnpm docker:reset
```

## 📊 Data Migration from SQLite

If you have existing SQLite data:

1. **Export data from SQLite** (manual process)
2. **Transform data format** if needed
3. **Import into PostgreSQL** using SQL scripts or Prisma

Note: This requires manual data transformation as the schema has changed from SQLite to PostgreSQL.

## 🎯 Benefits of PostgreSQL

- **Better Performance**: Optimized for concurrent connections
- **Advanced Features**: JSON support, full-text search, etc.
- **Production Ready**: Suitable for production deployments
- **Cloud Support**: Better integration with cloud platforms
- **Scalability**: Handles larger datasets efficiently

## 📚 Additional Resources

- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

---

**Need help?** Check the [main deployment guide](./DEPLOYMENT.md) or create an issue in the repository.
