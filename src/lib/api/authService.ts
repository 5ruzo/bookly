import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from './supabaseClient';

export const authService = {
  signUp: async (email: string, password: string, phone: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { phone } },
    });

    if (error) throw error;

    return { data, error };
  },

  signIn: async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          persistSession: rememberMe,
        } as any,
      });

      return { data, error };
    } catch (err) {
      throw err;
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    localStorage.removeItem('rememberMe');
    if (error) throw error;
  },

  checkEmailExists: async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email);

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data!.length > 0;
  },

  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return { data, error };
  },

  verifyPhone: async (phone: string) => {
    return true;
  },
};
