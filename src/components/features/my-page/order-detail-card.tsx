import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { isMoreThanThreeDaysAgo, truncateText } from '@/lib/utils/my-page.util';
import { OrderDetailCardProps } from '@/types/my-page.type';
import Link from 'next/link';

export default function OrderDetailCard({
  id,
  book_id,
  image_url,
  title,
  author,
  arrived,
  price,
  quantity,
}: OrderDetailCardProps) {
  return (
    <div className='m-6 flex text-ss md:text-md items-center justify-between'>
      <div className='flex items-center gap-6'>
        <div className='relative w-32 border'>
          <img
            className='h-full w-full object-cover'
            src={image_url}
            alt={title}
          />
        </div>
        <div className='flex flex-col'>
          <h3>
            <Link href={`/detail/${book_id}`}>{truncateText(title)}</Link>
          </h3>
          <p>{truncateText(author)}</p>
          <p>{formatNumberWithCommas(Number(price))}원</p>
        </div>
      </div>
      <div className='text-right justify-items-center'>
        <p>
          {isMoreThanThreeDaysAgo(arrived) ? (
            <span className='text-primary'>배송 완료</span>
          ) : (
            <span className='text-red-500'>배송 중</span>
          )}
        </p>
        <p>{quantity}개</p>
        <p className='break-keep'>
          {formatNumberWithCommas(Number(price) * quantity)}원
        </p>
      </div>
    </div>
  );
}
