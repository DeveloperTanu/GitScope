import { useEffect, useState } from "react";
import { GithubError } from "@/lib/github/client";

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: GithubError };

/** Runs `load(key)` whenever `key` changes. A null key keeps the hook idle. */
export function useAsync<T>(key: string | null, load: (key: string) => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: key ? "loading" : "idle" });

  useEffect(() => {
    if (!key) {
      setState({ status: "idle" });
      return;
    }
    let active = true;
    setState({ status: "loading" });
    load(key).then(
      (data) => active && setState({ status: "success", data }),
      (error: unknown) =>
        active &&
        setState({
          status: "error",
          error: error instanceof GithubError ? error : new GithubError("unknown", "Unexpected error."),
        }),
    );
    return () => {
      active = false;
    };
    // `load` is a stable module-level function; the key is the only real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
