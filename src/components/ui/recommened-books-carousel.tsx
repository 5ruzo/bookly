'use client';

import { useEffect, useState } from 'react';
import { useGetBooksByRecommendQuery } from '@/lib/queries/use-get-books-by-recommend-query';
import BookCarouselLayout from './book-carousel-layout';
import { CardForCarousel } from '@/types/common.type';

function RecommendedBooksCarousel() {
  const [recommendedList, setBestSellerList] = useState<
    CardForCarousel[] | null
  >(null);
  const { data, isError } = useGetBooksByRecommendQuery();

  useEffect(() => {
    if (data && !isError) {
      setBestSellerList(data);
    }
  }, [data, isError]);

  if (!recommendedList || isError) return null;

  return <BookCarouselLayout bookList={recommendedList} />;
}

export default RecommendedBooksCarousel;
