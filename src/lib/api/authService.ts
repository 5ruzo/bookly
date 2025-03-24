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

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();

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
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
  },

  verifyPhone: async (phone: string) => {
    // 전화번호 확인 로직을 추가하려면 여기에 구현
    return true;
  },
};
