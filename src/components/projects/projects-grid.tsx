"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { ProjectCard } from "./project-card";
import { projects } from "@/data/projects";

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <AnimatedContainer key={project.title} delay={i * 0.05}>
          <ProjectCard project={project} />
        </AnimatedContainer>
      ))}
    </div>
  );
}
