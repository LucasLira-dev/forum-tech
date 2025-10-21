import React from "react";

export const TopicsSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse flex gap-4 items-start sm:items-center border border-[var(--border)] p-4 sm:p-6 rounded-md bg-[var(--card)]"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--muted)]" />

          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-1/3 bg-[var(--muted)] rounded" />
            <div className="h-3 w-2/3 bg-[var(--muted)] rounded" />
            <div className="h-3 w-1/2 bg-[var(--muted)] rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-3 w-16 bg-[var(--muted)] rounded" />
              <div className="h-3 w-10 bg-[var(--muted)] rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};