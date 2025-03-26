'use client';

import { AuthProvider } from '@/config/auth-provider';
import Providers from '@/config/tq-provider';
import { usePathname, useRouter } from 'next/navigation';
import Header from './header';
import Footer from './footer';
import { useAuthStore } from '@/store/use-auth-store';
import { useEffect } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const pathname = usePathname();
  const protectedPaths = ['/my-page', '/order', '/cart'];
  const isPathProtected = protectedPaths.some((path) =>
    pathname.includes(path)
  );

  useEffect(() => {
    if (isPathProtected && !isLogin) {
      router.replace('/auth/sign-in');
    }
  }, [isLogin, router]);

  return (
    <>
      <Providers>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </Providers>
      <Footer />
    </>
  );
};

export default AuthGuard;
