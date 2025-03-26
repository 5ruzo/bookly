import {
  formatNumberWithCommas,
  normalizedRating,
} from '@/lib/utils/common.util';
import useCartStore from '@/store/cart-store';
import { CardForCarousel } from '@/types/common.type';
import { ShoppingCart, Star } from 'lucide-react';

function BookCard({
  id,
  image_url,
  title,
  rating,
  author,
  description,
  price,
}: CardForCarousel) {
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    addToCart([
      {
        id,
        quantity: 1,
        price: Number(price),
        bookInfo: {
          image_url,
          title,
          author,
        },
      },
    ]);
    window.alert('장바구니에 추가되었습니다.');
  };
  return (
    <div className='border-[1px] border-lightgray rounded-md overflow-hidden pb-4'>
      <div className='relative w-full max-w-1/3 aspect-square overflow-hidden'>
        <img
          src={image_url}
          alt={title}
          className='absolute object-cover object-top'
        />
      </div>
      <div className='flex flex-col gap-2 mt-2 px-4'>
        <span className='flex items-center text-md gap-1'>
          <Star className='w-5' fill='#FACC15' stroke='none' />
          {normalizedRating(rating)}
        </span>
        <span className='font-semibold text-md block w-full overflow-hidden text-ellipsis whitespace-nowrap'>
          {title}
        </span>
        <span className='text-sm text-gray overflow-hidden text-ellipsis whitespace-nowrap'>
          {author}
        </span>
        <div className='h-12'>
          <p className='text-md text-gray line-clamp-2 break-words text-ellipsis overflow-hidden'>
            {description}
          </p>
        </div>
        <span className='text-md font-semibold'>
          {formatNumberWithCommas(Number(price))}원
        </span>
        <button
          className='flex justify-center gap-1 items-center mt-1 text-sm md:text-md bg-black text-white-dark py-1 rounded-md'
          onClick={handleAddToCart}
        >
          <ShoppingCart fill='var(--color-white-dark)' className='w-4' />
          장바구니에 담기
        </button>
      </div>
    </div>
  );
}

export default BookCard;
