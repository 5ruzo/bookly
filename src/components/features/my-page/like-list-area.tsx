'use client';

import BookCard from '@/components/ui/book-card';
import { fetchGetLikeList } from '@/lib/api/my-page.api';
import { useAuthStore } from '@/store/use-auth-store';
import type { LikeList } from '@/types/my-page.type';
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
          throw new Error('로그인을 해주세요!');
        }

        const data = await fetchGetLikeList(userId);
        setLikeList(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '찜 목록을 가져오기 실패!'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // userId 변경 시 재요청

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
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
  );
}
