import { API_KEY, SUPABASE_URL } from '@/constants/detail.constans';

export const fetchGetLikeList = async (userId: string | undefined) => {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/likes?user_id=eq.${userId}&select=*,book:books(*)`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        apikey: API_KEY || '',
      },
    }
  );

  const data = await res.json();

  return data;
};
