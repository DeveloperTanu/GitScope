"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GitCompare } from "lucide-react";
import { ApiErrorState } from "@/components/ui/ApiErrorState";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useGithubProfile } from "@/hooks/useGithubProfile";
import { parseGithubUsername } from "@/lib/github/endpoints";
import { ComparisonHeader } from "./ComparisonHeader";
import { ComparisonTable } from "./ComparisonTable";

export function CompareView() {
  const router = useRouter();
  const params = useSearchParams();
  const id = useId();
  const paramA = params.get("a") ?? "";
  const paramB = params.get("b") ?? "";
  const usernameA = parseGithubUsername(paramA);
  const usernameB = parseGithubUsername(paramB);

  const [inputA, setInputA] = useState(paramA);
  const [inputB, setInputB] = useState(paramB);
  const [formError, setFormError] = useState<string | null>(null);

  const a = useGithubProfile(usernameA);
  const b = useGithubProfile(usernameB);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const first = parseGithubUsername(inputA);
    const second = parseGithubUsername(inputB);
    if (!first || !second) return setFormError("Enter two valid GitHub usernames.");
    setFormError(null);
    router.push(`/compare/?a=${encodeURIComponent(first)}&b=${encodeURIComponent(second)}`);
  }

  let result: React.ReactNode;
  if (!usernameA || !usernameB) {
    result = (
      <EmptyState
        icon={<GitCompare className="size-6" aria-hidden />}
        title="Compare two profiles"
        description="Enter two GitHub usernames to see their public metrics side by side."
      />
    );
  } else if (a.status === "error") {
    result = <ApiErrorState error={a.error} username={usernameA} />;
  } else if (b.status === "error") {
    result = <ApiErrorState error={b.error} username={usernameB} />;
  } else if (a.status !== "success" || b.status !== "success") {
    result = (
      <div className="space-y-3" role="status" aria-label="Loading comparison">
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-22" />
          <Skeleton className="h-22" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  } else {
    result = (
      <div className="space-y-6">
        <ComparisonHeader users={[a.data.user, b.data.user]} />
        <ComparisonTable a={a.data} b={b.data} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-2">
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          {[
            { label: "First username", value: inputA, set: setInputA, key: "a" },
            { label: "Second username", value: inputB, set: setInputB, key: "b" },
          ].map((field) => (
            <div key={field.key} className="space-y-1.5">
              <label htmlFor={`${id}-${field.key}`} className="text-sm font-medium">
                {field.label}
              </label>
              <Input
                id={`${id}-${field.key}`}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                placeholder="e.g. torvalds"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
              />
            </div>
          ))}
          <Button type="submit">Compare</Button>
        </div>
        {formError && (
          <p role="alert" className="text-sm text-danger">
            {formError}
          </p>
        )}
      </form>
      {result}
    </div>
  );
}
