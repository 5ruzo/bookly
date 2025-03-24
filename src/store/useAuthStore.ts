import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/types/auth.type';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Zustand 스토어 생성
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null, // 초기 사용자 상태는 null
      isLoading: false, // 초기 로딩 상태는 false
      error: null, // 초기 오류 상태는 null
      isAuthenticated: false, // 인증되지 않은 상태

      // 회원가입 메서드
      signUp: async (email, password, phone) => {
        try {
          set({ isLoading: true, error: null }); // 로딩 시작, 오류 초기화
          const emailExists = await get().checkEmailExists(email); // 이메일 중복 확인
          if (emailExists) {
            set({ error: '이미 사용 중인 이메일입니다.', isLoading: false });
            return;
          }

          // Supabase를 이용해 회원가입 요청
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                phone,
              },
            },
          });

          if (error) throw error; // 에러가 있으면 예외 발생

          // 성공 시 사용자 상태 업데이트
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
          // 오류 발생 시 오류 상태 업데이트
          set({
            isLoading: false,
            error: error.message || '회원가입 중 오류가 발생했습니다.',
          });
        }
      },

      // 로그인 메서드
      signIn: async (email, password, rememberMe) => {
        try {
          set({ isLoading: true, error: null }); // 로딩 시작, 오류 초기화

          // Supabase를 이용해 로그인 요청
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error; // 에러가 있으면 예외 발생

          // 성공 시 사용자 상태 업데이트
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
          // 오류 발생 시 오류 상태 업데이트
          set({
            isLoading: false,
            error: error.message || '로그인 중 오류가 발생했습니다.',
          });
        }
      },

      // 로그아웃 메서드
      signOut: async () => {
        try {
          set({ isLoading: true, error: null }); // 로딩 시작, 오류 초기화

          // Supabase를 이용해 로그아웃 요청
          const { error } = await supabase.auth.signOut();
          if (error) throw error; // 에러가 있으면 예외 발생

          // 성공 시 사용자 상태 초기화
          set({
            isLoading: false,
            user: null,
            isAuthenticated: false,
          });
        } catch (error: any) {
          // 오류 발생 시 오류 상태 업데이트
          set({
            isLoading: false,
            error: error.message || '로그아웃 중 오류가 발생했습니다.',
          });
        }
      },

      // 이메일 중복 체크 메서드
      checkEmailExists: async (email) => {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email);

          if (error && error.code !== 'PGRST116') {
            throw error; // 에러가 있으면 예외 발생
          }

          return data!.length > 0; // 이메일이 존재하면 true 반환
        } catch (error) {
          console.error('Email check error:', error); // 오류 로그 출력
          return false;
        }
      },

      // 비밀번호 재설정 메서드
      resetPassword: async (email) => {
        try {
          set({ isLoading: true, error: null }); // 로딩 시작, 오류 초기화

          // Supabase를 이용해 비밀번호 재설정 이메일 전송
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
          });

          if (error) throw error; // 에러가 있으면 예외 발생

          // 성공 시 로딩 상태만 false로 설정
          set({ isLoading: false });
        } catch (error: any) {
          // 오류 발생 시 오류 상태 업데이트
          set({
            isLoading: false,
            error:
              error.message ||
              '비밀번호 재설정 메일 전송 중 오류가 발생했습니다.',
          });
        }
      },

      // 전화번호 확인 메서드 (현재는 항상 true 반환)
      verifyPhone: async (phone) => {
        try {
          return true; // 실제 전화번호 확인 로직 추가 예정
        } catch (error) {
          console.error('Phone verification error:', error); // 오류 로그 출력
          return false; // 오류 발생 시 false 반환
        }
      },
    }),
    {
      name: 'auth-storage', // 로컬스토리지에 저장할 이름
      partialize: (state) => ({
        user: state.user, // user와 isAuthenticated만 로컬스토리지에 저장
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
