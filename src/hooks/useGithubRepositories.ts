import { getRepositories } from "@/lib/github/client";
import { useAsync } from "./useAsync";

export const useGithubRepositories = (username: string | null) => useAsync(username, getRepositories);
