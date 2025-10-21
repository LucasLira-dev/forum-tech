export const ProfileBannerSkeleton = () => (
  <div className="w-full bg-transparent">
    <div className="w-full rounded-md bg-[var(--card)] border border-[var(--border)]">
      <div className="w-full h-40 md:h-48 bg-[var(--muted)] overflow-hidden rounded-t-md animate-pulse" />
    </div>
    <div className="relative">
      <div className="absolute left-4 -mt-14 md:-mt-20">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[var(--muted)] border-4 border-[var(--card)] animate-pulse" />
      </div>
    </div>
    <div className="h-16 md:h-20" />
  </div>
);