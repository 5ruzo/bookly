import { LibraryBigIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

export default function EmptyCart() {
  return (
    <section className='text-center h-[50dvh] flex flex-col items-center justify-center'>
      <ShoppingCartIcon size={100} />
      <h4 className='font-semibold text-lg my-5'>장바구니가 비어있어요 🥲</h4>
      <div className='w-1/2 sm:w-1/4'>
        <Link
          href='book-list/best'
          className='w-full text-[16px] bg-primary text-white-light flex justify-center item-center py-2 rounded-lg'
        >
          <LibraryBigIcon />책 담으러 가기
        </Link>
      </div>
    </section>
  );
}
