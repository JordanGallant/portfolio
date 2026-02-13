"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const isExternal =
    project.url.startsWith("http://") || project.url.startsWith("https://");

  return (
    <a
      href={project.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <Card className="bg-cyber-card border-cyber-border overflow-hidden group hover:border-neon-green/50 transition-all duration-300 hover:shadow-neon-green h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-foreground group-hover:text-neon-green transition-colors mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
    </a>
  );
}
