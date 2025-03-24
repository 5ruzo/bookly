import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list';
import { fetchGetGenreList } from '@/lib/api/book-list.api';
import React from 'react';

export const revalidate = BOOK_LIST_REVALIDATE_TIME;

export async function generateStaticParams() {
  // 장르 배열을 가져오는 함수 (API 호출이나 데이터 소스에서)
  const genreList = await fetchGetGenreList();

  // URL 경로에 맞게 포맷팅 (예: '/' -> '-' 변환)
  return genreList.map((genre) => ({
    genre: genre.replace(/\//g, '-'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { genre: string };
}) {
  // URL 파라미터에서 장르 추출 및 포맷팅 복원
  const genre = decodeURIComponent(params.genre as string).replace(/-/g, '/');

  return {
    title: `'${genre}' 장르의 인기있는 책 목록 - Bookly에서 인기있는 책 찾아보기`,
    description: `Bookly에서 '${genre}' 장르의 인기있는 책 목록을 확인하세요.`,

    openGraph: {
      title: `Bookly - '${genre}'장르의 인기있는 책`,
      description: `Bookly에서 '${genre}' 장르의 인기있는 책 목록을 확인하세요.`,
      images: '/images/logo.png',
    },
  };
}

export default async function BookListGenrePage({
  params,
}: {
  params: { genre: string };
}) {
  const genreFromPath = decodeURIComponent(params.genre as string);

  return (
    <div className='w-[918px] h-[1500px] bg-gray animate-pulse rounded'>
      <span className='text-white text-2xl'>{genreFromPath}</span>
    </div>
  );
}
