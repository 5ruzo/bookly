'use client';
import { ProductInfoProps } from '@/types/detail.type';
import { Rating } from './detail-rating';
import ButtonArea from './detail-button-area';
import { useState } from 'react';
import QuantityInput from './detail-quantity-input';
import { formatNumberWithCommas } from '@/lib/utils/common.util';

export default function ProductInfo({ data, price }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  // 수령 예상일 계산을 위한 기본값
  const timestamp = Date.now();
  const date = new Date(timestamp);

  return (
    <div className='content-center'>
      <div className='flex gap-3 md:gap-16 h-[300px] md:h-3/5 w-full'>
        <div className='grid text-md md:text-lg content-around'>
          <h2>가격</h2>
          <h2>배송료</h2>
          <h2>수령 예상일</h2>
          <h2>평점</h2>
          <h2>수량</h2>
        </div>
        <div className='grid text-md md:text-lg content-around'>
          <p>{formatNumberWithCommas(Number(data.price))}원</p>
          <div>
            <span>3,000원</span>
            <span className='text-md text-gray'>(제주도 6,000원)</span>
          </div>
          <p>
            {/* 오늘을 기준으로 3일 이후 */}
            {new Date(date.setDate(date.getDate() + 3)).toLocaleDateString()}
          </p>
          <div className='h-4 md:h-full'>
            <Rating rating={data.rating} />
            <span className='sr-only'>별점 {data.rating}점</span>
          </div>
          <QuantityInput
            value={quantity}
            onChange={setQuantity}
            price={price}
          />
        </div>
      </div>
      <div className='mt-4 md:mt-16'>
        <ButtonArea title={data.title} price={data.price} quantity={quantity} />
      </div>
    </div>
  );
}
