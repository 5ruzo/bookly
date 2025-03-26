import BookCard from '@/components/ui/book-card';
import { fetchGetLikeList } from '@/lib/api/detail.api';
import type { LikeList } from '@/types/detail.type';
import { ChevronRight } from 'lucide-react';

// supabase 데이터 추가되면 불러오는 로직 추가

export default async function LikeList() {
  const test: LikeList[] = await fetchGetLikeList(
    '644780c4-7283-417e-8c18-b1cb1b96a669'
  );

  console.log('test', test);

  return (
    <div className='flex-1 min-w-[400px] max-w-[1000px]'>
      <div className='mb-6'>
        <h3 className='flex items-center text-lg font-medium'>
          <span className='mr-2'>
            <ChevronRight />
          </span>{' '}
          찜목록
        </h3>
      </div>

      <div className='grid gap-6 grid-cols-3'>
        {test.map((book) => (
          <BookCard
            key={book.book_id}
            id={book.book_id}
            image_url={book.book.image_url}
            title={book.book.title}
            rating={book.book.rating}
            author={book.book.author}
            description={book.book.description}
            price={book.book.price}
          />
        ))}
      </div>
    </div>
  );
}
