export const UserActivityTabsSkeleton = () => (
  <div className="w-full">
    <div className="flex items-center justify-center gap-1 bg-transparent p-2">
      <div className="h-8 w-24 bg-[var(--muted)] rounded animate-pulse" />
      <div className="h-8 w-24 bg-[var(--muted)] rounded animate-pulse" />
    </div>
    <div className="mt-4 flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="h-16 w-full bg-[var(--muted)] rounded animate-pulse" />
      ))}
    </div>
  </div>
);