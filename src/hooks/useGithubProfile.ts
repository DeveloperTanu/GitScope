import type { ProfileSnapshot } from "@/types/analytics";
import type { AsyncState } from "./useAsync";
import { useGithubEvents } from "./useGithubEvents";
import { useGithubRepositories } from "./useGithubRepositories";
import { useGithubUser } from "./useGithubUser";

/** Combines user, repositories and events. Events are optional: a failure there yields `events: null`. */
export function useGithubProfile(username: string | null): AsyncState<ProfileSnapshot> {
  const user = useGithubUser(username);
  const repos = useGithubRepositories(username);
  const events = useGithubEvents(username);

  if (!username) return { status: "idle" };
  if (user.status === "error") return user;
  if (repos.status === "error") return repos;
  if (user.status === "success" && repos.status === "success" && events.status !== "loading") {
    return {
      status: "success",
      data: { user: user.data, repos: repos.data, events: events.status === "success" ? events.data : null },
    };
  }
  return { status: "loading" };
}
