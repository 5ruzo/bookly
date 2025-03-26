import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { BookItem } from '@/types/book-list.type';
import {
  formatNumberWithCommas,
  normalizedRating,
} from '@/lib/utils/common.util';
export default function BookListItem({
  id,
  title,
  author,
  rating,
  price,
  description,
  image_url,
}: BookItem) {
  return (
    <li className='p-24 lg:px-0 border-b border-gray last:border-none'>
      <Link href={`/detail/${id}`}>
        <div className='w-auto flex lg:gap-16 lg:flex-row flex-col items-center lg:items-start'>
          <img
            src={image_url}
            alt={`${title}의 표지 이미지`}
            className='lg:w-[280px] lg:h-[406px] max-w-[280px] max-h-[406px] w-[60%] object-contain'
          />
          <div className='flex flex-col lg:ml-[72px]'>
            <h5 className='text-lg lg:text-2xl lg:mt-[46px] line-clamp-1 max-w-[566px] mt-3'>
              {title}
            </h5>
            <dl>
              <dt className='sr-only'>저자</dt>
              <dd className='text-lg lg:text-lg text-gray mt-[6px]'>
                {author}
              </dd>

              <div className='flex justify-between lg:flex-col'>
                <dt className='sr-only'>평점</dt>
                <dd className='text-lg mt-[6px]'>
                  <span className='flex'>
                    <Star
                      size='25'
                      className='text-yellow-400 fill-yellow-400 mt-[2px] mr-[2px]'
                    />
                    {normalizedRating(rating)}
                  </span>
                </dd>

                <dt className='sr-only'>가격</dt>
                <dd className='text-2xl lg:mt-[60px]'>
                  {formatNumberWithCommas(+price)}원
                </dd>
              </div>
              <dt className='sr-only'>책 소개</dt>
              <dd className='lg:text-xl text-gray line-clamp-2 max-w-[566px]'>
                {description}
              </dd>
            </dl>
          </div>
        </div>
      </Link>
    </li>
  );
}
