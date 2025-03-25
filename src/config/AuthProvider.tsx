'use client';

import { supabase } from '@/lib/api/supabaseClient';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    // 초기 세션 확인 및 자동 로그인 로직
    const checkAutoLogin = async () => {
      // 로컬 스토리지의 rememberMe 확인
      const rememberMe = localStorage.getItem('rememberMe') === 'true';

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && rememberMe) {
        // 세션이 존재하고 rememberMe가 true인 경우
        setUser(session.user);
      } else {
        // 세션 만료 또는 로그인 유지 선택 안 함
        clearUser();
      }
    };

    // 인증 상태 변경 리스너 설정
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const rememberMe = localStorage.getItem('rememberMe') === 'true';

      if (event === 'SIGNED_IN' && rememberMe && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        clearUser();
        localStorage.removeItem('rememberMe');
      }
    });

    // 초기 자동 로그인 체크
    checkAutoLogin();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <>{children}</>;
}
