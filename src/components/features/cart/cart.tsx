'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { TypeCartItem } from '@/types/cart/cart.type';
import CartTable from './cart-table';
import EmptyCart from './empty-cart';
import PriceSummary from './price-summary';
import Link from 'next/link';

const MOCK_DATA: TypeCartItem[] = new Array(3).fill({
  id: crypto.randomUUID(),
  bookInfo: {
    title: '어쩌고저쩌고책',
    author: '누군가',
    image_url:
      'https://image.aladin.co.kr/product/36042/18/cover500/k062037848_1.jpg',
  },
  quantity: 2,
  price: 5000,
});

export default function Cart() {
  if (MOCK_DATA.length === 0) return <EmptyCart />;
  return (
    <div className='mx-auto w-[80%] max-w-[1128px]'>
      <div className='flex items-center mb-3'>
        <label className='mr-auto flex items-center'>
          <Checkbox className='mr-2' />
          전체 선택/해제
        </label>
        <Button className='px-4 py-1 rounded-2xl'>선택 삭제</Button>
      </div>

      <CartTable cartBookList={MOCK_DATA} />

      <PriceSummary />

      <Link
        href='/order'
        className='block w-full sm:w-[60%] mx-auto py-3 font-semibold bg-primary text-white-light text-center rounded-xl'
      >
        주문하기
      </Link>
    </div>
  );
}
