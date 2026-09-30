import type { Repository } from "@/lib/github/types";
import type { LanguageStat } from "@/types/analytics";

/**
 * Counts repositories by their primary language. This is a repository-based
 * distribution, not a lines-of-code measurement.
 */
export function calculateLanguageDistribution(repos: Repository[], maxItems = 8): LanguageStat[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const sorted = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const head = sorted.slice(0, maxItems);
  const otherCount = sorted.slice(maxItems).reduce((sum, [, n]) => sum + n, 0);
  if (otherCount > 0) head.push(["Other", otherCount]);

  return head.map(([language, count]) => ({ language, count, percentage: (count / total) * 100 }));
}
