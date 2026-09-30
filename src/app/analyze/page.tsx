import type { Metadata } from "next";
import { Suspense } from "react";
import { Dashboard } from "@/components/analytics/Dashboard";
import { DashboardSkeleton } from "@/components/analytics/DashboardSkeleton";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Profile analysis",
  description: "Repositories, languages, stars, forks and public activity for a GitHub profile.",
};

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <Container className="py-8">
          <DashboardSkeleton />
        </Container>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
