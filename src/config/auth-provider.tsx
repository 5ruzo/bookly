'use client';

import browserClient from '@/lib/utils/supabase/client';
import { useAuthStore } from '@/store/use-auth-store';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // 인증 상태 변경 리스너 설정
    const {
      data: { subscription },
    } = browserClient.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        clearUser();
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
