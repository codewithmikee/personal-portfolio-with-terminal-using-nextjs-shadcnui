# Contributing to Ultimate Portfolio Website

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Git

### 🛠 Development Tools

This project uses modern development tools for enhanced productivity:

- **Cursor** - AI-powered code editor (recommended for best experience)
- **21dev** - UI component library integration
- **Docker** - For consistent development environments
- **Git** - Version control
- **Composer** - PHP dependency management
- **npm/pnpm** - Node.js package management
- **PHPUnit** - PHP testing
- **Postman** - API testing

### Development Setup

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ultimate-portfolio-website.git
   cd ultimate-portfolio-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db seed
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

## 🚧 Current Development Status

### In Progress

- **AI Agent Integration** - Interactive AI assistant for portfolio navigation
- **CV/PDF Export** - Generate downloadable CV and PDF versions
- **Contact Form** - Interactive contact form with backend integration
- **Data Source Enhancement** - Enhanced portfolio data structure

### Available for Contribution

- **Multi-language Support** - Internationalization features
- **Analytics Dashboard** - Visitor insights and metrics
- **Blog Integration** - Content management system
- **Project Demos** - Interactive project demonstrations
- **Testimonials** - Client testimonials section
- **Advanced Terminal Commands** - More terminal features

## 📋 How to Contribute

### Reporting Issues

- Use the GitHub issue tracker
- Provide clear description and steps to reproduce
- Include screenshots if applicable
- Use appropriate labels

### Suggesting Features

- Open a discussion or issue
- Describe the feature and its benefits
- Consider implementation complexity
- Provide mockups or examples if possible

### Code Contributions

#### 1. Choose an Issue

- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to claim it
- Ask questions if anything is unclear

#### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

#### 3. Make Changes

- Follow the coding standards
- Write clear, readable code
- Add comments for complex logic
- Update documentation if needed

#### 4. Test Your Changes

```bash
# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Test the application
pnpm dev
```

#### 5. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
# or
git commit -m "fix: resolve issue with..."
```

#### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## 📝 Coding Standards

### TypeScript

- Use strict type checking
- Define interfaces for complex objects
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Follow the component structure:
  ```tsx
  // 1. Imports
  // 2. Types/Interfaces
  // 3. Component
  // 4. Default export
  ```
- Use proper prop types
- Handle loading and error states

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use semantic class names
- Maintain consistency with design system

### File Organization

```
components/
├── ui/              # Reusable UI components
├── sections/        # Portfolio sections
└── admin/          # Admin-specific components

hooks/
├── use-portfolio-data.ts  # Main portfolio hook
└── use-*.ts              # Other custom hooks

lib/
├── services/        # API services
├── stores/          # State management
└── utils.ts         # Utility functions
```

## 🧪 Testing

### Manual Testing

- Test all user flows
- Verify responsive design
- Check error handling
- Test admin functionality

### Automated Testing

- Add unit tests for utilities
- Test component rendering
- Mock API calls
- Test error scenarios

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Update README if needed

### API Documentation

- Document new endpoints
- Provide example requests/responses
- Update type definitions
- Add usage examples

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Screenshots** if applicable
5. **Environment details** (OS, browser, Node version)
6. **Error messages** or console logs

## ✨ Feature Requests

When suggesting features:

1. **Clear description** of the feature
2. **Use case** and benefits
3. **Implementation ideas** if you have any
4. **Mockups or examples** if possible
5. **Consideration** of breaking changes

## 🏷 Pull Request Process

### Before Submitting

- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Responsive design verified

### PR Description

- Clear title and description
- Reference related issues
- List changes made
- Include screenshots if UI changes
- Mention any breaking changes

### Review Process

- Maintainers will review your PR
- Address feedback promptly
- Be open to suggestions
- Ask questions if unclear

## 🎯 Areas for Contribution

### High Priority

- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Testing coverage

### Medium Priority

- [ ] New portfolio sections
- [ ] Admin panel enhancements
- [ ] Theme customization
- [ ] Data validation
- [ ] Documentation

### Low Priority

- [ ] UI/UX improvements
- [ ] Code refactoring
- [ ] Additional themes
- [ ] Integration examples
- [ ] Tutorial content

## 📞 Getting Help

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Email** - codewithmikee@gmail.com
- **Discord** - [Join our community](https://discord.gg/your-invite)

## 🏆 Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Given credit in commit history
- Invited to maintainer team (for significant contributions)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Ultimate Portfolio Website! 🎉**
