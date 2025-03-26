import { supabase } from './supabaseClient';
import { redirect } from 'next/navigation';

export const authService = {
  signUp: async (email: string, password: string, phone: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { phone } },
      });

      if (error) throw error;

      return { data, error };
    } catch (err) {
      console.error('Sign up error:', err);
      throw err;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { data, error };
    } catch (err) {
      throw err;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      localStorage.removeItem('rememberMe');

      if (error) throw error;
    } catch (err) {
      console.error('Sign out error:', err);
      throw err;
    }
  },

  signInWithKakao: async () => {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
      : 'http://localhost:3000/auth/callback';
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: url,
      },
    });
    if (data.url) {
      redirect(data.url);
    }

    if (error) {
      console.error('카카오 로그인 에러:', error);
      throw error;
    }
  },

  checkEmailExists: async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email);

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data!.length > 0;
    } catch (err) {
      console.error('Check email exists error:', err);
      throw err;
    }
  },

  resetPassword: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      return { data, error };
    } catch (err) {
      console.error('Reset password error:', err);
      throw err;
    }
  },

  verifyPhone: async (phone: string) => {
    try {
      return true;
    } catch (err) {
      console.error('Phone verification error:', err);
      throw err;
    }
  },
};
