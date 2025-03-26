import browserClient from '../utils/supabase/client';

export const authService = {
  signUp: async (email: string, password: string, phone: string) => {
    const { data, error } = await browserClient.auth.signUp({
      email,
      password,
      options: { data: { phone } },
    });

    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await browserClient.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  },

  signOut: async () => {
    const { error } = await browserClient.auth.signOut();
    localStorage.removeItem('rememberMe');

    if (error) throw error;
  },

  signInWithKakao: async () => {
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

    const { error } = await browserClient.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: getURL(),
      },
    });

    if (error) throw error;
  },

  checkEmailExists: async (email: string) => {
    const { data, error } = await browserClient
      .from('users')
      .select('email')
      .eq('email', email);

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data!.length > 0;
  },

  resetPassword: async (email: string) => {
    const { data, error } = await browserClient.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    return { data, error };
  },

  verifyPhone: async (phone: string) => {
    return true;
  },
};
