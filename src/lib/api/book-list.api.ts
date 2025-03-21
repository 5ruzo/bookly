import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list';

export const fetchGetBookListByTop50Rank = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/books?best_rank=lte.50`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
      next: {
        revalidate: BOOK_LIST_REVALIDATE_TIME,
      },
    }
  );

  const data: Book[] = await res.json();

  console.log(data);
  data.sort((a, b) => a.best_rank - b.best_rank);

  return data;
};
