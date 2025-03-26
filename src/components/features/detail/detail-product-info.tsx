'use client';

import { ProductInfoProps } from '@/types/detail.type';
import { Rating } from './detail-rating';
import ButtonArea from './detail-button-area';
import { useEffect, useState } from 'react';
import QuantityInput from './detail-quantity-input';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { fetchGetLikeThisBook } from '@/lib/api/detail.api';
import { useAuthStore } from '@/store/use-auth-store';

export default function ProductInfo({ data }: ProductInfoProps) {
  const userId = useAuthStore((state) => state.user?.id);

  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const userLikeThis = async () => {
      const res = await fetchGetLikeThisBook(userId, data.id);
      if (res?.book_id !== data.id) return;
      setLike(true);
    };

    userLikeThis();
  }, [userId]);

  // 수령 예상일 계산을 위한 기본값
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const infos = ['가격', '배송료', '수령 예상일', '평점', '수량'];

  return (
    <div className='content-center'>
      <div className='flex md:gap-16 h-[300px] md:h-3/5 w-full place-content-between'>
        <div className='flex flex-col text-md md:text-lg content-around'>
          {infos.map((item) => (
            <h2 key={item} className='h-1/5 content-center'>
              {item}
            </h2>
          ))}
        </div>
        <div className='flex flex-col text-md md:text-mlg content-around'>
          <p className='h-1/5 content-center'>
            {formatNumberWithCommas(Number(data.price))}원
          </p>
          <div className='h-1/5 content-center'>
            <span>3,000원</span>
            <span className='text-md text-gray'>(제주도 6,000원)</span>
          </div>
          <p className='h-1/5 content-center'>
            {/* 오늘을 기준으로 3일 이후 */}
            {new Date(date.setDate(date.getDate() + 3)).toLocaleDateString()}
          </p>
          <div className='h-1/5 content-center'>
            <Rating rating={data.rating} />
            <span className='sr-only'>별점 {data.rating}점</span>
          </div>
          <QuantityInput
            value={quantity}
            onChange={setQuantity}
            price={data.price}
          />
        </div>
      </div>
      <div className='mt-4 md:mt-16'>
        <ButtonArea
          userId={userId}
          like={like}
          setLike={setLike}
          id={data.id}
          title={data.title}
          price={data.price}
          author={data.author}
          image_url={data.image_url}
          quantity={quantity}
        />
      </div>
    </div>
  );
}
