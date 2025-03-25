import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { BookItem } from '@/types/book-list.type';
export default function BookListItem({
  id,
  title,
  author,
  rating,
  price,
  description,
  image_url,
}: BookItem) {
  price = new Intl.NumberFormat().format(+price);

  return (
    <li className='p-10 md:p-0'>
      <Link href={`/detail/${id}`}>
        <div className='max-w-[1000px] flex md:gap-16 md:flex-row flex-col items-center md:items-start'>
          <img
            src={image_url}
            alt={`${title}의 표지 이미지`}
            className='md:w-[280px] md:h-[406px] w-[60%] object-contain'
          />
          <div className='flex flex-col md:ml-[72px]'>
            <h5 className='text-lg md:text-2xl md:mt-[46px] line-clamp-1 max-w-[566px] mt-3'>
              {title}
            </h5>
            <dl>
              <dt className='sr-only'>저자</dt>
              <dd className='text-md md:text-lg text-gray mt-[6px]'>
                {author}
              </dd>

              <div className='flex justify-between md:flex-col'>
                <dt className='sr-only'>평점</dt>
                <dd className='text-lg mt-[6px]'>
                  <span className='flex'>
                    <Star
                      size='25'
                      className='text-yellow-400 fill-yellow-400 mt-[2px] mr-[2px]'
                    />
                    {rating}
                  </span>
                </dd>

                <dt className='sr-only'>가격</dt>
                <dd className='text-2xl md:mt-[60px]'>{price}원</dd>
              </div>
              <dt className='sr-only'>책 소개</dt>
              <dd className='md:text-xl text-gray mt-[20px] line-clamp-2 max-w-[566px]'>
                {description}
              </dd>
            </dl>
          </div>
        </div>
      </Link>
      <div className='md:hidden bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-black via-gray to-lightgray shadow-sm mt-1'></div>
    </li>
  );
}
