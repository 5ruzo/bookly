'use client';

import React from 'react';
import BookCarouselLayout from './book-carousel-layout';
import { useGetBooksByRecommendQuery } from '@/lib/queries/use-get-books-by-recommend-query';

function RecommendedBooksCarousel() {
  const { data: recommendedLst, isError } = useGetBooksByRecommendQuery();
  if (!recommendedLst || isError) return null;

  return <BookCarouselLayout bookList={recommendedLst} />;
}

export default RecommendedBooksCarousel;
