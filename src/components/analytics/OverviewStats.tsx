import { BookMarked, GitFork, Star, UserPlus, Users, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { GithubUser } from "@/lib/github/types";
import { formatNumber } from "@/lib/utils";
import type { RepositorySummary } from "@/types/analytics";

interface OverviewStatsProps {
  user: GithubUser;
  summary: RepositorySummary;
  truncated: boolean;
}

interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  note?: string;
}

export function OverviewStats({ user, summary, truncated }: OverviewStatsProps) {
  const partial = truncated ? `From latest ${summary.total} repos` : undefined;
  const stats: Stat[] = [
    {
      label: "Public repositories",
      value: user.publicRepos,
      icon: BookMarked,
      note: truncated ? `Analyzing latest ${summary.total}` : `${summary.original} original · ${summary.forks} forks`,
    },
    { label: "Followers", value: user.followers, icon: Users },
    { label: "Following", value: user.following, icon: UserPlus },
    { label: "Total stars", value: summary.totalStars, icon: Star, note: partial },
    { label: "Total forks", value: summary.totalForks, icon: GitFork, note: partial },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {stats.map(({ label, value, icon: Icon, note }) => (
        <Card key={label} className="p-4 first:col-span-2 lg:first:col-span-1">
          <dt className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="size-4" aria-hidden />
            {label}
          </dt>
          <dd className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">{formatNumber(value)}</dd>
          {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
        </Card>
      ))}
    </dl>
  );
}
