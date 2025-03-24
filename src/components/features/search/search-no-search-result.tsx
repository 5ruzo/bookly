'use client';

import BestSellerCarousel from '@/components/ui/best-seller-carousel';
import CardSectionLayout from '@/components/ui/card-section-layout';
import RecommendedBooksCarousel from '@/components/ui/recommened-books-carousel';

export default function SearchNoSearchResult() {
  return (
    <section className='w-[1000px] pl-1 flex flex-col justify-start items-center min-h-[calc(100vh-24rem)]'>
      <h1 className='text-2xl'>검색결과가 없습니다.</h1>
      <CardSectionLayout
        title='베스트셀러'
        path='/book-list/best'
        className='mt-20'
      >
        <BestSellerCarousel />
      </CardSectionLayout>
      <CardSectionLayout title='이 주의 추천 도서' className='my-20'>
        <RecommendedBooksCarousel />
      </CardSectionLayout>
    </section>
  );
}
