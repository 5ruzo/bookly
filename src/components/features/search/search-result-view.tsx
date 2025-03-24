'use client';

import { useEffect, useState } from 'react';
import BookListItem from '../book-list/book-list-item';
import { fetchGetSearchedBookList } from '@/lib/api/search.api';
import { useSearchParams } from 'next/navigation';
import { useGetBooksBySearchTerm } from '@/lib/queries/use-get-books-by-search-term.query';
import SearchLoading from '@/app/search/loading';

export default function SearchResultView() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');

  const {
    data: bookList,
    isPending,
    error, // 에러시 에러 페이지 만든다음 에러페이지로 이동시키기
  } = useGetBooksBySearchTerm(searchTerm as string);

  if (isPending) {
    return <SearchLoading />;
  }

  return (
    <ul className='flex flex-col gap-[70px]'>
      {bookList?.map((book) => {
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
