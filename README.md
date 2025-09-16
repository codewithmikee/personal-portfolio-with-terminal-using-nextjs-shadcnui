# Portfolio Website - Dual Navigation Interface

A modern, interactive portfolio website built with Next.js and TypeScript, featuring both traditional UI navigation and a unique terminal simulator interface. Perfect for showcasing fullstack development skills with Laravel and Next.js expertise.

**Author:** Mikiyas Birhanu  
**Email:** codewithmikee@gmail.com  
**Repository:** https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git

## ✨ Features

### Dual Navigation System

- **Traditional UI**: Clean, modern interface with smooth scrolling navigation
- **Terminal Simulator**: Interactive command-line interface with Unix-like commands
- **Shared Content Source**: Both interfaces pull from the same centralized data

### Content Management

- **Admin Panel**: Easy-to-use content management at `/admin`
- **Real-time Updates**: Changes reflect immediately in both UI and terminal modes
- **Persistent Storage**: Content saved locally with state management

### Terminal Features

- **Directory Navigation**: Use `cd`, `ls`, `pwd` commands like a real terminal
- **Color-coded Output**: Success (green), warnings (yellow), errors (red)
- **Command History**: Navigate previous commands with arrow keys
- **File System Simulation**: Browse projects and files with `cat` command

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd portfolio-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install

   # or

   yarn install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   pnpm dev

   # or

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage Guide

### Navigation Modes

#### UI Mode (Default)

- Clean, responsive interface with navigation menu
- Smooth scrolling between sections
- Click "Terminal" button to switch modes

#### Terminal Mode

- Type `help` to see available commands
- Use `cd <section>` to navigate (e.g., `cd projects`)
- Use `ls` to list contents of current directory
- Use `cat <item>` to view detailed information
- Type `ui` to switch back to UI mode

### Terminal Commands

| Command      | Description                 | Example         |
| ------------ | --------------------------- | --------------- |
| `help`       | Show all available commands | `help`          |
| `about`      | Display about information   | `about`         |
| `projects`   | List all projects           | `projects`      |
| `skills`     | Show technical skills       | `skills`        |
| `experience` | Display work experience     | `experience`    |
| `contact`    | Show contact information    | `contact`       |
| `cd <path>`  | Navigate to directory       | `cd projects`   |
| `ls`         | List directory contents     | `ls`            |
| `pwd`        | Show current directory      | `pwd`           |
| `cat <file>` | Display file contents       | `cat project-1` |
| `clear`      | Clear terminal screen       | `clear`         |
| `ui`         | Switch to UI mode           | `ui`            |
| `stats`      | Show portfolio statistics   | `stats`         |

### Content Management

1. **Access Admin Panel**

   - Navigate to `/admin` in your browser
   - No login required (add authentication as needed)

2. **Edit Content**

   - **Personal Info**: Update name, title, bio, and contact details
   - **Projects**: Add/edit/delete projects with descriptions and tech stacks
   - **Experience**: Manage work history and achievements
   - **Skills**: Update technical skills with proficiency levels

3. **Save Changes**
   - Changes are automatically saved to local storage
   - Refresh the page to see updates in both UI and terminal modes

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand with persistence
- **Icons**: Lucide React
- **Development**: ESLint, PostCSS

## 📁 Project Structure

\`\`\`
├── app/
│ ├── admin/ # Admin panel route
│ ├── layout.tsx # Root layout with theme provider
│ ├── page.tsx # Main portfolio page
│ └── globals.css # Global styles and design tokens
├── components/
│ ├── admin/ # Admin panel components
│ ├── sections/ # Portfolio sections (hero, about, etc.)
│ ├── ui/ # Reusable UI components
│ ├── navigation.tsx # Main navigation component
│ ├── portfolio-ui.tsx # Traditional UI interface
│ └── terminal-simulator.tsx # Terminal interface
├── lib/
│ ├── hooks/ # Custom React hooks
│ ├── portfolio-data.ts # Centralized content data
│ └── utils.ts # Utility functions
└── public/ # Static assets
\`\`\`

## 🎨 Customization

### Design Tokens

Edit `app/globals.css` to customize:

- Color scheme (currently cyan/amber professional theme)
- Typography (Geist Sans/Mono fonts)
- Spacing and layout tokens

### Content Data

Update `lib/portfolio-data.ts` to modify:

- Personal information
- Project details
- Work experience
- Technical skills
- Contact information

### Terminal Commands

Extend `lib/hooks/use-terminal-commands.ts` to add:

- New commands
- Custom responses
- Additional navigation paths

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

\`\`\`bash

# Build for production

npm run build

# Start production server

npm start
\`\`\`

## 📝 Development Scripts

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both UI and terminal modes
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the terminal commands with `help`
2. Verify admin panel access at `/admin`
3. Check browser console for errors
4. Ensure all dependencies are installed

---

**Built with ❤️ using Next.js, TypeScript, and creativity**
