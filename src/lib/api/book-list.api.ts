import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list';

export const fetchGetBookListByTop50Rank = async () => {
  //베스트랭킹50개 책 목록을 가져옴(supabase 메서드로 리펙터링 예정)
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

  //가져온 데이터 랭킹순으로 오름차순 정렬
  data.sort((a, b) => a.best_rank - b.best_rank);

  return data;
};

export const fetchGetGenreList = async () => {
  'use server';
  //장르데이터 가져오기
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/genres?select=genre`,
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

  //장르 데이터 문자열 배열로 변환 ['만화','자기계발',...]
  const genreList = data.map((genreObj) => genreObj.genre);

  return genreList;
};
