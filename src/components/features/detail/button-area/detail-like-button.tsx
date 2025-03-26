'use client';

import { Heart } from 'lucide-react';
import { LikeButtonProps } from '@/types/detail.type';
import {
  fetchCreateLikeThisBook,
  fetchDeleteLikeThisBook,
} from '@/lib/api/detail.api';

export default function LikeButton({
  user,
  id,
  like,
  setLike,
}: LikeButtonProps) {
  const handleLike = (like: boolean) => {
    if (!user) return alert('로그인을 해주세요!');

    if (like) {
      fetchDeleteLikeThisBook(user.id, id);
      alert('찜 해제!');
    }

    if (!like) {
      fetchCreateLikeThisBook(user.id, id);
      alert('찜 해제!');
    }

    setLike(!like);
  };

  return (
    <button
      className={`${like ? 'text-red-500 border-primary' : 'text-primary border-primary'} focus:outline-none border-[1px] rounded-xl h-12 w-12 md:h-14 md:w-14 p-0 flex items-center justify-center`}
      onClick={() => {
        handleLike(like);
      }}
    >
      <Heart
        size={24}
        strokeWidth={1}
        className={` ${like ? 'fill-red-500' : ''}`}
      />
      <span className='sr-only'>좋아요</span>
    </button>
  );
}
