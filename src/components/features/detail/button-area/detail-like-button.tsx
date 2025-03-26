'use client';

import { Heart } from 'lucide-react';
import { LikeButtonProps } from '@/types/detail.type';
import {
  fetchCreateLikeThisBook,
  fetchDeleteLikeThisBook,
} from '@/lib/api/detail.api';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function LikeButton({
  userId,
  id,
  like,
  setLike,
}: LikeButtonProps) {
  const router = useRouter();

  const handleLike = (like: boolean) => {
    if (!userId) {
      return Swal.fire({
        text: '먼저 로그인을 해주세요.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#71717a',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace('/auth/sign-in');
        }
      });
    }

    if (like) {
      fetchDeleteLikeThisBook(userId, id).then(() =>
        Swal.fire({
          title: '찜 해제!',
          text: '찜 목록에서 삭제 되었습니다.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
        })
      );
    }

    if (!like) {
      fetchCreateLikeThisBook(userId, id).then(() =>
        Swal.fire({
          title: '찜!',
          text: '찜 목록에 추가 되었습니다.',
          icon: 'info',
          confirmButtonColor: '#3085d6',
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
