'use client';

import { fetchGetOrderDetails } from '@/lib/api/my-page.api';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { useAuthStore } from '@/store/use-auth-store';
import type { OrderDetailInfo } from '@/types/my-page.type';
import { useEffect, useState } from 'react';
import OrderDetailCard from './order-detail-card';

export default function OrderDetailListArea() {
  const [orderList, setOrderList] = useState<OrderDetailInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error('로그인을 해주세요!');
        }

        const data = await fetchGetOrderDetails(userId);
        setOrderList(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '주문 내역 가져오기 실패!'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  return (
    <>
      {orderList ? (
        <div className='flex flex-col pb-6'>
          {orderList.map((order) => (
            <div key={order.id}>
              <h2>주문번호 {order.id}</h2>
              {order.order_details.map((item) => (
                <ul key={item.book_id}>
                  <OrderDetailCard
                    id={item.id}
                    image_url={item.books.image_url}
                    title={item.books.title}
                    author={item.books.author}
                    arrived={order.created_at}
                    price={item.books.price}
                    quantity={item.quantity}
                  />
                </ul>
              ))}

              <div className='flex justify-between px-6'>
                <p>총액 :</p>
                <p>{formatNumberWithCommas(order.total_price)}원</p>
              </div>
              <hr className='my-6' />
            </div>
          ))}
          <div className='text-mlg text-gray text-center'>
            모든 주문 내역을 확인하셨습니다.
          </div>
        </div>
      ) : (
        <div className='text-mlg text-gray text-center pb-6'>
          주문 내역이 없습니다.
        </div>
      )}
    </>
  );
}
