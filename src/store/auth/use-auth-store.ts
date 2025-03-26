import { create } from 'zustand';
import { UserState } from '@/types/auth/auth.type';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      error: null,
      setError: (message) => set({ error: message }),
      setUser: (user) => set({ user, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isLogin: state.isLogin,
      }),
    }
  )
);
