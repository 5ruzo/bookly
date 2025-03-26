import BookListItem from '@/components/features/book-list/book-list-item';
import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list.constant';
import { fetchGetBookListByTop30Rank } from '@/lib/api/book-list.api';
import { Metadata } from 'next';
import React from 'react';

export const revalidate = BOOK_LIST_REVALIDATE_TIME;

export const metadata: Metadata = {
  title: '베스트셀러 인기있는 책 목록 - Bookly에서 인기있는 책 찾아보기',
  description: 'Bookly에서 베스트셀러, 인기있는 책 목록을 확인하세요.',

  openGraph: {
    title: 'Bookly - 베스트셀러, 인기있는 책',
    description: 'Bookly에서 베스트셀러, 인기있는 책 목록을 확인하세요.',
    images: '/images/logo.png',
  },
};

export default async function BookListBestPage() {
  const bookList = await fetchGetBookListByTop30Rank();

  return (
    <ul className='min-h-[calc(100vh-16rem)] flex flex-col'>
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
