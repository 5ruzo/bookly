import { User } from '@supabase/supabase-js';

// 사용자 데이터의 타입 정의
export type UserData = {
  id: string;
  email: string;
  phone?: string;
};

// 인증 상태를 관리할 Zustand 스토어의 타입 정의
export type UserState = {
  user: User | null;
  isLogin: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};
