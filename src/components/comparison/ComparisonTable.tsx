import { Card } from "@/components/ui/Card";
import { calculateLanguageDistribution } from "@/lib/analytics/languageStats";
import { summarizeRepositories } from "@/lib/analytics/repositoryStats";
import { formatNumber } from "@/lib/utils";
import type { ProfileSnapshot } from "@/types/analytics";

function buildColumn({ user, repos, events }: ProfileSnapshot): string[] {
  const summary = summarizeRepositories(repos);
  const languages = calculateLanguageDistribution(repos.filter((r) => !r.isFork), 3)
    .map((l) => l.language)
    .join(", ");
  return [
    formatNumber(user.publicRepos),
    formatNumber(summary.original),
    formatNumber(user.followers),
    formatNumber(user.following),
    formatNumber(summary.totalStars),
    formatNumber(summary.totalForks),
    languages || "—",
    events ? formatNumber(events.length) : "Unavailable",
  ];
}

const ROWS = [
  "Public repositories",
  "Original repositories",
  "Followers",
  "Following",
  "Total stars",
  "Total forks",
  "Top languages",
  "Recent public events",
];

export function ComparisonTable({ a, b }: { a: ProfileSnapshot; b: ProfileSnapshot }) {
  const colA = buildColumn(a);
  const colB = buildColumn(b);

  return (
    <div className="space-y-3">
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <caption className="sr-only">Public metrics for {a.user.login} and {b.user.login}</caption>
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th scope="col" className="px-4 py-3 font-medium">Metric</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">{a.user.login}</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">{b.user.login}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ROWS.map((label, i) => (
              <tr key={label}>
                <th scope="row" className="px-4 py-3 text-left font-normal text-muted-foreground">{label}</th>
                <td className="px-4 py-3 text-right font-medium tabular-nums">{colA[i]}</td>
                <td className="px-4 py-3 text-right font-medium tabular-nums">{colB[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground">
        Stars, forks and languages come from up to 300 of each user&apos;s most recently updated public repositories. Event counts cover the
        latest 100 public events (about 90 days at most).
      </p>
    </div>
  );
}
