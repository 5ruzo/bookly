import { createClient } from '@supabase/supabase-js';
import { AuthState } from '@/types/auth.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // 회원가입 로직
  signUp: async (email, password, phone) => {
    try {
      set({ isLoading: true, error: null });

      // 이메일 체크
      const emailExists = await get().checkEmailExists(email);
      if (emailExists) {
        set({ error: '이미 사용 중인 이메일입니다.', isLoading: false });
        return;
      }

      // 회원가입 수파베이스 연동
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone,
          },
        },
      });

      if (error) throw error;

      // 회원가입 성공시 전역 상태 셋
      set({
        isLoading: false,
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email || '',
              phone,
            }
          : null,
        isAuthenticated: !!data.user,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || '회원가입 중 오류가 발생했습니다.',
      });
    }
  },

  // 로그인 로직
  signIn: async (email, password, rememberMe) => {
    try {
      set({ isLoading: true, error: null });

      // 수파베이스 로그인 연동
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 로그인 성공시 전역상태 셋
      set({
        isLoading: false,
        user: data.user
          ? {
              id: data.user.id,
              email: data.user.email || '',
              phone: data.user.user_metadata?.phone,
            }
          : null,
        isAuthenticated: !!data.user,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || '로그인 중 오류가 발생했습니다.',
      });
    }
  },

  // 로그아웃 로직
  signOut: async () => {
    try {
      set({ isLoading: true, error: null });

      // 수파베이스 로그아웃 연동
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({
        isLoading: false,
        user: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || '로그아웃 중 오류가 발생했습니다.',
      });
    }
  },

  // 이메일 체크 로직
  checkEmailExists: async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Email check error:', error);
      return false;
    }
  },
}));

export default useAuthStore;
