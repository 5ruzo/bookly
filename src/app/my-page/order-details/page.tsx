import OrderDetailCard from '@/components/features/my-page/order-detail-card';
import OrderDetailListArea from '@/components/features/my-page/order-detail-list-area';
import { fetchGetOrderDetails } from '@/lib/api/my-page.api';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { OrderDetailInfo } from '@/types/my-page.type';
import { ChevronRight } from 'lucide-react';

export default async function OrderDetails() {
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

      <OrderDetailListArea />
    </div>
  );
}
