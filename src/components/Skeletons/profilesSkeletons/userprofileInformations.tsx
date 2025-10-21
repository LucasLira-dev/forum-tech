export const UserProfileInformationsSkeleton = () => (
  <div className="bg-[var(--card)] flex flex-col gap-6 p-6 rounded-lg animate-pulse">
    <div className="flex flex-col gap-1">
      <div className="h-5 w-1/3 bg-[var(--muted)] rounded mb-2" />
      <div className="h-4 w-1/4 bg-[var(--muted)] rounded" />
    </div>
    <div className="flex items-center gap-1 text-sm">
      <div className="h-4 w-32 bg-[var(--muted)] rounded" />
    </div>
    <div className="h-4 w-full bg-[var(--muted)] rounded" />
    <div className="flex gap-6 items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-6 w-10 bg-[var(--muted)] rounded mb-1" />
        <div className="h-3 w-12 bg-[var(--muted)] rounded" />
      </div>
      <div className="flex flex-col items-center">
        <div className="h-6 w-10 bg-[var(--muted)] rounded mb-1" />
        <div className="h-3 w-16 bg-[var(--muted)] rounded" />
      </div>
    </div>
  </div>
);