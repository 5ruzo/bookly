'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SuccessPage() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const searchParams = useSearchParams();
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  async function confirmPayment() {
    const response = await fetch(`${window.location.origin}/api/toss`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (response.ok) {
      setIsConfirmed(true);
    }
  }

  if (typeof window !== 'undefined') {
    window.history.pushState(null, window.location.href);
    window.addEventListener('popstate', function () {
      window.history.pushState(null, window.location.href);
    });
  }

  return (
    <div className='flex flex-col items-center py-10 w-[90vw] max-w-[1000px] min-h-[83vh] mx-auto justify-center'>
      {isConfirmed ? (
        <div className='flex flex-col items-center w-full max-w-[540px]'>
          <img
            src='https://static.toss.im/illusts/check-blue-spot-ending-frame.png'
            width='120'
            height='120'
          />
          <h2 className='mt-8 text-lg font-semibold'>결제를 완료했어요</h2>
          <div className='mt-8 flex flex-col gap-4 w-100 w-full mb-10'>
            <div className='flex flex-col sm:flex-row justify-center'>
              <span className='font-semibold block text-center mb-2 sm:mb-0 sm:inline-block sm:text-left sm:mr-4'>
                결제 금액
              </span>
              <span id='amount' className='block text-center'>
                {amount}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row justify-center'>
              <span className='font-semibold block text-center mb-2 sm:mb-0 sm:inline-block sm:text-left sm:mr-4'>
                주문번호
              </span>
              <span id='orderId' className='block text-center'>
                {orderId}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row justify-center'>
              <span className='font-semibold block text-center mb-2 sm:mb-0 sm:inline-block sm:text-left sm:mr-4'>
                결제번호
              </span>
              <span id='paymentKey' className='block text-center'>
                {paymentKey}
              </span>
            </div>
          </div>

          <div>
            <Link
              className='bg-primary py-2 px-3 text-white-light rounded'
              href='/book-list/best'
            >
              다른 책 보러가기
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex-col items-center max-w-[540px]'>
          <div className=' w-[100px] mx-auto'>
            <img
              src='https://static.toss.im/lotties/loading-spot-apng.png'
              width='100%'
              height='120'
            />
          </div>
          <h2 className='font-bold text-center my-5'>
            결제 요청까지 성공했어요.
          </h2>
          <h3 className='my-5'>결제 승인하고 완료해보세요.</h3>

          <button
            className='bg-primary w-full py-2 text-white-light rounded'
            onClick={confirmPayment}
          >
            결제 승인하기
          </button>
        </div>
      )}
    </div>
  );
}
