"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getMostStarredRepositories } from "@/lib/analytics/repositoryStats";
import type { Repository } from "@/lib/github/types";
import { RepositoryGrid } from "./RepositoryGrid";

const INITIAL = 5;
const MAX = 15;

export function PopularRepositories({ repositories }: { repositories: Repository[] }) {
  const [count, setCount] = useState(INITIAL);
  const top = getMostStarredRepositories(repositories, MAX);

  if (top.length === 0) {
    return <EmptyState icon={<Star className="size-6" aria-hidden />} title="No starred repositories yet" />;
  }

  return (
    <div className="space-y-4">
      <RepositoryGrid repositories={top.slice(0, count)} />
      {top.length > count && (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={() => setCount(MAX)}>
            Show more
          </Button>
        </div>
      )}
    </div>
  );
}
