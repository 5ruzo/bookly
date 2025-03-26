'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CardForCarousel } from '@/types/common.type';
import { SLIDES_TO_ONE_SCROLL } from '@/constants/common.constant';
import BookCard from './book-card';

function BookCarouselLayout(props: { bookList: CardForCarousel[] }) {
  const carouselOptions = {
    slidesToScroll: SLIDES_TO_ONE_SCROLL.SMALL,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: SLIDES_TO_ONE_SCROLL.MEDIUM },
      '(min-width: 768px)': { slidesToScroll: SLIDES_TO_ONE_SCROLL.LARGE },
    },
  };

  return (
    <div>
      <Carousel opts={carouselOptions}>
        <CarouselContent className='-ml-4 md:-ml-6'>
          {props.bookList?.map((book) => {
            return (
              <CarouselItem
                key={book.id}
                className='basis-1/2 sm:basis-1/3 md:basis-1/4 pl-4 md:pl-6'
              >
                <BookCard {...book} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='-left-4 md:-left-12 w-7 h-7 md:w-8 md:h-8' />
        <CarouselNext className='-right-4 md:-right-12 w-7 h-7 md:w-8 md:h-8' />
      </Carousel>
    </div>
  );
}

export default BookCarouselLayout;
