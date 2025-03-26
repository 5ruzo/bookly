import browserClient from '../utils/supabase/client';

export const authService = {
  signUp: async (email: string, password: string, phone: string) => {
    try {
      const { data, error } = await browserClient.auth.signUp({
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
      const { data, error } = await browserClient.auth.signInWithPassword({
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
      const { error } = await browserClient.auth.signOut();
      localStorage.removeItem('rememberMe');

      if (error) throw error;
    } catch (err) {
      console.error('Sign out error:', err);
      throw err;
    }
  },

  signInWithKakao: async () => {
    try {
      const getURL = () => {
        let url =
          process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
          process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
          'http://localhost:3000/';
        // Make sure to include `https://` when not localhost.
        url = url.startsWith('http') ? url : `https://${url}`;
        // Make sure to include a trailing `/`.
        url = url.endsWith('/') ? url : `${url}/`;
        return url;
      };
      const { data, error } = await browserClient.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: getURL(),
        },
      });
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      throw error;
    }
  },

  checkEmailExists: async (email: string) => {
    try {
      const { data, error } = await browserClient
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
      const { data, error } = await browserClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

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
