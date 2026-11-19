export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  source_type: string;
  file_type: string;
  downloads: number;
  views: number;
  stars: number;
  is_featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  notes: string;
  preview_image: string | null;
  discord_id: string | null;
  access_level: string;
  redflag_threat_score: number;
  redflag_risk_level: string;
  redflag_scan_status: string;
  redflag_scan_id: string | null;
  download_url: string | null;
  alt_url: string | null;
  has_download: boolean;
  has_alt_url: boolean;
  is_archive: boolean;
  code_snippet: string | null;
  extra_links: unknown;
  game: string;
  subcategory: string;
}

export interface ProjectMeta {
  total: number;
  totalPages: number;
  categoryCounts: Record<string, number>;
  announcement: string;
}

export interface ProjectsFile {
  meta: ProjectMeta;
  projects: Project[];
}

export interface ProjectCardData {
  id: number;
  name: string;
  description: string;
  category: string;
  fileType: string;
  downloads: number;
  views: number;
  stars: number;
  createdAt: string;
  age: string;
  riskLevel: string;
  riskScore: number;
  game: string;
  subcategory: string;
  previewImage: string | null;
}

export interface GameUpdate {
  game: string;
  slug: string;
  status: string | null;
  summary: string | null;
  version: string | null;
  provider: string | null;
  eacStatus: string | null;
  sourceUrl: string | null;
  updatedAt: string | null;
  confidence: string | null;
  sourceName: string | null;
}

export interface GamesFile {
  games: GameUpdate[];
  source: unknown;
}

export interface RobloxEntry {
  path: string;
  group: string;
  name: string;
  valueText: string;
  decimalValue: number;
  hexValue: string;
}

export interface RobloxDataset {
  meta: {
    discord: string;
    dumpedAt: string;
    dumpedBy: string;
    dumperVersion: string;
    robloxVersion: string;
    source: string;
    totalOffsets: number;
  };
  entries: RobloxEntry[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface RobloxFile {
  offsets_p1: RobloxDataset;
  offsets_p2: RobloxDataset;
  offsets_p3: RobloxDataset;
  offsets_p4: RobloxDataset;
  fflags_p1: RobloxDataset;
  fflags_p2: RobloxDataset;
  versions: {
    current: Record<string, string>;
    future: Record<string, string>;
    past: Record<string, string>;
  };
}

export interface ForumCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  display_order: number;
  topic_count: number;
  post_count: number;
  latest_topic_id: number | null;
  latest_topic_title: string | null;
  latest_topic_slug: string | null;
  latest_topic_author: string | null;
  latest_topic_avatar: string | null;
  latest_topic_at: string | null;
}

export interface ForumTopic {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  discord_user_id: string;
  discord_username: string;
  discord_display_name: string;
  discord_avatar: string | null;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  post_count: number;
  last_post_at: string | null;
  last_post_by: string | null;
  created_at: string;
}

export interface ForumPost {
  id: number;
  topic_id: number;
  discord_user_id: string;
  discord_username: string;
  discord_display_name: string;
  discord_avatar: string | null;
  content: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
  reactions: unknown[];
}

export interface ForumTopicDetail {
  topic: ForumTopic;
  posts: ForumPost[];
}

export interface ForumsFile {
  categories: { categories: ForumCategory[] };
  [slug: string]: { topics: ForumTopic[]; total: number } | { categories: ForumCategory[] };
}

export interface TopicFile {
  [id: string]: ForumTopicDetail;
}

export interface CommunityOffset {
  id: number;
  game: string;
  date: string;
  fileName: string;
  meta: string;
  author: string | null;
  up: number;
  down: number;
  comments: number;
}

export interface GuideMeta {
  slug: string;
  title: string;
  tag: string;
  description: string;
}

export interface GuidePageMeta {
  title: string;
  eyebrow: string;
}

export type LegalSlug = "privacy" | "terms" | "cookies" | "safety";
