"use client";

import dynamic from "next/dynamic";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import type { AsyncState } from "@/hooks/useAsync";
import { countEventsByType, getActivityRange, getEventLabel } from "@/lib/analytics/activityStats";
import type { PublicEvent } from "@/lib/github/types";
import { formatDate, formatRelativeTime } from "@/lib/utils";

const ActivityBars = dynamic(() => import("./ActivityBars"), {
  ssr: false,
  loading: () => <Skeleton className="h-48" />,
});

export function ActivityChart({ events }: { events: AsyncState<PublicEvent[]> }) {
  if (events.status === "loading" || events.status === "idle") {
    return (
      <div className="grid gap-3 lg:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }
  if (events.status === "error") {
    return (
      <ErrorState
        className="py-8"
        title="Activity unavailable"
        description={
          events.error.kind === "rate_limit"
            ? "GitHub's rate limit was reached before public activity could load."
            : "Public activity couldn't be loaded right now."
        }
      />
    );
  }
  if (events.data.length === 0) {
    return (
      <EmptyState
        icon={<Activity className="size-6" aria-hidden />}
        title="No recent public activity"
        description="GitHub reports no public events in roughly the last 90 days."
      />
    );
  }

  const stats = countEventsByType(events.data);
  const range = getActivityRange(events.data);
  const chartLabel = `Public events by type: ${stats.map((s) => `${s.label} ${s.count}`).join(", ")}`;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardContent>
            <div role="img" aria-label={chartLabel}>
              <ActivityBars data={stats} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ul className="divide-y">
              {events.data.slice(0, 8).map((event) => (
                <li key={event.id} className="flex items-center gap-3 py-2 text-sm first:pt-0 last:pb-0">
                  <Badge className="w-28 shrink-0 justify-center">{getEventLabel(event.type)}</Badge>
                  <span className="min-w-0 flex-1 truncate">{event.repoName}</span>
                  <time dateTime={event.createdAt} className="shrink-0 text-xs text-muted-foreground">
                    {formatRelativeTime(event.createdAt)}
                  </time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        Based on the latest {events.data.length} public events
        {range && ` (${formatDate(range.from)} – ${formatDate(range.to)})`}. GitHub only exposes about 90 days of public events, and
        private contributions or the contribution graph are not available through the public API.
      </p>
    </div>
  );
}
