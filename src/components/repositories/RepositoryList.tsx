"use client";

import { useMemo, useState } from "react";
import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";
import { filterRepositories, sortRepositories } from "@/lib/analytics/repositoryStats";
import type { Repository } from "@/lib/github/types";
import type { RepositoryFilter, RepositorySort } from "@/types/analytics";
import { RepositoryGrid } from "./RepositoryGrid";
import { RepositoryToolbar } from "./RepositoryToolbar";

const PAGE_SIZE = 12;

export function RepositoryList({ repositories }: { repositories: Repository[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<RepositorySort>("stars");
  const [filter, setFilter] = useState<RepositoryFilter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const debouncedSearch = useDebounce(search);

  const results = useMemo(
    () => sortRepositories(filterRepositories(repositories, { search: debouncedSearch, filter }), sort),
    [repositories, debouncedSearch, filter, sort],
  );

  if (repositories.length === 0) {
    return <EmptyState icon={<FolderSearch className="size-6" aria-hidden />} title="No public repositories" description="This user hasn't published any repositories yet." />;
  }

  const remaining = results.length - visible;

  return (
    <div className="space-y-4">
      <RepositoryToolbar
        search={search}
        sort={sort}
        filter={filter}
        onSearchChange={(v) => { setSearch(v); setVisible(PAGE_SIZE); }}
        onSortChange={(v) => { setSort(v); setVisible(PAGE_SIZE); }}
        onFilterChange={(v) => { setFilter(v); setVisible(PAGE_SIZE); }}
      />
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {results.length} of {repositories.length} repositories
      </p>
      {results.length === 0 ? (
        <EmptyState icon={<FolderSearch className="size-6" aria-hidden />} title="No matching repositories" description="Try a different search term or filter." />
      ) : (
        <RepositoryGrid repositories={results.slice(0, visible)} />
      )}
      {remaining > 0 && (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Show more ({remaining})
          </Button>
        </div>
      )}
    </div>
  );
}
