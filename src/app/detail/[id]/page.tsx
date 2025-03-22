import { API_KEY, SUPABASE_URL } from '@/constants/detail.constans';
import { BookList } from '@/types/detail.type';
import React from 'react';
import { Rating } from '@/components/features/detail/detail-rating';
import ManipulationArea from '@/components/features/detail/detail-manipulation-area';

const fetchGetDetail = async (bookId: string) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/books?id=eq.${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      apikey: API_KEY || '',
    },
  });

  const data: BookList = await res.json();

  return data[0];
};

export default async function page({ params }: { params: { id: string } }) {
  const data = await fetchGetDetail(params.id);

  // 수령 예상일 계산을 위한 기본값
  const timestamp = Date.now();
  const date = new Date(timestamp);

  if (!data) return <p>데이터가 없습니다.</p>;
  return (
    <div>
      <p>제목: {data.title}</p>
      <p>저자: {data.author}</p>
      <p>출판사: {data.publisher}</p>
      <p>출판일: {data.published_date}</p>
      <div>
        <img src={data.image_url} alt={data.title} />
      </div>
      <p>가격: {data.price}원</p>
      <p>배송료: 3000원(제주도 6000원)</p>
      <p>
        수령 예상일:
        {/* 오늘을 기준으로 3일 이후 */}
        {new Date(date.setDate(date.getDate() + 3)).toLocaleDateString()}
      </p>
      <div className='flex gap-2'>
        <p>평점:</p>
        <Rating rating={data.rating} />
        <span className='sr-only'>별점 {data.rating}점</span>
      </div>
      <ManipulationArea title={data.title} price={data.price} />
      <p>장르: {data.genre}</p>
      <p>책 소개: {data.description}</p>
    </div>
  );
}
