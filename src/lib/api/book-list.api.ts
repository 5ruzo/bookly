'use server';
//서버엑션의 폴더 네이밍에 대한 합의가 되지 않아 월요일 스크럼때 대화 나눠보고 서버액션파일 따로 빼겠습니다.

import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list.constant';

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

  //에러발생시
  if ('message' in data) throw data;

  //가져온 데이터 랭킹순으로 오름차순 정렬
  data.sort((a, b) => a.best_rank - b.best_rank);

  return data;
};

export const fetchGetBookListByGenre = async (genre: string) => {
  //인자의 장르와 일치하는 책 목록 가져옴(목데이터 수가 적어 일단 전부 가져오게 처리 목테이터수 많아지면 50개만 가져오는걸로 변경예정)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/books?genre=eq.${genre}`,
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

  //에러발생시
  if ('message' in data) throw data;

  //가져온 데이터 랭킹순으로 오름차순 정렬
  data.sort((a, b) => a.best_rank - b.best_rank);

  return data;
};

export const fetchGetGenreList = async () => {
  //장르데이터 가져오기 하루마다 수파베이스에 요청

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

  //에러발생시
  if ('message' in data) throw data;

  //장르 데이터 문자열 배열로 변환 ['만화','자기계발',...]
  const genreList = data.map((genreObj) => genreObj.genre);

  return genreList;
};
