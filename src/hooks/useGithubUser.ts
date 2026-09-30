import { getUser } from "@/lib/github/client";
import { useAsync } from "./useAsync";

export const useGithubUser = (username: string | null) => useAsync(username, getUser);
