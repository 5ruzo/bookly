'use client';
import { Button } from '@/components/ui/button';
import { useTossPayments } from '@/lib/hooks/order/toss-payments-hook';
import { TypePaymentsInfo } from '@/types/order.type';

type TossPaymentsProps = {
  isFormFilled: boolean;
  onClose: () => void;
  paymentsInfo: TypePaymentsInfo;
};

export function TossPayments({
  isFormFilled,
  onClose,
  paymentsInfo,
}: TossPaymentsProps) {
  const { ready, requestPayment } = useTossPayments(isFormFilled, paymentsInfo);

  return (
    <div className='fixed top-1/2 left-1/2 w-1/3 min-w-[350px] bg-white-light border border-lightgray rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2'>
      <div>
        <div id='payment-method' className='w-100' />
        <div id='agreement' className='w-100' />
      </div>
      <div className='w-full mt-10 py-3 rounded-lg flex gap-2 p-5 mb-3'>
        <Button
          className='w-1/2 text-[1rem]'
          onClick={requestPayment}
          disabled={!ready}
        >
          결제
        </Button>
        <Button className='w-1/2 text-[1rem] bg-gray' onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}
