/** Raw shapes returned by the GitHub REST API (only the fields we use). */
export interface RawUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  visibility?: string;
  created_at: string;
  updated_at: string;
}

export interface RawEvent {
  id: string;
  type: string | null;
  repo: { name: string };
  created_at: string | null;
}

/** Normalized shapes used by the rest of the app. */
export interface GithubUser {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  website: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  visibility: "public" | "private";
  createdAt: string;
  updatedAt: string;
}

export interface PublicEvent {
  id: string;
  type: string;
  repoName: string;
  createdAt: string;
}
