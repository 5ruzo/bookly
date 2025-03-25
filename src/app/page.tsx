import CardSectionLayout from '@/components/ui/card-section-layout';
import BestSellerCarousel from '@/components/ui/best-seller-carousel';
import RecommendedBooksCarousel from '@/components/ui/recommened-books-carousel';
import MainCarousel from '@/components/features/home/home-main-carousel';
import StripBannersCarousel from '@/components/features/home/home-strip-banners-carousel';

export default function Home() {
  return (
    <div>
      {/* 메인 캐러셀 섹션*/}
      <section>
        <h2 className='sr-only'>주요 홍보 도서</h2>
        <MainCarousel />
      </section>
      {/* 베스트 셀러 섹션 */}
      <CardSectionLayout
        title='베스트셀러'
        path='/booklist/best'
        className='w-[85%] mt-16 md:mt-36'
      >
        <BestSellerCarousel />
      </CardSectionLayout>
      {/* 띠배너 섹션 */}
      <div className='relative w-full mt-20 md:mt-28'>
        <StripBannersCarousel />
      </div>
      {/* 추천 도서 섹션 */}
      <CardSectionLayout
        title='이 주의 추천 도서'
        className='w-[85%] my-16 md:my-36'
      >
        <RecommendedBooksCarousel />
      </CardSectionLayout>
    </div>
  );
}
