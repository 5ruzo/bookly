'use client';

import { fetchGetBookListByTop50Rank } from '@/lib/api/book-list.api';
import { useEffect, useState } from 'react';
import BookListItem from '../book-list/book-list-item';

export default function SearchResultView() {
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    fetchGetBookListByTop50Rank().then((data) => {
      setBookList(data);
    });
  }, []);

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
