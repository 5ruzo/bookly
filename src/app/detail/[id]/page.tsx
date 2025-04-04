import { fetchGetDetail } from '@/lib/api/detail.api';
import ProductInfo from '@/components/features/detail/detail-product-info';
import CardSectionLayout from '@/components/ui/card-section-layout';
import RecommendedBooksCarousel from '@/components/ui/recommened-books-carousel';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await fetchGetDetail(params.id);

  return {
    title: `자세한 책 정보 - Bookly 상세 페이지`,
    description: `Bookly에서 '${data.title}' 책 상세 정보를 확인하세요.`,

    openGraph: {
      title: `Bookly - '${data.title}'책의 상세 정보`,
      description: `Bookly에서 관심 있는 책 정보를 확인하세요.`,
      images: '/images/logo.png',
    },
  };
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await fetchGetDetail(params.id);

  if (!data) return <p>데이터가 없습니다.</p>;
  return (
    <div>
      <div className='flex justify-center pt-10 md:pt-16 pb-14 md:pb-24'>
        <div className='w-4/6 max-w-[1000px] md:min-w-[800px]'>
          <div className='mb-6'>
            <div className='md:flex items-center gap-4'>
              <h2 className='text-xl md:text-2xl font-bold break-keep'>
                {data.title}
              </h2>
              <span className='text-sm font-normal text-gray mt-1'>
                {data.author}
              </span>
            </div>
            <div className='flex gap-4'>
              <p className='text-md text-gray mt-2'>{data.publisher}</p>
              <p className='text-md text-gray mt-2'>{data.published_date}</p>
            </div>
          </div>
          <hr className='my-6' />

          <div className='flex flex-col md:flex-row gap-4 md:gap-10 mb-12'>
            <div className='md:w-1/2'>
              <img
                className='md:full px-12'
                src={data.image_url}
                alt={data.title}
              />
            </div>
            <ProductInfo data={data} />
          </div>
          <hr className='my-6' />
        </div>
      </div>
      <CardSectionLayout title='이 주의 추천 도서' className='my-16 px-10'>
        <RecommendedBooksCarousel />
      </CardSectionLayout>
      <div className='flex justify-center pt-10 md:pt-16 pb-14 md:pb-24'>
        <div className='w-4/6 max-w-[1000px] md:min-w-[800px]'>
          <hr className='my-6' />
          <div className='text-mld'>
            <h3 className='text-lg py-4'>장르</h3> <span>{data.genre}</span>
          </div>

          <hr className='my-6' />
          <div>
            <h3 className='text-lg py-4'>책 소개</h3>
            <p className='text-mld break-keep'>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
