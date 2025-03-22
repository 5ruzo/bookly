import React from 'react';
import { Star } from 'lucide-react';
export default function BookListItem({
  title,
  author,
  rating,
  price,
  description,
  image_url,
}: BookItem) {
  price = new Intl.NumberFormat().format(+price);

  return (
    <li>
      <div className='flex gep-[72px]'>
        <img
          src={image_url}
          alt={`${title}의 표지 이미지`}
          className='w-[280px] h-[406px]'
        />
        <div className='flex flex-col ml-[72px]'>
          <h5 className='text-2xl mt-[46px] line-clamp-1 max-w-[566px] '>
            {title}
          </h5>
          <dl>
            <dt className='sr-only'>저자</dt>
            <dd className='text-lg text-gray mt-[6px]'>{author}</dd>

            <dt className='sr-only'>평점</dt>
            <dd className='text-lg mt-[6px]'>
              <span className='flex'>
                <Star className='h-[25px] text-yellow-400 fill-yellow-400 mt-[2px] mr-[2px]' />
                {rating}
              </span>
            </dd>

            <dt className='sr-only'>가격</dt>
            <dd className='text-2xl mt-[60px]'>{price}원</dd>

            <dt className='sr-only'>책 소개</dt>
            <dd className='text-xl text-gray mt-[20px] line-clamp-2 max-w-[566px] hover:whitespace-normal hover:bg-black hover:text-white hover:p-2 hover:absolute hover:z-10 hover:line-clamp-none'>
              {description}
            </dd>
          </dl>
        </div>
      </div>
    </li>
  );
}
