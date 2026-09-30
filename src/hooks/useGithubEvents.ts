import { getPublicEvents } from "@/lib/github/client";
import { useAsync } from "./useAsync";

export const useGithubEvents = (username: string | null) => useAsync(username, getPublicEvents);
