'use client';

import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated' || !session?.accessToken) {
      router.replace('/login');
    }
  }, [status, session?.accessToken, router]);

  if (status === 'loading') return <div>Carregando...</div>;
  if (status !== 'authenticated' || !session?.accessToken) return null;

  return <>{children}</>;
}