import OrderDetailCard from '@/components/features/my-page/order-detail-card';
import { fetchGetOrderDetails } from '@/lib/api/my-page.api';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { OrderDetailInfo } from '@/types/my-page.type';
import { ChevronRight } from 'lucide-react';

export default async function OrderDetails() {
  const test: OrderDetailInfo[] = await fetchGetOrderDetails(
    '644780c4-7283-417e-8c18-b1cb1b96a669'
  );

  return (
    <div className='flex-1 min-w-[1000px]'>
      <div className='mb-6'>
        <h3 className='flex items-center text-lg font-medium'>
          <span className='mr-2'>
            <ChevronRight />
          </span>{' '}
          주문 내역
        </h3>
      </div>
      {test ? (
        <div className='flex flex-col pb-6'>
          {test.map((order) => (
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
    </div>
  );

