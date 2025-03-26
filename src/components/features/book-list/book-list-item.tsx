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
    <li className='p-10 lg:px-0 border-b border-gray last:border-none'>
      <Link href={`/detail/${id}`}>
        <div className='w-auto flex lg:gap-16 lg:flex-row flex-col lg:items-start h-full'>
          <img
            src={image_url}
            alt={`${title}의 표지 이미지`}
            className='lg:w-[140px] w-[110px] object-contain'
          />
          <div className='flex flex-col justify-center h-[200px]'>
            <h5 className='text-md lg:text-mlg lg:mt-0 line-clamp-1 max-w-[566px] mt-3'>
              {title}
            </h5>
            <dl>
              <dt className='sr-only'>저자</dt>
              <dd className='text-md lg:text-md max-w-[566px] text-gray mt-[6px]'>
                {author}
              </dd>

              <div className='flex justify-between lg:flex-col'>
                <dt className='sr-only'>평점</dt>
                <dd className='text-md mt-[6px]'>
                  <span className='flex items-center'>
                    <Star
                      size='16'
                      className='text-yellow-400 fill-yellow-400 mt-[2px] mr-[2px]'
                    />
                    <span className='text-gray pt-[3px]'>
                      {normalizedRating(rating)}
                    </span>
                  </span>
                </dd>

                <dt className='sr-only'>가격</dt>
                <dd className='text-md lg:mt-[10px] mt-[2px]'>
                  {formatNumberWithCommas(+price)}원
                </dd>
              </div>
              <dt className='sr-only'>책 소개</dt>
              <dd className='lg:text-md text-sm text-gray line-clamp-2 max-w-[566px] mt-[10px]'>
                {description}
              </dd>
            </dl>
          </div>
        </div>
      </Link>
    </li>
  );
}
