'use client';

import BookCard from '@/components/ui/book-card';
import { Button } from '@/components/ui/button';
import { useGetLikeListQuery } from '@/lib/queries/use-get-like-list-query';
import { useAuthStore } from '@/store/use-auth-store';
import Link from 'next/link';

export default function LikeListArea() {
  const userId = useAuthStore((state) => state.user?.id);

  const { data, isLoading, isError } = useGetLikeListQuery(userId as string);

  if (isLoading) {
    return <div className='text-center pb-6'>로딩 중...</div>;
  }

  if (!userId) {
    return (
      <div className='text-center pb-6'>
        <Link href={'/auth/sign-in'}>
          <Button>로그인으로 가기</Button>
        </Link>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-red-500 text-center pb-6'>찜 목록 가져오기 실패</div>
    );
  }

  return (
    <>
      {data?.length !== 0 ? (
        <div className='grid gap-6 grid-cols-3'>
          {data?.map((book) => (
            <BookCard
              key={book.book_id}
              id={book.book_id}
              image_url={book.book.image_url}
              title={book.book.title}
              rating={book.book.rating}
              author={book.book.author}
              description={book.book.description}
              price={book.book.price}
            />
          ))}
        </div>
      ) : (
        <div className='text-mlg text-gray text-center pb-6'>
          찜 내역이 없습니다.
        </div>
      )}
    </>
  );
}
