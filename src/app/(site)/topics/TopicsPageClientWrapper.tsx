"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { TopicsProvider } from "@/contexts/TopicsContext";

export default function TopicsPageClientWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <TopicsProvider>
        {children}
      </TopicsProvider>
    </SessionProvider>
  );
}
