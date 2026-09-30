"use client";

import Link from "next/link";
import type { GithubError } from "@/lib/github/client";
import { Button, buttonVariants } from "./Button";
import { ErrorState } from "./ErrorState";

interface ApiErrorStateProps {
  error: GithubError;
  username?: string;
}

export function ApiErrorState({ error, username }: ApiErrorStateProps) {
  const retry = <Button onClick={() => window.location.reload()}>Try again</Button>;
  const home = (
    <Link href="/" className={buttonVariants({ variant: "secondary" })}>
      Try another username
    </Link>
  );

  switch (error.kind) {
    case "not_found":
      return (
        <ErrorState
          title="GitHub profile not found"
          description={`We couldn't find a public GitHub profile${username ? ` for “${username}”` : " with that username"}.`}
          action={home}
        />
      );
    case "rate_limit": {
      const when = error.resetAt?.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" });
      return (
        <ErrorState
          title="GitHub API rate limit reached"
          description={`Please wait before trying again.${when ? ` The limit resets around ${when}.` : ""} Anonymous requests are limited to 60 per hour.`}
          action={retry}
        />
      );
    }
    case "network":
      return (
        <ErrorState
          title="Something went wrong"
          description="We couldn't connect to GitHub. Check your connection and try again."
          action={retry}
        />
      );
    default:
      return (
        <ErrorState
          title="Something went wrong"
          description="GitHub returned an unexpected response. Try again in a moment."
          action={retry}
        />
      );
  }
}
