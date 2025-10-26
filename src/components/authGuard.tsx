'use client';

import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Caminhos públicos que não devem ser protegidos pelo guard.
  const PUBLIC_PATHS = ['/', '/login', '/register'];

  const isPublicPath = PUBLIC_PATHS.some((p) => pathname?.startsWith(p));

  useEffect(() => {
    // Se rota pública, não fazemos redirecionamento
    if (isPublicPath) return;

    if (status === 'loading') return;
    if (status === 'unauthenticated' || !session?.accessToken) {
      router.push('/login');
    }
  }, [status, session?.accessToken, router, isPublicPath]);

  if (isPublicPath) return <>{children}</>;

  if (status === 'loading') return <div>Carregando...</div>;
  if (status !== 'authenticated' || !session?.accessToken) return null;

  return <>{children}</>;
}