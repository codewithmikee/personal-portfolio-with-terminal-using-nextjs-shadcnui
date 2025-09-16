# API Documentation

This document provides comprehensive API documentation for the Ultimate Portfolio Website.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Overview

The API provides RESTful endpoints for managing portfolio data. All endpoints return JSON responses and use standard HTTP status codes.

**Base URL:** `/api`

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible. Future versions may include authentication for admin operations.

## Endpoints

### Portfolio Management

#### GET `/api/portfolios`

Retrieve all portfolios.

**Response:**

```typescript
EnhancedPortfolio[]
```

**Example:**

```bash
curl -X GET http://localhost:3000/api/portfolios
```

#### GET `/api/portfolios/[id]`

Retrieve a specific portfolio by ID.

**Parameters:**

- `id` (string): Portfolio ID

**Response:**

```typescript
EnhancedPortfolio | { message: string };
```

**Status Codes:**

- `200` - Success
- `404` - Portfolio not found

**Example:**

```bash
curl -X GET http://localhost:3000/api/portfolios/cmfmx18o7000qvyw0wqm1p4df
```

#### PATCH `/api/portfolios/[id]`

Update a portfolio.

**Parameters:**

- `id` (string): Portfolio ID

**Request Body:**

```typescript
{
  profile?: {
    update: Partial<Profile>
  },
  experience?: {
    create: Experience
  } | {
    updateMany: {
      where: { id: number },
      data: Partial<Experience>
    }
  } | {
    deleteMany: { id: number }
  },
  projects?: {
    create: Project
  } | {
    updateMany: {
      where: { id: number },
      data: Partial<Project>
    }
  } | {
    deleteMany: { id: number }
  },
  skills?: {
    set: Skill[]
  },
  tools?: {
    set: Tool[]
  }
}
```

**Response:**

```typescript
EnhancedPortfolio | { error: string };
```

**Status Codes:**

- `200` - Success
- `400` - Bad request
- `404` - Portfolio not found
- `500` - Internal server error

**Example:**

```bash
curl -X PATCH http://localhost:3000/api/portfolios/cmfmx18o7000qvyw0wqm1p4df \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "update": {
        "full_name": "John Doe",
        "email": "john@example.com"
      }
    }
  }'
```

#### DELETE `/api/portfolios/[id]`

Delete a portfolio.

**Parameters:**

- `id` (string): Portfolio ID

**Response:**

```typescript
{
  ok: boolean;
}
```

**Status Codes:**

- `200` - Success
- `404` - Portfolio not found

**Example:**

```bash
curl -X DELETE http://localhost:3000/api/portfolios/cmfmx18o7000qvyw0wqm1p4df
```

## Data Models

### EnhancedPortfolio

```typescript
interface EnhancedPortfolio {
  id: string;
  externalId: string;
  createdAt: string;
  updatedAt: string;
  profile: Profile;
  contacts: PortfolioContact[];
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  tools: Tool[];
  blogs: Blog[];
}
```

### Profile

```typescript
interface Profile {
  id: string;
  externalId: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  description: string;
  profile_picture: string;
  portfolioId: string;
  contacts: ProfileContact[];
}
```

### Experience

```typescript
interface Experience {
  id: string;
  externalId: string;
  company_name: string;
  company_description: string;
  start_date: string;
  end_date: string | null;
  role: ProgrammingRole;
  job_type: JobType;
  portfolioId: string;
  contacts: ExperienceContact[];
}
```

### Project

```typescript
interface Project {
  id: string;
  externalId: string;
  title: string;
  description: string;
  link: string;
  portfolioId: string;
  features: Feature[];
}
```

### Skill

```typescript
interface Skill {
  id: string;
  externalId: string;
  title: string;
  portfolioId: string;
}
```

### Tool

```typescript
interface Tool {
  id: string;
  externalId: string;
  title: string;
  portfolioId: string;
}
```

### Enums

```typescript
enum ProgrammingRole {
  FullStack = "FullStack",
  Frontend = "Frontend",
  Backend = "Backend",
  Mobile = "Mobile",
}

enum JobType {
  Full_Time = "Full_Time",
  Part_Time = "Part_Time",
  Contract = "Contract",
  Freelance = "Freelance",
}
```

## Error Handling

The API uses standard HTTP status codes and returns error information in the response body.

### Error Response Format

```typescript
{
  error: string;
  message?: string;
  details?: any;
}
```

### Common Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

### Error Examples

**400 Bad Request:**

```json
{
  "error": "Invalid request body",
  "message": "Missing required field: full_name"
}
```

**404 Not Found:**

```json
{
  "message": "Not Found"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Failed to update portfolio",
  "message": "Database connection failed"
}
```

## Examples

### Complete Portfolio Update

```bash
curl -X PATCH http://localhost:3000/api/portfolios/portfolio-id \
  -H "Content-Type: application/json" \
  -d '{
    "profile": {
      "update": {
        "full_name": "Jane Smith",
        "email": "jane@example.com",
        "phone_number": "+1234567890",
        "address": "New York, NY",
        "description": "Full-stack developer with 5+ years experience",
        "profile_picture": "/images/profile.jpg"
      }
    },
    "experience": {
      "create": {
        "company_name": "Tech Corp",
        "company_description": "Leading technology company",
        "start_date": "2020-01",
        "end_date": null,
        "role": "FullStack",
        "job_type": "Full_Time"
      }
    },
    "projects": {
      "create": {
        "title": "E-commerce Platform",
        "description": "Full-stack e-commerce solution",
        "link": "https://example.com"
      }
    },
    "skills": {
      "set": [
        { "title": "React" },
        { "title": "Node.js" },
        { "title": "TypeScript" }
      ]
    },
    "tools": {
      "set": [
        { "title": "Git" },
        { "title": "Docker" },
        { "title": "AWS" }
      ]
    }
  }'
```

### Add New Experience

```bash
curl -X PATCH http://localhost:3000/api/portfolios/portfolio-id \
  -H "Content-Type: application/json" \
  -d '{
    "experience": {
      "create": {
        "company_name": "Startup Inc",
        "company_description": "Fast-growing startup",
        "start_date": "2022-06",
        "end_date": "2023-12",
        "role": "Frontend",
        "job_type": "Contract"
      }
    }
  }'
```

### Update Project

```bash
curl -X PATCH http://localhost:3000/api/portfolios/portfolio-id \
  -H "Content-Type: application/json" \
  -d '{
    "projects": {
      "updateMany": {
        "where": { "id": 0 },
        "data": {
          "title": "Updated Project Title",
          "description": "Updated project description",
          "link": "https://updated-link.com"
        }
      }
    }
  }'
```

### Remove Experience

```bash
curl -X PATCH http://localhost:3000/api/portfolios/portfolio-id \
  -H "Content-Type: application/json" \
  -d '{
    "experience": {
      "deleteMany": { "id": 0 }
    }
  }'
```

## Rate Limiting

Currently, there are no rate limits implemented. Future versions may include rate limiting for production use.

## CORS

The API supports CORS for cross-origin requests. All origins are currently allowed.

## Versioning

The API is currently at version 1.0. Future versions will be indicated in the URL path (e.g., `/api/v2/portfolios`).

## Support

For API support or questions:

- Create an issue on GitHub
- Contact: codewithmikee@gmail.com
- Documentation: [GitHub Wiki](https://github.com/codewithmikee/ultimate-portfolio-website/wiki)
