import type { PublicEvent } from "@/lib/github/types";
import type { EventTypeStat } from "@/types/analytics";

const EVENT_LABELS: Record<string, string> = {
  PushEvent: "Pushes",
  PullRequestEvent: "Pull requests",
  PullRequestReviewEvent: "Reviews",
  IssuesEvent: "Issues",
  IssueCommentEvent: "Comments",
  WatchEvent: "Stars given",
  CreateEvent: "Created",
  ForkEvent: "Forks",
};

export const getEventLabel = (type: string): string => EVENT_LABELS[type] ?? "Other";

export function countEventsByType(events: PublicEvent[]): EventTypeStat[] {
  const counts = new Map<string, number>();
  for (const event of events) {
    const label = getEventLabel(event.type);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts]
    .map(([label, count]) => ({ type: label, label, count }))
    .sort((a, b) => b.count - a.count);
}

export function getActivityRange(events: PublicEvent[]): { from: string; to: string } | null {
  if (events.length === 0) return null;
  const times = events.map((e) => Date.parse(e.createdAt));
  return {
    from: new Date(Math.min(...times)).toISOString(),
    to: new Date(Math.max(...times)).toISOString(),
  };
}
