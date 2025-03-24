'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingCart, Star } from 'lucide-react';
import { CardForCarousel } from '@/types/common.type';
import Link from 'next/link';
import {
  formatNumberWithCommas,
  normalizedRating,
} from '@/lib/utils/common.util';
import { SlidesToOneScroll } from '@/constants/common.constant';

function BookCarouselLayout(props: { bookList: CardForCarousel[] }) {
  const carouselOptions = {
    slidesToScroll: SlidesToOneScroll,
  };

  return (
    <div>
      <Carousel opts={carouselOptions}>
        <CarouselContent className='-ml-6'>
          {props.bookList?.map((book) => {
            return (
              <CarouselItem key={book.id} className='basis-1/4 pl-6'>
                <Link href={`/detail/${book.id}`}>
                  <div className='border-[1px] border-lightgray rounded-md overflow-hidden pb-4'>
                    <div className='relative w-full aspect-square overflow-hidden'>
                      <img
                        src={book.image_url}
                        alt={book.title}
                        className='absolute object-cover object-top'
                      />
                    </div>
                    <div className='flex flex-col gap-2 mt-2 px-4'>
                      <span className='flex items-center text-md gap-1'>
                        <Star className='w-5' fill='#FACC15' stroke='none' />
                        {normalizedRating(book.rating)}
                      </span>
                      <span className='font-semibold text-md block w-full overflow-hidden text-ellipsis whitespace-nowrap'>
                        {book.title}
                      </span>
                      <span className='text-sm text-gray overflow-hidden text-ellipsis whitespace-nowrap'>
                        {book.author}
                      </span>
                      <div className='h-12'>
                        <p className='text-md text-gray line-clamp-2 break-words text-ellipsis overflow-hidden'>
                          {book.description}
                        </p>
                      </div>
                      <span className='text-md font-semibold'>
                        {formatNumberWithCommas(Number(book.price))}원
                      </span>
                      <button className='flex justify-center gap-1 items-center mt-1 text-md bg-black text-white-dark py-1 rounded-md'>
                        <ShoppingCart
                          fill='var(--color-white-dark)'
                          className='w-4'
                        />
                        장바구니에 담기
                      </button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default BookCarouselLayout;
