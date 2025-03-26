'use client';

import BookCard from '@/components/ui/book-card';
import { Button } from '@/components/ui/button';
import { fetchGetLikeList } from '@/lib/api/my-page.api';
import { useAuthStore } from '@/store/use-auth-store';
import type { LikeList } from '@/types/my-page.type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LikeListArea() {
  const [likeList, setLikeList] = useState<LikeList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error('login');
        }

        const data = await fetchGetLikeList(userId);
        setLikeList(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'fail');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div className='text-center pb-6'>로딩 중...</div>;
  }

  if (error === 'login') {
    return (
      <div className='text-center pb-6'>
        <Link href={'/auth/sign-in'}>
          <Button>로그인으로 가기</Button>
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-500 text-center pb-6'>찜 목록 가져오기 실패</div>
    );
  }

  return (
    <>
      {likeList.length !== 0 ? (
        <div className='grid gap-6 grid-cols-3'>
          {likeList.map((book) => (
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
