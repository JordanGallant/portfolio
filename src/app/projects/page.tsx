import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectsGrid } from "@/components/projects/projects-grid";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="MY_PROJECTS" />
      <ProjectsGrid />
    </div>
  );
}
