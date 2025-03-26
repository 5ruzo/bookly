'use client';

import { useEffect, useState } from 'react';
import { useGetBooksByBestsellerQuery } from '@/lib/queries/use-get-books-by-bestseller-query';
import BookCarouselLayout from './book-carousel-layout';
import { CardForCarousel } from '@/types/common.type';

function BestSellerCarousel() {
  const [bestSellerList, setBestSellerList] = useState<
    CardForCarousel[] | null
  >(null);
  const { data, isError } = useGetBooksByBestsellerQuery();

  useEffect(() => {
    if (data && !isError) {
      setBestSellerList(data);
    }
  }, [data, isError]);

  if (!bestSellerList || isError) return null;

  return <BookCarouselLayout bookList={bestSellerList} />;
}

export default BestSellerCarousel;
