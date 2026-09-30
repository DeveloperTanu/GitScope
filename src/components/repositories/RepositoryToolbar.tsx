import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { RepositoryFilter, RepositorySort } from "@/types/analytics";

const SORTS: { value: RepositorySort; label: string }[] = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "updated", label: "Recently updated" },
  { value: "created", label: "Recently created" },
  { value: "name", label: "Name" },
];

const FILTERS: { value: RepositoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "original", label: "Original" },
  { value: "forks", label: "Forks" },
];

interface RepositoryToolbarProps {
  search: string;
  sort: RepositorySort;
  filter: RepositoryFilter;
  onSearchChange: (value: string) => void;
  onSortChange: (value: RepositorySort) => void;
  onFilterChange: (value: RepositoryFilter) => void;
}

export function RepositoryToolbar({ search, sort, filter, onSearchChange, onSortChange, onFilterChange }: RepositoryToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <label htmlFor="repo-search" className="sr-only">
          Search repositories
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input id="repo-search" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search repositories..." className="pl-9" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filter repositories" className="flex gap-1">
          {FILTERS.map((f) => (
            <Button key={f.value} size="sm" variant={filter === f.value ? "secondary" : "ghost"} aria-pressed={filter === f.value} onClick={() => onFilterChange(f.value)}>
              {f.label}
            </Button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Sort
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as RepositorySort)}
            className="h-9 rounded-md border bg-card px-2 text-sm text-foreground"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
