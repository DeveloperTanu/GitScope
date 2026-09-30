import { Card, CardContent } from "@/components/ui/Card";
import type { Repository } from "@/lib/github/types";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import type { RepositorySummary } from "@/types/analytics";

function Highlight({ label, repo, detail }: { label: string; repo: Repository | null; detail?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 truncate text-right">
        {repo ? (
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">
            {repo.name}
            {detail && <span className="ml-1.5 font-normal tabular-nums text-muted-foreground">{detail}</span>}
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </dd>
    </div>
  );
}

export function RepositoryStats({ summary }: { summary: RepositorySummary }) {
  return (
    <Card className="h-full">
      <CardContent className="space-y-4">
        <dl className="space-y-2">
          {[
            ["Analyzed repositories", summary.total],
            ["Original", summary.original],
            ["Forked", summary.forks],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium tabular-nums">{formatNumber(Number(value))}</dd>
            </div>
          ))}
        </dl>
        <dl className="space-y-2 border-t pt-4">
          <Highlight label="Most starred" repo={summary.mostStarred} detail={summary.mostStarred ? `★ ${formatNumber(summary.mostStarred.stars)}` : undefined} />
          <Highlight label="Most forked" repo={summary.mostForked} detail={summary.mostForked ? `${formatNumber(summary.mostForked.forks)} forks` : undefined} />
          <Highlight
            label="Recently updated"
            repo={summary.recentlyUpdated}
            detail={summary.recentlyUpdated ? formatRelativeTime(summary.recentlyUpdated.updatedAt) : undefined}
          />
        </dl>
      </CardContent>
    </Card>
  );
}
