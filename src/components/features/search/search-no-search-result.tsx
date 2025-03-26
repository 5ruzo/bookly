import BestSellerCarousel from '@/components/ui/best-seller-carousel';
import CardSectionLayout from '@/components/ui/card-section-layout';
import RecommendedBooksCarousel from '@/components/ui/recommened-books-carousel';

export default function SearchNoSearchResult() {
  return (
    <div className='min-h-[calc(100vh-24rem)] pl-1 flex flex-col justify-start items-center'>
      <h2 className='text-2xl mt-4'>검색결과가 없습니다.</h2>
      <CardSectionLayout
        title='베스트셀러'
        path='/book-list/best'
        className='mt-20 w-screen px-4'
      >
        <BestSellerCarousel />
      </CardSectionLayout>
      <CardSectionLayout
        title='이 주의 추천 도서'
        className='my-20 w-screen px-4'
      >
        <RecommendedBooksCarousel />
      </CardSectionLayout>
    </div>
  );
}
