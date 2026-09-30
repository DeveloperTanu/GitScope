import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareView } from "@/components/comparison/CompareView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Compare profiles",
  description: "Compare the public GitHub metrics of two developers side by side.",
};

export default function ComparePage() {
  return (
    <Container className="space-y-6 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Compare profiles</h1>
        <p className="mt-1 text-sm text-muted-foreground">A factual, side-by-side view of public metrics.</p>
      </div>
      <Suspense>
        <CompareView />
      </Suspense>
    </Container>
  );
}
