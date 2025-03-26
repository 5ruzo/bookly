'use client';

import { Button } from '@/components/ui/button';
import LikeButton from './button-area/detail-like-button';
import { ButtonAreaProps } from '@/types/detail.type';
import useCartStore from '@/store/cart-store';

export default function ButtonArea({
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

  return (
    <div className='flex flex-wrap gap-4 place-content-between justify-start md:gap-10'>
      <Button
        className='bg-primary hover:bg-primary text-white rounded-xl h-12 md:h-14 px-6 w-4/10 text-md md:text-mlg font-medium'
        onClick={() => {
          addToCart([
            {
              id: id,
              bookInfo: {
                title: `${title}`,
                author: `${author}`,
                image_url: `${image_url}`,
              },
              quantity: 1,
              price: Number(price),
            },
          ]);
          alert(`장바구니에 ${title} 을/를 ${quantity}개 담으시겠습니까?`);
        }}
      >
        장바구니 담기
      </Button>
      <LikeButton id={id} like={like} setLike={setLike} />
    </div>
  );
}
