import { TypeBookSummary } from '@/types/cart/cart.type';
import Image from 'next/image';

type BookSummaryProps = {
  book: TypeBookSummary;
};

export default function BookSummary({ book }: BookSummaryProps) {
  return (
    <dl className='flex items-center w-full sm:w-1/2 py-4'>
      <dt className='sr-only'>책 이미지</dt>
      <dd className='flex-shrink-0'>
        <Image
          src={book.image_url}
          alt={book.title}
          width={60}
          height={80}
          className='object-cover'
        />
      </dd>
      <div className='ml-4'>
        <dt className='sr-only'>책 제목</dt>
        <dd className='break-keep'>{book.title}</dd>
        <dt className='sr-only'>저자</dt>
        <dd className='mt-1'>{book.author}</dd>
      </div>
    </dl>
  );
}
