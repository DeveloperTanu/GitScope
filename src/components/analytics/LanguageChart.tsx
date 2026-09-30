import { Card, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPercent } from "@/lib/utils";
import type { LanguageStat } from "@/types/analytics";

function segmentColor(language: string, index: number, total: number): string {
  if (language === "Other") return "var(--border)";
  const strength = 100 - (index / Math.max(total - 1, 1)) * 80;
  return `color-mix(in oklab, var(--accent) ${Math.round(strength)}%, var(--muted-foreground))`;
}

export function LanguageChart({ languages }: { languages: LanguageStat[] }) {
  if (languages.length === 0) {
    return <EmptyState title="No language data" description="None of the analyzed repositories report a primary language." />;
  }

  const summary = languages.map((l) => `${l.language} ${formatPercent(l.percentage)}`).join(", ");

  return (
    <Card className="h-full">
      <CardContent className="space-y-5">
        <div
          role="img"
          aria-label={`Language distribution by repository count: ${summary}`}
          className="flex h-3 gap-0.5 overflow-hidden rounded-full"
        >
          {languages.map((l, i) => (
            <div
              key={l.language}
              style={{ width: `${l.percentage}%`, background: segmentColor(l.language, i, languages.length) }}
            />
          ))}
        </div>
        <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {languages.map((l, i) => (
            <li key={l.language} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: segmentColor(l.language, i, languages.length) }}
              />
              <span className="truncate">{l.language}</span>
              <span className="ml-auto tabular-nums text-muted-foreground">
                {l.count} {l.count === 1 ? "repo" : "repos"}
              </span>
              <span className="w-14 text-right font-medium tabular-nums">{formatPercent(l.percentage)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground">
          Repository-based: each original repository counts once under its primary language. This is not a measure of lines of code.
        </p>
      </CardContent>
    </Card>
  );
}
