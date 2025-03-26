'use-client';
import {
  formatNumberWithCommas,
  getDeliveryFee,
  getTotalPrice,
} from '@/lib/utils/common.util';
import useCartStore from '@/store/cart-store';
import { Equal, Plus } from 'lucide-react';

export default function PriceSummary() {
  const { totalPrice } = useCartStore();

  const deliveryFee = getDeliveryFee(totalPrice);
  const paymentAmount = getTotalPrice(totalPrice, deliveryFee);

  return (
    <dl className='flex flex-col items-center mb-16 py-6 border-t-2 border-b-2 border-lightgray sm:flex-row sm:justify-evenly'>
      <div className='flex flex-col items-center w-[200px]'>
        <dt className='font-bold'>상품금액</dt>
        <dd>{formatNumberWithCommas(totalPrice)}원</dd>
      </div>
      <span className='font-bold'>
        <Plus />
      </span>
      <div className='flex flex-col items-center w-[200px]'>
        <dt className='font-bold'>배송비</dt>
        <dd>{formatNumberWithCommas(deliveryFee)}원</dd>
      </div>
      <span className='font-bold'>
        <Equal />
      </span>
      <div className='flex flex-col items-center w-[200px]'>
        <dt className='font-bold'>결제 예정 금액</dt>
        <dd>{formatNumberWithCommas(paymentAmount)}원</dd>
      </div>
    </dl>
  );
}
