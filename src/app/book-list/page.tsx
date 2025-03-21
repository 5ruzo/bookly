import BookListItem from '@/components/features/book-list/book-list-item';
import { fetchGetBookListByTop50Rank } from '@/lib/api/book-list.api';
import React from 'react';

export default async function BookListPage() {
  const booksArray = await fetchGetBookListByTop50Rank();

  return (
    <ul>
      {booksArray.map((book) => {
        return (
          <BookListItem
            key={book.id}
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
