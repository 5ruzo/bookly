'use client';

import { useEffect, useState } from 'react';
import BookListItem from '../book-list/book-list-item';
import { fetchGetSearchedBookList } from '@/lib/api/search.api';
import { useSearchParams } from 'next/navigation';

export default function SearchResultView() {
  const [bookList, setBookList] = useState<Book[]>([]);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');

  useEffect(() => {
    if (searchTerm) {
      fetchGetSearchedBookList(searchTerm).then((data) => {
        setBookList(data);
      });
    }
  }, [searchTerm]);

  return (
    <ul className='flex flex-col gap-[70px]'>
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
