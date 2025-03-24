'use client';

import { useGetBooksByBestsellerQuery } from '@/lib/queries/use-get-books-by-bestseller-query';
import BookCarouselLayout from './book-carousel-layout';

function BestSellerCarousel() {
  const { data: bestSellerList, isError } = useGetBooksByBestsellerQuery();

  if (!bestSellerList || isError) return null;

  return <BookCarouselLayout bookList={bestSellerList} />;
}

export default BestSellerCarousel;
