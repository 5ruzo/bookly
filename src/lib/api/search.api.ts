import { Book } from '@/types/book-list.type';

export const fetchGetSearchedBookList = async (
  queryKey: (string | object)[]
) => {
  //검색어
  const searchTerm = queryKey[0];

  //옵션(장르)이 포함되어 있으면 쿼리문에 장르추가
  let genreQuery = '';
  if (queryKey[1]) {
    const genres = Object.values(queryKey[1]).join(',');
    genreQuery = `&genre=in.(${genres})`;
  }

  const queryString = `books?title=like.%25${searchTerm}%25${genreQuery}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    }
  );

  const data: Book[] = await res.json();

  return data;
};
