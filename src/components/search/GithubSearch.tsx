"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { parseGithubUsername } from "@/lib/github/endpoints";

export function GithubSearch() {
  const router = useRouter();
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return setError("Enter a GitHub username.");
    const username = parseGithubUsername(value);
    if (!username) return setError("That doesn't look like a valid GitHub username.");
    setError(null);
    router.push(`/analyze/?user=${encodeURIComponent(username)}`);
  }

  return (
    <form onSubmit={handleSubmit} role="search" noValidate className="w-full">
      <label htmlFor={id} className="sr-only">
        GitHub username
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id={id}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a GitHub username, e.g. torvalds"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="h-11 pl-9"
          />
        </div>
        <Button type="submit" size="lg">
          Analyze
        </Button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </form>
  );
}
