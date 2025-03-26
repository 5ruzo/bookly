export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const QUERY_KEYS = {
  ORDER_DETAILS: (userId: string) => ['orderDetails', userId ?? 'no-user'],
  LIKE_LIST: (userId: string) => ['likeList', userId ?? 'no-user'],
};
