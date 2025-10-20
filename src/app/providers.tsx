'use client';

import AuthGuard from "@/components/authGuard";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <AuthGuard>
                {children}
            </AuthGuard>
        </SessionProvider>
    );
}
