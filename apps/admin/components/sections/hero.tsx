/**
 * Enhanced Hero section component
 * Displays the main introduction and call-to-action with modern theme-aware design
 *
 * @author Mikiyas Birhanu
 * @email codewithmikee@gmail.com
 * @repo https://github.com/codewithmikee/personal-portfolio-with-terminal-using-nextjs-shadcnui.git
 */

"use client";

import { Button } from "@workspace/ui/components/button";
import { usePortfolioData } from "@/hooks/use-portfolio-data";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDown,
  Download,
  ExternalLink,
  Code,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Hero() {
  const { portfolio, isLoading, error } = usePortfolioData();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state only on client side and when actually loading
  if (!isClient || isLoading) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16 bg-background"
      >
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

  if (error || !portfolio) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16 bg-background"
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-destructive mb-4">
              <Code className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">
                Error Loading Portfolio
              </h1>
              <p className="text-muted-foreground">
                {error || "Portfolio data not found"}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
    },
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
                  key={skill.id}
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
