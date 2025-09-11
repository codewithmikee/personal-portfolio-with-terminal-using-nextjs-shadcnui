export interface Project {
	id: string
	title: string
	description: string
	longDescription: string
	technologies: string[]
	githubUrl?: string
	liveUrl?: string
	imageUrl: string
	featured: boolean
	category: "fullstack" | "frontend" | "backend" | "mobile"
}

export interface Experience {
	id: string
	company: string
	position: string
	duration: string
	description: string
	technologies: string[]
}

export interface Skill {
	name: string
	level: number // 1-5
	category: "frontend" | "backend" | "database" | "tools" | "other"
}

export interface PortfolioData {
	personal: {
		name: string
		title: string
		bio: string
		email: string
		github: string
		linkedin: string
		location: string
		avatar: string
	}
	projects: Project[]
	experience: Experience[]
	skills: Skill[]
}

// Sample portfolio data - easily editable
export const portfolioData: PortfolioData = {
	personal: {
		name: "Mikiyas Birhanu",
		title: "Full Stack Developer",
		bio: "Passionate full-stack developer specializing in Laravel and Next.js. I create scalable web applications with modern technologies and clean, maintainable code.",
		email: "your.email@example.com",
		github: "https://github.com/yourusername",
		linkedin: "https://linkedin.com/in/yourusername",
		location: "Your City, Country",
		avatar: "/professional-developer-avatar.png",
	},
	projects: [
		{
			id: "ecommerce-platform",
			title: "E-Commerce Platform",
			description:
				"Full-stack e-commerce solution with Laravel backend and Next.js frontend",
			longDescription:
				"A comprehensive e-commerce platform built with Laravel API backend and Next.js frontend. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.",
			technologies: ["Laravel", "Next.js", "MySQL", "Stripe", "Tailwind CSS"],
			githubUrl: "https://github.com/yourusername/ecommerce-platform",
			liveUrl: "https://your-ecommerce-demo.com",
			imageUrl: "/ecommerce-website-interface.png",
			featured: true,
			category: "fullstack",
		},
		{
			id: "task-management",
			title: "Task Management App",
			description:
				"Collaborative task management application with real-time updates",
			longDescription:
				"A collaborative task management application featuring real-time updates, team collaboration, project tracking, and deadline management. Built with modern web technologies for optimal performance.",
			technologies: ["Next.js", "Node.js", "Socket.io", "PostgreSQL", "Prisma"],
			githubUrl: "https://github.com/yourusername/task-manager",
			liveUrl: "https://your-task-manager.com",
			imageUrl: "/task-management-dashboard.png",
			featured: true,
			category: "fullstack",
		},
		{
			id: "api-service",
			title: "RESTful API Service",
			description: "Scalable API service with comprehensive documentation",
			longDescription:
				"A robust RESTful API service built with Laravel, featuring comprehensive documentation, rate limiting, authentication, and extensive testing coverage.",
			technologies: ["Laravel", "MySQL", "Redis", "Swagger", "PHPUnit"],
			githubUrl: "https://github.com/yourusername/api-service",
			imageUrl: "/api-documentation-interface.jpg",
			featured: false,
			category: "backend",
		},
	],
	experience: [
		{
			id: "senior-dev",
			company: "Tech Company Inc.",
			position: "Senior Full Stack Developer",
			duration: "2022 - Present",
			description:
				"Lead development of web applications using Laravel and Next.js. Mentor junior developers and architect scalable solutions.",
			technologies: ["Laravel", "Next.js", "React", "MySQL", "AWS"],
		},
		{
			id: "fullstack-dev",
			company: "Digital Agency",
			position: "Full Stack Developer",
			duration: "2020 - 2022",
			description:
				"Developed and maintained multiple client projects using modern web technologies. Collaborated with design teams to implement pixel-perfect interfaces.",
			technologies: ["PHP", "JavaScript", "Vue.js", "Laravel", "PostgreSQL"],
		},
	],
	skills: [
		{ name: "Laravel", level: 5, category: "backend" },
		{ name: "Next.js", level: 5, category: "frontend" },
		{ name: "React", level: 4, category: "frontend" },
		{ name: "TypeScript", level: 4, category: "frontend" },
		{ name: "PHP", level: 5, category: "backend" },
		{ name: "MySQL", level: 4, category: "database" },
		{ name: "PostgreSQL", level: 4, category: "database" },
		{ name: "Tailwind CSS", level: 5, category: "frontend" },
		{ name: "Docker", level: 3, category: "tools" },
		{ name: "AWS", level: 3, category: "tools" },
	],
}

// Terminal commands for the simulator
export interface TerminalCommand {
	command: string
	description: string
	action: string
}

export const terminalCommands: TerminalCommand[] = [
	{ command: "help", description: "Show available commands", action: "help" },
	{
		command: "about",
		description: "Display personal information",
		action: "about",
	},
	{ command: "projects", description: "List all projects", action: "projects" },
	{
		command: "project <id>",
		description: "Show project details",
		action: "project",
	},
	{
		command: "skills",
		description: "Display technical skills",
		action: "skills",
	},
	{
		command: "experience",
		description: "Show work experience",
		action: "experience",
	},
	{
		command: "contact",
		description: "Display contact information",
		action: "contact",
	},
	{ command: "clear", description: "Clear terminal screen", action: "clear" },
	{ command: "ui", description: "Switch to UI mode", action: "ui" },
]
