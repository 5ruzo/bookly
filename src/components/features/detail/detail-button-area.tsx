'use client';

import { Button } from '@/components/ui/button';
import LikeButton from './button-area/detail-like-button';
import { ButtonAreaProps } from '@/types/detail.type';
import useCartStore from '@/store/cart-store';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function ButtonArea({
  userId,
  id,
  like,
  setLike,
  title,
  author,
  image_url,
  price,
  quantity,
}: ButtonAreaProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  return (
    <div className='flex flex-wrap gap-4 place-content-between justify-start md:gap-10'>
      <Button
        className='bg-primary hover:bg-primary text-white rounded-xl h-12 md:h-14 px-6 w-4/10 text-md md:text-mlg font-medium'
        onClick={() => {
          if (!userId) {
            Swal.fire({
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
          } else {
            addToCart([
              {
                id: id,
                bookInfo: {
                  title: `${title}`,
                  author: `${author}`,
                  image_url: `${image_url}`,
                },
                quantity,
                price: Number(price),
              },
            ]);
            Swal.fire({
              text: `장바구니에 ${title} 을/를 ${quantity}개 담으시겠습니까?`,
              icon: 'question',
              confirmButtonColor: '#3085d6',
            });
          }
        }}
      >
        장바구니 담기
      </Button>
      <LikeButton userId={userId} id={id} like={like} setLike={setLike} />
    </div>
  );
}
