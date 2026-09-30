"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { DashboardSkeleton } from "@/components/analytics/DashboardSkeleton";
import { LanguageChart } from "@/components/analytics/LanguageChart";
import { OverviewStats } from "@/components/analytics/OverviewStats";
import { RepositoryStats } from "@/components/analytics/RepositoryStats";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PopularRepositories } from "@/components/repositories/PopularRepositories";
import { RepositoryList } from "@/components/repositories/RepositoryList";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { buttonVariants } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ErrorState } from "@/components/ui/ErrorState";
import { Section } from "@/components/ui/Section";
import { useGithubEvents } from "@/hooks/useGithubEvents";
import { useGithubRepositories } from "@/hooks/useGithubRepositories";
import { useGithubUser } from "@/hooks/useGithubUser";
import { calculateLanguageDistribution } from "@/lib/analytics/languageStats";
import { summarizeRepositories } from "@/lib/analytics/repositoryStats";
import { parseGithubUsername } from "@/lib/github/endpoints";

export function Dashboard() {
  const username = parseGithubUsername(useSearchParams().get("user") ?? "");
  const user = useGithubUser(username);
  const repos = useGithubRepositories(username);
  const events = useGithubEvents(username);

  if (!username) {
    return (
      <Container className="py-10">
        <ErrorState
          title="Enter a valid GitHub username"
          description="The username in this link isn't valid. Head back and try another one."
          action={<Link href="/" className={buttonVariants({ variant: "secondary" })}>Try another username</Link>}
        />
      </Container>
    );
  }

  const error = user.status === "error" ? user.error : repos.status === "error" ? repos.error : null;
  if (error) {
    return (
      <Container className="py-10">
        <ApiErrorState error={error} username={username} />
      </Container>
    );
  }
  if (user.status !== "success" || repos.status !== "success") {
    return (
      <Container className="py-8">
        <DashboardSkeleton />
      </Container>
    );
  }

  const profile = user.data;
  const repositories = repos.data;
  const summary = summarizeRepositories(repositories);
  const languages = calculateLanguageDistribution(repositories.filter((r) => !r.isFork));
  const truncated = profile.publicRepos > repositories.length;

  return (
    <Container className="space-y-10 py-8">
      <ProfileHeader user={profile} />
      {truncated && (
        <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
          This profile has {profile.publicRepos} public repositories. Repository analytics use the {repositories.length} most recently updated ones.
        </p>
      )}
      <OverviewStats user={profile} summary={summary} truncated={truncated} />
      <div className="grid gap-x-3 gap-y-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section id="languages" title="Languages" description="Primary language per original repository">
            <LanguageChart languages={languages} />
          </Section>
        </div>
        <Section id="repo-stats" title="Repository overview">
          <RepositoryStats summary={summary} />
        </Section>
      </div>
      <Section id="popular" title="Most popular repositories" description="Ranked by stars">
        <PopularRepositories repositories={repositories} />
      </Section>
      <Section id="repositories" title="All repositories">
        <RepositoryList repositories={repositories} />
      </Section>
      <Section id="activity" title="Recent public activity">
        <ActivityChart events={events} />
      </Section>
    </Container>
  );
}
