import BookListItem from '@/components/features/book-list/book-list-item';
import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list.constant';
import {
  fetchGetBookListByLatest30,
  fetchGetBookListByTop30Rank,
} from '@/lib/api/book-list.api';
import { Metadata } from 'next';
import React from 'react';

export const revalidate = BOOK_LIST_REVALIDATE_TIME;

export const metadata: Metadata = {
  title: '최신 책 목록 - Bookly에서 최신 책 찾아보기',
  description: 'Bookly에서 베스트셀러, 최근에 발매된 책 목록을 확인하세요.',

  openGraph: {
    title: 'Bookly - 신상 책, 최근에 나온 책',
    description: 'Bookly에서 베스트셀러, 최근에 발매된 책 목록을 확인하세요.',
    images: '/images/logo.png',
  },
};

export default async function BookListNewPage() {
  const bookList = await fetchGetBookListByLatest30();
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
