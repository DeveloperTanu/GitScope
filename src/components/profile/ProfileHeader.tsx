import { Building2, Calendar, ExternalLink, Link2, MapPin, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import type { GithubUser } from "@/lib/github/types";
import { formatDate, formatNumber, toExternalUrl } from "@/lib/utils";

function Meta({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-1.5">
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className="min-w-0 truncate">{children}</span>
    </li>
  );
}

export function ProfileHeader({ user }: { user: GithubUser }) {
  const website = user.website ? toExternalUrl(user.website) : null;

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.avatarUrl} alt={`${user.login} avatar`} width={96} height={96} className="size-20 rounded-full border sm:size-24" />
      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{user.name ?? user.login}</h1>
          <p className="font-mono text-sm text-muted-foreground">@{user.login}</p>
        </div>
        {user.bio && <p className="max-w-2xl text-sm leading-relaxed">{user.bio}</p>}
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          {user.location && <Meta icon={MapPin}>{user.location}</Meta>}
          {user.company && <Meta icon={Building2}>{user.company}</Meta>}
          {website && (
            <Meta icon={Link2}>
              <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                {user.website}
              </a>
            </Meta>
          )}
          <Meta icon={Calendar}>Joined {formatDate(user.createdAt)}</Meta>
        </ul>
        <p className="text-sm text-muted-foreground">
          <strong className="font-medium text-foreground">{formatNumber(user.followers)}</strong> followers ·{" "}
          <strong className="font-medium text-foreground">{formatNumber(user.following)}</strong> following ·{" "}
          <strong className="font-medium text-foreground">{formatNumber(user.publicRepos)}</strong> public repositories
        </p>
      </div>
      <a href={user.url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", size: "sm" })}>
        View on GitHub <ExternalLink className="size-3.5" aria-hidden />
      </a>
    </header>
  );
}
