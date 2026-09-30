import { Card } from "@/components/ui/Card";
import type { GithubUser } from "@/lib/github/types";

export function ComparisonHeader({ users }: { users: [GithubUser, GithubUser] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {users.map((user) => (
        <Card key={user.login} className="flex items-center gap-4 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatarUrl} alt="" width={56} height={56} className="size-14 rounded-full border" />
          <div className="min-w-0">
            <h2 className="truncate font-semibold">{user.name ?? user.login}</h2>
            <a href={user.url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-muted-foreground hover:underline">
              @{user.login}
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
