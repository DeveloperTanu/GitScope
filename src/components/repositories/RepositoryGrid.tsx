import type { Repository } from "@/lib/github/types";
import { RepositoryCard } from "./RepositoryCard";

export function RepositoryGrid({ repositories }: { repositories: Repository[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repo) => (
        <li key={repo.id}>
          <RepositoryCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}
