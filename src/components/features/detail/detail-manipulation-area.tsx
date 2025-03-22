'use client';

import { Button } from '@/components/ui/button';
import QuantityInput from './manipulation-area/detail-quantity-input';
import LikeButton from './manipulation-area/detail-like-button';
import { useState } from 'react';
import { ManipulationAreaProps } from '@/types/detail.type';

export default function ManipulationArea({ bookId }: ManipulationAreaProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <p>수량 :</p>
      <QuantityInput value={quantity} onChange={setQuantity} />
      <div className='flex flex-wrap gap-4'>
        <Button
          className='bg-primary hover:bg-primary text-white rounded-xl h-14 px-6 min-w-[180px] text-lg font-medium'
          onClick={() => {
            alert(`장바구니에 ${bookId} 을/를 ${quantity}개 담으시겠습니까?`);
          }}
        >
          장바구니 담기
        </Button>

        <Button
          variant='outline'
          className='text-primary border-primary hover:bg-lightgray rounded-xl h-14 px-6 min-w-[140px] text-lg font-medium'
          onClick={() => {
            alert(`${bookId} 을/를 ${quantity}개 구매 하시겠습니까?`);
          }}
        >
          바로구매
        </Button>

        <LikeButton />
      </div>
    </div>
  );
}
