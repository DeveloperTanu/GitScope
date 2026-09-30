import { Skeleton } from "@/components/ui/Skeleton";

function CardGrid({ count, className }: { count: number; className: string }) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-28" />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-10" role="status" aria-label="Loading profile">
      <div className="flex gap-5">
        <Skeleton className="size-24 shrink-0 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-2/3 max-w-sm" />
        </div>
      </div>
      <CardGrid count={5} className="grid grid-cols-2 gap-3 lg:grid-cols-5" />
      <div className="grid gap-3 lg:grid-cols-3">
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
      </div>
      <CardGrid count={6} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" />
    </div>
  );
}
