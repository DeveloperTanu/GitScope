import { GitFork, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Repository } from "@/lib/github/types";
import { formatCompactNumber, formatRelativeTime } from "@/lib/utils";

export function RepositoryCard({ repo }: { repo: Repository }) {
  return (
    <Card className="relative flex h-full flex-col gap-3 p-4 transition-colors duration-150 hover:border-accent/60 hover:bg-muted/40 focus-within:border-ring">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 truncate font-medium after:absolute after:inset-0 hover:underline focus-visible:outline-none"
        >
          {repo.name}
        </a>
        <Badge className="capitalize">{repo.visibility}</Badge>
        {repo.isFork && <Badge>Fork</Badge>}
        {repo.isArchived && <Badge>Archived</Badge>}
      </div>
      <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{repo.description ?? "No description provided."}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1" aria-label={`${repo.stars} stars`}>
          <Star className="size-3.5" aria-hidden /> {formatCompactNumber(repo.stars)}
        </span>
        <span className="flex items-center gap-1" aria-label={`${repo.forks} forks`}>
          <GitFork className="size-3.5" aria-hidden /> {formatCompactNumber(repo.forks)}
        </span>
        <span className="ml-auto">Updated {formatRelativeTime(repo.updatedAt)}</span>
      </div>
    </Card>
  );
}
