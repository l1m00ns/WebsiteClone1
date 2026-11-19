import projectsJson from "@/data/projects.json";
import gamesJson from "@/data/games.json";
import robloxJson from "@/data/roblox.json";
import fflagsJson from "@/data/fflags.json";
import forumsJson from "@/data/forums.json";
import topicsJson from "@/data/topics.json";
import communityOffsetsJson from "@/data/community-offsets.json";
import guideMetaJson from "@/data/guide-meta.json";
import guidePagesJson from "@/content/guide-pages.json";
import guidesContentJson from "@/content/guides.json";
import legalJson from "@/content/legal.json";
import {
  CATEGORY_ORDER,
  NON_GAME_GROUPS,
} from "@/lib/game-media";
import { compactAge } from "@/lib/format";
import type {
  CommunityOffset,
  ForumsFile,
  ForumTopic,
  ForumTopicDetail,
  GameUpdate,
  GuideMeta,
  GuidePageMeta,
  LegalSlug,
  Project,
  ProjectCardData,
  ProjectMeta,
  ProjectsFile,
  RobloxDataset,
  RobloxFile,
  TopicFile,
} from "@/types";

const projectFile = projectsJson as unknown as ProjectsFile;
const gamesFile = gamesJson as unknown as { games: GameUpdate[] };
const robloxFile = robloxJson as unknown as RobloxFile;
const fflagsFile = fflagsJson as unknown as { meta: RobloxDataset["meta"]; entries: RobloxDataset["entries"] };
const forumsFile = forumsJson as unknown as ForumsFile;
const topicsFile = topicsJson as unknown as TopicFile;
const communityOffsets = communityOffsetsJson as unknown as CommunityOffset[];
const guideMeta = guideMetaJson as unknown as GuideMeta[];
const guidePages = guidePagesJson as unknown as Record<string, GuidePageMeta>;
const guidesContent = guidesContentJson as unknown as Record<string, string>;
const legalContent = legalJson as unknown as Record<LegalSlug, string>;

export const PROJECTS: Project[] = projectFile.projects;
export const PROJECT_META: ProjectMeta = projectFile.meta;
export const GAMES: GameUpdate[] = gamesFile.games;

export const TOTAL_PROJECTS = PROJECT_META.total;
export const TOTAL_DOWNLOADS = PROJECTS.reduce((sum, project) => sum + (project.downloads ?? 0), 0);
export const ONLINE_COUNT = 32;

export const FORUM_CATEGORIES = forumsFile.categories.categories;

export function getProject(id: number): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}

export function getProjectCards(now: number = Date.now()): ProjectCardData[] {
  return PROJECTS.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    category: project.category,
    fileType: project.file_type,
    downloads: project.downloads,
    views: project.views,
    stars: project.stars,
    createdAt: project.created_at,
    age: compactAge(project.created_at, now),
    riskLevel: project.redflag_risk_level,
    riskScore: project.redflag_threat_score,
    game: project.game,
    subcategory: project.subcategory,
    previewImage: project.preview_image,
  }));
}

export interface CategoryGroup {
  name: string;
  count: number;
  subcategories: { name: string; full: string; count: number }[];
}

export function getCategoryGroups(): CategoryGroup[] {
  const counts = PROJECT_META.categoryCounts;
  const groups = new Map<string, CategoryGroup>();
  for (const [full, count] of Object.entries(counts)) {
    const [group, sub] = full.split(" / ");
    if (!groups.has(group)) groups.set(group, { name: group, count: 0, subcategories: [] });
    const entry = groups.get(group)!;
    entry.count += count;
    if (sub) entry.subcategories.push({ name: sub, full, count });
  }
  for (const entry of groups.values()) {
    entry.subcategories.sort((a, b) => b.count - a.count);
  }
  const ordered: CategoryGroup[] = [];
  for (const name of CATEGORY_ORDER) {
    const entry = groups.get(name);
    if (entry) ordered.push(entry);
  }
  for (const [name, entry] of groups) {
    if (!CATEGORY_ORDER.includes(name)) ordered.push(entry);
  }
  return ordered;
}

export const CATEGORY_GROUPS = getCategoryGroups();
export const ANCESTOR_CATEGORIES = new Set(
  CATEGORY_GROUPS.filter((group) => !NON_GAME_GROUPS.has(group.name)).map((group) => group.name),
);

export function getGameUpdate(slug: string): GameUpdate | undefined {
  return GAMES.find((game) => game.slug === slug);
}

export interface RobloxPageData {
  offsets: RobloxDataset["entries"];
  offsetsMeta: RobloxDataset["meta"];
  fflags: RobloxDataset["entries"];
  fflagsMeta: RobloxDataset["meta"];
  offsetGroups: string[];
  fflagGroups: string[];
  versions: RobloxFile["versions"];
}

export const ROBLOX_DATA: RobloxPageData = {
  offsets: [
    ...robloxFile.offsets_p1.entries,
    ...robloxFile.offsets_p2.entries,
    ...robloxFile.offsets_p3.entries,
    ...robloxFile.offsets_p4.entries,
  ],
  offsetsMeta: robloxFile.offsets_p1.meta,
  fflags: fflagsFile.entries,
  fflagsMeta: fflagsFile.meta,
  offsetGroups: [...new Set(robloxFile.offsets_p1.entries.map((entry) => entry.group))].sort(),
  fflagGroups: [...new Set(fflagsFile.entries.map((entry) => entry.group))].sort(),
  versions: robloxFile.versions,
};

export function getForumCategories() {
  return FORUM_CATEGORIES;
}

export function getForumCategory(slug: string) {
  return FORUM_CATEGORIES.find((category) => category.slug === slug);
}

export function getForumTopics(slug: string): ForumTopic[] {
  const entry = forumsFile[slug];
  if (!entry || !("topics" in entry)) return [];
  return entry.topics;
}

export function getForumTopic(id: number): ForumTopicDetail | undefined {
  const entry = topicsFile[String(id)];
  return entry;
}

export function findForumTopic(id: number): ForumTopic | undefined {
  for (const category of FORUM_CATEGORIES) {
    const entry = forumsFile[category.slug];
    if (entry && "topics" in entry) {
      const topic = entry.topics.find((item) => item.id === id);
      if (topic) return topic;
    }
  }
  return undefined;
}

export function getForumTopicCount(): number {
  return FORUM_CATEGORIES.reduce((sum, category) => sum + category.topic_count, 0);
}

export function getForumPostCount(): number {
  return FORUM_CATEGORIES.reduce((sum, category) => sum + category.post_count, 0);
}

export function getCommunityOffsets(): CommunityOffset[] {
  return communityOffsets;
}

export function getGuideMeta(): GuideMeta[] {
  return guideMeta;
}

export function getGuidePage(slug: string): { meta: GuidePageMeta; content: string } | undefined {
  const meta = guidePages[slug];
  const content = guidesContent[slug];
  if (!meta || !content) return undefined;
  return { meta, content };
}

export function getLegalContent(slug: LegalSlug): string {
  return legalContent[slug];
}

export function getProjectsByCategory(category: string): Project[] {
  return PROJECTS.filter((project) => project.category === category);
}

export function getRelatedProjects(limit = 6): Project[] {
  return [...PROJECTS].sort((a, b) => b.downloads - a.downloads).slice(0, limit);
}
