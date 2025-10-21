export const UserInfoCardSkeleton = () => (
  <div className="flex gap-4 items-start sm:items-center border border-[var(--border)] p-4 sm:p-6 rounded-md bg-[var(--card)] animate-pulse">
    <div className="w-12 h-12 rounded-full bg-[var(--muted)]" />

    <div className="flex flex-col gap-1 flex-1">
      <div className="relative flex flex-wrap items-baseline gap-3">
        <div className="h-4 w-1/3 bg-[var(--muted)] rounded" />
        <div className="h-3 w-16 bg-[var(--muted)] rounded" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mt-2">
        <div className="h-8 w-24 bg-[var(--muted)] rounded" />
        <div className="h-8 w-24 bg-[var(--muted)] rounded" />
      </div>
    </div>
  </div>
);