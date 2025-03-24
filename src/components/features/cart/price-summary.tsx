'use-client';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import useCartStore from '@/store/cart/cart-store';
import { Equal, Plus } from 'lucide-react';

const MIN_FREE_DELIVERY_PRICE = 30000;
const DEFAULT_DELIVERY_FEE = 3500;

const getDeliveryFee = (itemPrice: number) => {
  if (itemPrice >= MIN_FREE_DELIVERY_PRICE) return 0;
  else return DEFAULT_DELIVERY_FEE;
};

const getTotalPrice = (itemPrice: number, deliveryFee: number): number => {
  return itemPrice + deliveryFee;
};

export default function PriceSummary() {
  const { totalPrice } = useCartStore();

  const deliveryFee = getDeliveryFee(totalPrice);
  const paymentAmount = getTotalPrice(totalPrice, deliveryFee);

  return (
    <dl className='flex flex-col items-center mb-16 py-6 border-t-2 border-b-2 border-lightgray sm:flex-row sm:justify-evenly'>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>상품금액</dt>
        <dd>{formatNumberWithCommas(totalPrice)}원</dd>
      </div>
      <span className='font-bold'>
        <Plus />
      </span>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>배송비</dt>
        <dd>{formatNumberWithCommas(deliveryFee)}원</dd>
      </div>
      <span className='font-bold'>
        <Equal />
      </span>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>결제 예정 금액</dt>
        <dd>{formatNumberWithCommas(paymentAmount)}원</dd>
      </div>
    </dl>
  );
}
