import BookListItem from '@/components/features/book-list/book-list-item';
import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list.constant';
import {
  fetchGetBookListByGenre,
  fetchGetGenreList,
} from '@/lib/api/book-list.api';
import { notFound } from 'next/navigation';
import React from 'react';

export const revalidate = BOOK_LIST_REVALIDATE_TIME;

export async function generateStaticParams() {
  // 장르 배열을 가져오는 함수
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

  // 장르목록에 없으면 notFound페이지로
  const genreList = await fetchGetGenreList();
  if (!genreList.includes(genre)) {
    notFound();
  }

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
  const genre = decodeURIComponent(params.genre as string).replace(/-/g, '/');

  const bookList = await fetchGetBookListByGenre(genre);

  return (
    <ul className='min-h-[calc(100vh-24rem)] flex flex-col'>
      {bookList.map((book) => {
        return (
          <BookListItem
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            price={book.price}
            description={book.description}
            image_url={book.image_url}
          />
        );
      })}
    </ul>
  );
}
