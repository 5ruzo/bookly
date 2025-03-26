import { API_KEY, SUPABASE_URL } from '@/constants/detail.constans';
import { BookList } from '@/types/detail.type';

export const fetchGetDetail = async (bookId: string) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/books?id=eq.${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      apikey: API_KEY || '',
    },
  });

  const data: BookList = await res.json();

  return data[0];
};

export const fetchGetLikeThisBook = async (
  userId: string | undefined,
  bookId: number
) => {
  if (!userId) return;
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/likes?book_id=eq.${bookId}&user_id=eq.${userId}`,
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

  return data[0];
};
