import LikeListArea from '@/components/features/my-page/like-list-area';
import type { LikeList } from '@/types/my-page.type';
import { ChevronRight } from 'lucide-react';

export default async function LikeList() {
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

      <LikeListArea />
    </div>
  );
}
