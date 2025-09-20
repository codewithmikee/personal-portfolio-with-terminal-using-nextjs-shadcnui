"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Navbar } from "@workspace/ui/components/navbar";
import { Footer } from "@workspace/ui/components/footer";
import { TerminalSimulator } from "@workspace/ui/components/terminal-simulator";
import { CVView } from "@workspace/ui/components/cv-view";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Code,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useNavigationMode } from "@workspace/ui/hooks/use-navigation-mode";
import type { EnhancedPortfolio } from "@workspace/shared/types/portfolio";

interface PortfolioDisplayProps {
  portfolio: EnhancedPortfolio | null;
  isLoading?: boolean;
  error?: string | null;
}

export function PortfolioDisplay({
  portfolio,
  isLoading,
  error,
}: PortfolioDisplayProps) {
  const { mode } = useNavigationMode();

  console.log("PortfolioDisplay render:", {
    portfolio,
    isLoading,
    error,
    mode,
  });

  if (isLoading) {
    console.log("PortfolioDisplay: Showing loading screen");
    return <LoadingScreen />;
  }

  if (error || !portfolio) {
    console.log("PortfolioDisplay: Showing error screen", { error, portfolio });
    return <ErrorScreen error={error || "Portfolio data not found"} />;
  }

  const renderContent = () => {
    switch (mode) {
      case "web":
        return (
          <div>
            <Hero portfolio={portfolio} />
            <About portfolio={portfolio} />
            <Projects portfolio={portfolio} />
            <Experience portfolio={portfolio} />
            <Skills portfolio={portfolio} />
            <Contact portfolio={portfolio} />
          </div>
        );
      case "cv":
        return <CVView portfolio={portfolio} />;
      case "terminal":
        return <TerminalSimulator portfolio={portfolio} />;
      default:
        return (
          <div>
            <Hero portfolio={portfolio} />
            <About portfolio={portfolio} />
            <Projects portfolio={portfolio} />
            <Experience portfolio={portfolio} />
            <Skills portfolio={portfolio} />
            <Contact portfolio={portfolio} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar portfolio={portfolio} />
      {renderContent()}
      <Footer />
    </div>
  );
}

function LoadingScreen() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"></div>
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded mb-8 w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded mb-12 w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-destructive mb-4">
            <Code className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Error Loading Portfolio</h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hero({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-background to-purple-900/20 dark:from-blue-900/20 dark:via-black dark:to-purple-900/20" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 items-center min-h-[80vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <div className="space-y-8 flex-1">
            <motion.div
              variants={itemVariants}
              className="space-y-4"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">
                  Available for work
                </span>
              </motion.div>

              {/* Title with Profile Picture */}
              <div className="flex items-center gap-6">
                {/* Profile Picture */}
                <motion.div
                  className="relative flex-shrink-0"
                  variants={imageVariants}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    {/* Gradient Ring */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                      <div className="w-full h-full bg-background rounded-full p-1">
                        <Image
                          src={
                            portfolio.profile.profile_picture ||
                            "/placeholder-user.jpg"
                          }
                          alt={portfolio.profile.full_name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Title Text */}
                <div className="flex-1">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {portfolio.profile.full_name}
                    </span>
                  </h1>
                </div>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
                {portfolio.profile.description ||
                  "Full Stack Developer & UI/UX Designer"}
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              I craft exceptional digital experiences through innovative design
              and robust development. Passionate about creating solutions that
              make a difference.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {portfolio.skills?.slice(0, 6).map((skill, index) => (
                <motion.div
                  key={skill.id || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border">
                    {skill.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href="#projects">
                  View My Work
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted"
                asChild
              >
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-4"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.a
                href="https://github.com/codewithmikee"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5 text-muted-foreground" />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/mikiyasbirhanu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5 text-muted-foreground" />
              </motion.a>

              <motion.a
                href={`mailto:${portfolio.profile.email}`}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5 text-muted-foreground" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-border rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function About({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const { profile, projects, experience } = portfolio;

  const totalProjects = projects.length;
  const yearsOfExperience =
    experience.length > 0
      ? Math.max(
          ...experience.map((exp) => {
            const start = new Date(exp.start_date);
            const end = exp.end_date ? new Date(exp.end_date) : new Date();
            return Math.floor(
              (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)
            );
          })
        )
      : 0;

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                {profile.description}
              </p>

              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.address}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">What I Do</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full-stack web application development</li>
                  <li>• API design and backend architecture</li>
                  <li>• Modern frontend development with React/Next.js</li>
                  <li>• Database design and optimization</li>
                  <li>• Code review and team mentoring</li>
                </ul>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">
                      {yearsOfExperience}+ Years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Projects Completed
                    </span>
                    <span className="font-medium">{totalProjects}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary Stack</span>
                    <span className="font-medium">Laravel + Next.js</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium text-green-600">
                      Open to Work
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const { projects } = portfolio;
  const featuredProjects = projects; // All projects are featured in enhanced structure

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/placeholder.svg?height=250&width=400&query=${project.title} project interface`}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features
                      .flatMap((feature) => feature.techStacks)
                      .slice(0, 3)
                      .map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech.title}
                        </Badge>
                      ))}
                    {project.features.flatMap((feature) => feature.techStacks)
                      .length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +
                        {project.features.flatMap(
                          (feature) => feature.techStacks
                        ).length - 3}{" "}
                        more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg">
              View All Projects ({projects.length})
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const { experience } = portfolio;

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Work Experience
          </h2>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {exp.company_name}
                      </h3>
                      <p className="text-muted-foreground">{exp.role}</p>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2 md:mt-0">
                      {exp.start_date} - {exp.end_date || "Present"}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {exp.company_description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{exp.job_type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const { skills, tools } = portfolio;

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Skills & Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.title}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <Badge key={index} variant="outline">
                      {tool.title}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ portfolio }: { portfolio: EnhancedPortfolio }) {
  const { profile } = portfolio;

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Get In Touch</h2>

          <p className="text-lg text-muted-foreground mb-8">
            I'm always interested in new opportunities and exciting projects.
            Let's connect!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://linkedin.com/in/mikiyasbirhanu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/codewithmikee"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
