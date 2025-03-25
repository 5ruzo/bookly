'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import useCartStore from '@/store/cart/cart-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartTable from './cart-table/cart-table';
import EmptyCart from './empty-cart';
import PriceSummary from './price-summary';

export default function Cart() {
  const {
    cartBooks,
    checkedBooks,
    checkAllBooks,
    resetCheckedBooks,
    deleteBooks,
  } = useCartStore();
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    if (checkedBooks.length === cartBooks.length) setIsAllChecked(true);
    else setIsAllChecked(false);
  }, [checkedBooks]);

  const handleCheckAll = () => {
    const checkedIds = cartBooks.map(({ id }) => id);
    if (!isAllChecked) {
      checkAllBooks(checkedIds);
    } else resetCheckedBooks();
  };

  const handleDelete = () => {
    deleteBooks(checkedBooks);
  };

  if (cartBooks.length === 0) return <EmptyCart />;
  return (
    <div className='mx-auto w-[80%] max-w-[1128px]'>
      <div className='flex items-center mb-3'>
        <label className='mr-auto flex items-center' htmlFor='check-all'>
          <Checkbox
            id='check-all'
            className='mr-2'
            checked={isAllChecked}
            onCheckedChange={handleCheckAll}
          />
          전체 선택/해제
        </label>
        <Button className='px-4 py-1 rounded-2xl' onClick={handleDelete}>
          선택 삭제
        </Button>
      </div>
      <CartTable />
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
