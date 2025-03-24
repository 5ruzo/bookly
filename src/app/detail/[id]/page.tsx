import React from 'react';
import { fetchGetDetail } from '@/lib/api/detail.fetchGetDetail';
import ProductInfo from '@/components/features/detail/detail-product-info';

export default async function page({ params }: { params: { id: string } }) {
  const data = await fetchGetDetail(params.id);

  if (!data) return <p>데이터가 없습니다.</p>;
  return (
    <div className='flex justify-center'>
      <div className='max-w-[1000px] md:min-w-[800px]'>
        <div className='mb-6 '>
          <div className='md:flex items-center gap-4'>
            <h1 className='text-xl md:text-2xl font-bold break-keep'>
              {data.title}
            </h1>
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

        <div className='flex flex-col md:flex-row gap-4 md:gap-16 mb-12'>
          <div className='md:w-1/2'>
            <img
              className='md:w-4/5 px-12'
              src={data.image_url}
              alt={data.title}
            />
          </div>
          <ProductInfo data={data} price={data.price} />
        </div>
        <hr className='my-6' />

        <div className='text-mld'>
          <h2 className='text-lg py-4'>장르</h2> <span>{data.genre}</span>
        </div>

        <hr className='my-6' />
        <div>
          <h3 className='text-lg py-4'>책 소개</h3>
          <p className='text-mld break-keep'>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
