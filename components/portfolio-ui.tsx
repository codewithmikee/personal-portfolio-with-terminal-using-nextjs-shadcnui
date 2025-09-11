"use client"

import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"
import { Navigation } from "@/components/navigation"

export function PortfolioUI() {
  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
