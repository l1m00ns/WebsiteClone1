import type { ProjectCardData } from "@/types";
import { compactAge } from "@/lib/format";

export interface ArchiveProject extends ProjectCardData {
  createdMs: number;
}

export function toArchiveProjects(
  projects: ProjectCardData[],
  now = Date.now(),
): ArchiveProject[] {
  return projects.map((project) => ({
    ...project,
    age: compactAge(project.createdAt, now),
    createdMs: new Date(project.createdAt).getTime(),
    description: project.description.slice(0, 240),
  }));
}
