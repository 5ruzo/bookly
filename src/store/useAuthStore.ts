import { create } from 'zustand';
import { UserState } from '@/types/auth.type';
import { boolean } from 'zod';

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  isLogin: false,
  error: null,
  setError: (message) => set({ error: message }),
  setUser: (user) => set({ user, isLogin: true }),
  clearUser: () => set({ user: null, isLogin: false }),
}));
