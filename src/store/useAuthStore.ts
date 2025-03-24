import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from '@/types/auth.type';

export const useAuthStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLogin: false,
      setUser: (user) => set({ user, isLogin: true }),
      clearUser: () => set({ user: null, isLogin: false }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useAuthStore;
