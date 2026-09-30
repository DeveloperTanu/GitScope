import { eventsUrl, reposUrl, userUrl } from "./endpoints";
import type { GithubUser, PublicEvent, RawEvent, RawRepo, RawUser, Repository } from "./types";

export type GithubErrorKind = "not_found" | "rate_limit" | "network" | "unknown";

export class GithubError extends Error {
  constructor(
    readonly kind: GithubErrorKind,
    message: string,
    readonly resetAt?: Date,
  ) {
    super(message);
    this.name = "GithubError";
  }
}

const PAGE_SIZE = 100;
const MAX_PAGES = 3;
const cache = new Map<string, Promise<unknown>>();

async function request<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  } catch {
    throw new GithubError("network", "Could not reach GitHub.");
  }
  if (res.status === 404) throw new GithubError("not_found", "Not found.");

  const limited =
    res.status === 429 || (res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0");
  if (limited) {
    const reset = Number(res.headers.get("x-ratelimit-reset"));
    throw new GithubError("rate_limit", "Rate limit reached.", reset ? new Date(reset * 1000) : undefined);
  }
  if (!res.ok) throw new GithubError("unknown", `GitHub responded with ${res.status}.`);

  try {
    return (await res.json()) as T;
  } catch {
    throw new GithubError("unknown", "Unexpected response from GitHub.");
  }
}

// Successful responses are memoized for the session to protect the 60 req/hour anonymous limit.
function cached<T>(url: string): Promise<T> {
  let promise = cache.get(url) as Promise<T> | undefined;
  if (!promise) {
    promise = request<T>(url);
    cache.set(url, promise);
    promise.catch(() => cache.delete(url));
  }
  return promise;
}

const normalizeUser = (u: RawUser): GithubUser => ({
  login: u.login,
  name: u.name,
  avatarUrl: u.avatar_url,
  url: u.html_url,
  bio: u.bio,
  location: u.location,
  company: u.company,
  website: u.blog?.trim() || null,
  followers: u.followers,
  following: u.following,
  publicRepos: u.public_repos,
  createdAt: u.created_at,
});

const normalizeRepo = (r: RawRepo): Repository => ({
  id: r.id,
  name: r.name,
  fullName: r.full_name,
  description: r.description,
  url: r.html_url,
  language: r.language,
  stars: r.stargazers_count,
  forks: r.forks_count,
  isFork: r.fork,
  isArchived: r.archived,
  visibility: r.private || r.visibility === "private" ? "private" : "public",
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

export async function getUser(username: string): Promise<GithubUser> {
  return normalizeUser(await cached<RawUser>(userUrl(username.toLowerCase())));
}

/** Loads up to 300 of the user's most recently updated public repositories. */
export async function getRepositories(username: string): Promise<Repository[]> {
  const all: Repository[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const raw = await cached<RawRepo[]>(reposUrl(username.toLowerCase(), page, PAGE_SIZE));
    all.push(...raw.map(normalizeRepo));
    if (raw.length < PAGE_SIZE) break;
  }
  return all;
}

/** Loads the latest 100 public events (GitHub exposes at most 90 days of history). */
export async function getPublicEvents(username: string): Promise<PublicEvent[]> {
  const raw = await cached<RawEvent[]>(eventsUrl(username.toLowerCase()));
  return raw
    .filter((e): e is RawEvent & { type: string; created_at: string } => Boolean(e.type && e.created_at))
    .map((e) => ({ id: e.id, type: e.type, repoName: e.repo.name, createdAt: e.created_at }));
}
