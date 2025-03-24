import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list';
import React from 'react';

export const revalidate = BOOK_LIST_REVALIDATE_TIME;

export default async function BookListGenrePage() {
  return (
    <div className='w-[918px] h-[1500px] bg-gray animate-pulse rounded'>
      <span className='text-white text-2xl'>테스트</span>
    </div>
  );
}
