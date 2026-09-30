import type { GithubUser, PublicEvent, Repository } from "@/lib/github/types";

export type RepositorySort = "stars" | "forks" | "updated" | "created" | "name";
export type RepositoryFilter = "all" | "original" | "forks";

export interface RepositoryQuery {
  search: string;
  filter: RepositoryFilter;
}

export interface RepositorySummary {
  total: number;
  original: number;
  forks: number;
  totalStars: number;
  totalForks: number;
  mostStarred: Repository | null;
  mostForked: Repository | null;
  recentlyUpdated: Repository | null;
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export interface EventTypeStat {
  type: string;
  label: string;
  count: number;
}

export interface ProfileSnapshot {
  user: GithubUser;
  repos: Repository[];
  events: PublicEvent[] | null;
}
