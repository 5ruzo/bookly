'use client';

import { Button } from '@/components/ui/button';
import LikeButton from './manipulation-area/detail-like-button';
import { ButtonAreaProps } from '@/types/detail.type';

export default function ButtonArea({
  title,
  price,
  quantity,
}: ButtonAreaProps) {
  const totalPrice = Number(price) * quantity;
  return (
    <div className='flex flex-wrap gap-4'>
      <Button
        className='bg-primary hover:bg-primary text-white rounded-xl h-12 md:h-14 px-6 w-4/10 text-md md:text-lg font-medium'
        onClick={() => {
          alert(
            `장바구니에 ${title} 을/를 ${quantity}개 담으시겠습니까? 총  ${totalPrice}`
          );
        }}
      >
        장바구니 담기
      </Button>
      <div className='flex gap-4'>
        <Button
          variant='outline'
          className='text-primary border-primary hover:bg-lightgray rounded-xl h-12 md:h-14 px-6 w-4/10 text-md md:text-lg font-medium'
          onClick={() => {
            alert(`${title} 을/를 ${quantity}개 구매 하시겠습니까?`);
          }}
        >
          바로구매
        </Button>

        <LikeButton />
      </div>
    </div>
  );
}
