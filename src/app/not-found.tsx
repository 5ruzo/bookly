import BestSellerCarousel from '@/components/ui/best-seller-carousel';
import CardSectionLayout from '@/components/ui/card-section-layout';
import RecommendedBooksCarousel from '@/components/ui/recommened-books-carousel';

export default function NotFound() {
  return (
    <section className='min-h-[calc(100vh-24rem)] pl-1 flex flex-col justify-start items-center'>
      <h2 className='text-2xl mt-4'>404 - 페이지를 찾을 수 없습니다.</h2>
      <p className='mt-4'>요청하신 페이지가 존재하지 않습니다.</p>
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
    </section>
  );
}
