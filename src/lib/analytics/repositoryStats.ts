import type { Repository } from "@/lib/github/types";
import type {
  RepositoryFilter,
  RepositoryQuery,
  RepositorySort,
  RepositorySummary,
} from "@/types/analytics";

export const calculateTotalStars = (repos: Repository[]): number =>
  repos.reduce((sum, r) => sum + r.stars, 0);

export const calculateTotalForks = (repos: Repository[]): number =>
  repos.reduce((sum, r) => sum + r.forks, 0);

export function getMostStarredRepositories(repos: Repository[], count = 5): Repository[] {
  return repos
    .filter((r) => r.stars > 0)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, count);
}

export function getMostForkedRepositories(repos: Repository[], count = 5): Repository[] {
  return repos
    .filter((r) => r.forks > 0)
    .sort((a, b) => b.forks - a.forks)
    .slice(0, count);
}

export function getRecentlyUpdatedRepository(repos: Repository[]): Repository | null {
  return sortRepositories(repos, "updated")[0] ?? null;
}

export function summarizeRepositories(repos: Repository[]): RepositorySummary {
  const forks = repos.filter((r) => r.isFork).length;
  return {
    total: repos.length,
    original: repos.length - forks,
    forks,
    totalStars: calculateTotalStars(repos),
    totalForks: calculateTotalForks(repos),
    mostStarred: getMostStarredRepositories(repos, 1)[0] ?? null,
    mostForked: getMostForkedRepositories(repos, 1)[0] ?? null,
    recentlyUpdated: getRecentlyUpdatedRepository(repos),
  };
}

const time = (iso: string) => Date.parse(iso);

const comparators: Record<RepositorySort, (a: Repository, b: Repository) => number> = {
  stars: (a, b) => b.stars - a.stars,
  forks: (a, b) => b.forks - a.forks,
  updated: (a, b) => time(b.updatedAt) - time(a.updatedAt),
  created: (a, b) => time(b.createdAt) - time(a.createdAt),
  name: (a, b) => a.name.localeCompare(b.name),
};

export function sortRepositories(repos: Repository[], sort: RepositorySort): Repository[] {
  return [...repos].sort(comparators[sort]);
}

const filters: Record<RepositoryFilter, (r: Repository) => boolean> = {
  all: () => true,
  original: (r) => !r.isFork,
  forks: (r) => r.isFork,
};

export function filterRepositories(repos: Repository[], { search, filter }: RepositoryQuery): Repository[] {
  const needle = search.trim().toLowerCase();
  return repos.filter(
    (r) =>
      filters[filter](r) &&
      (!needle ||
        r.name.toLowerCase().includes(needle) ||
        r.description?.toLowerCase().includes(needle) ||
        r.language?.toLowerCase().includes(needle)),
  );
}
