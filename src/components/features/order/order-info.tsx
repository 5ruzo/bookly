import {
  formatNumberWithCommas,
  getDeliveryFee,
  getTotalPrice,
} from '@/lib/utils/common.util';
import useCartStore from '@/store/cart-store';
import { Plus } from 'lucide-react';

const styles = {
  paymentsField: 'flex flex-wrap items-center mb-3 w-full',
  title: ' text-center text-[0.9rem] w-[30%] sm:w-[20%] sm:text-medium',
  desc: 'w-[70%] sm:w-[80%] text-[0.9rem] text-center font-semibold sm:text-[1.1rem] bg-secondary rounded-lg py-2',
  icon: 'w-[70%] ml-[30%] sm:w-[80%] sm:ml-[20%] mb-3',
};

export default function OrderInfo() {
  const { totalPrice } = useCartStore();

  const deliveryFee = getDeliveryFee(totalPrice);
  const paymentAmount = getTotalPrice(totalPrice, deliveryFee);

  return (
    <dl className='w-full flex flex-col items-center'>
      <div className={styles.paymentsField}>
        <dt className={styles.title}>결제금액</dt>
        <dd className={styles.desc}>{formatNumberWithCommas(totalPrice)}원</dd>
      </div>
      <span className={styles.icon}>
        <Plus className='w-full text-gray' />
      </span>

      <div className={`${styles.paymentsField} mb-5`}>
        <dt className={styles.title}>배송비</dt>
        <dd className={styles.desc}>{formatNumberWithCommas(deliveryFee)}원</dd>
      </div>
      <div className={`${styles.paymentsField} border-t border-lightgray pt-5`}>
        <dt className={styles.title}>합계금액</dt>
        <dd className={styles.desc}>
          {formatNumberWithCommas(paymentAmount)}원
        </dd>
      </div>
    </dl>
  );
}
