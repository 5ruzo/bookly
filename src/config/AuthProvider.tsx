'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { supabase } from '@/lib/api/supabaseClient';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser } = useAuthStore.getState();

  useEffect(() => {
    // 초기 사용자 정보 확인
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
    };
    fetchUser();

    // onAuthStateChange로 사용자 상태 감지
    const { data: unsubscribe } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          clearUser();
        }
      }
    );

    return unsubscribe?.subscription.unsubscribe || (() => {});
  }, [setUser]);

  return <>{children}</>;
};

export default AuthProvider;
