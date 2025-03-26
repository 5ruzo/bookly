'use client';

import { Heart } from 'lucide-react';
import { LikeButtonProps } from '@/types/detail.type';
import {
  fetchCreateLikeThisBook,
  fetchDeleteLikeThisBook,
} from '@/lib/api/detail.api';
import Swal from 'sweetalert2';

export default function LikeButton({
  userId,
  id,
  like,
  setLike,
}: LikeButtonProps) {
  const handleLike = (like: boolean) => {
    if (!userId) {
      return Swal.fire({
        title: '로그인을 해주세요!',
        text: '로그인이 필요한 서비스입니다.',
        icon: 'error',
      });
    }

    if (like) {
      fetchDeleteLikeThisBook(userId, id).then(() =>
        Swal.fire({
          title: '찜 해제!',
          text: '찜 목록에서 삭제 되었습니다.',
          icon: 'info',
        })
      );
    }

    if (!like) {
      fetchCreateLikeThisBook(userId, id).then(() =>
        Swal.fire({
          title: '찜!',
          text: '찜 목록에 추가 되었습니다.',
          icon: 'info',
        })
      );
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
