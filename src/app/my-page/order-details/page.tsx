import OrderDetailListArea from '@/components/features/my-page/order-detail-list-area';
import { ChevronRight } from 'lucide-react';

export default async function OrderDetails() {
  return (
    <div className='flex-1 w-[50vw] min-w-[350px] max-w-[1000px]'>
      <div className='mb-6'>
        <h3 className='flex items-center text-lg font-medium'>
          <span className='mr-2'>
            <ChevronRight />
          </span>{' '}
          주문 내역
        </h3>
      </div>

      <OrderDetailListArea />
    </div>
  );
}
