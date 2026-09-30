import { siteConfig } from "@/config/site";

const base = siteConfig.githubApi;

export const userUrl = (username: string) => `${base}/users/${encodeURIComponent(username)}`;

export const reposUrl = (username: string, page: number, perPage: number) =>
  `${userUrl(username)}/repos?type=owner&sort=updated&per_page=${perPage}&page=${page}`;

export const eventsUrl = (username: string) => `${userUrl(username)}/events/public?per_page=100`;

const USERNAME_PATTERN = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

/** Accepts "torvalds", "@torvalds" or a github.com URL; returns a valid username or null. */
export function parseGithubUsername(input: string): string | null {
  const cleaned = input
    .trim()
    .replace(/^(?:https?:\/\/)?(?:www\.)?github\.com\//i, "")
    .replace(/^@/, "")
    .split(/[/?#]/)[0];
  return USERNAME_PATTERN.test(cleaned) ? cleaned : null;
}
