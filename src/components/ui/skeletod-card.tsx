import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3 '>
      <Skeleton className='h-[125px] w-[250px] rounded-xl bg-lightgray' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px] bg-lightgray' />
        <Skeleton className='h-4 w-[200px] bg-lightgray' />
      </div>
    </div>
  );
}
