'use client';
import { Button } from '@/components/ui/button';
import {
  ANONYMOUS,
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_TEST_KEY as string;

interface Amount {
  currency: string;
  value: number;
}

type TossPaymentsProps = {
  isFormFilled: boolean;
  onClose: () => void;
};

export function TossPayments({ isFormFilled, onClose }: TossPaymentsProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState<Amount>({
    currency: 'KRW',
    value: 50_000,
  });

  useEffect(() => {
    // Toss Payments 위젯 초기화 함수
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(CLIENT_KEY);
        const paymentWidgets = tossPayments.widgets({
          customerKey: ANONYMOUS,
        });
        setWidgets(paymentWidgets);
      } catch (error) {
        console.error('TossPayments 위젯 초기화 중 오류 발생 =>', error);
      }
    }

    if (isFormFilled) fetchPaymentWidgets();
  }, [isFormFilled]);

  useEffect(() => {
    if (!isFormFilled) return;
    // 결제 위젯 렌더링 함수
    async function renderPaymentWidgets() {
      if (!widgets) return;
      try {
        // 결제 금액 설정
        await widgets.setAmount(amount);

        // 결제 방법 및 동의 UI 렌더링
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          }),
        ]);

        // 위젯 준비 상태 설정
        setReady(true);
      } catch (error) {
        console.error('결제 위젯 렌더링 오류:', error);
      }
    }

    renderPaymentWidgets();
  }, [amount, widgets, isFormFilled]);

  return (
    <>
      <div className='fixed top-1/2 left-1/2 w-1/3 min-w-[350px] bg-white-light border border-lightgray rounded-md shadow-lg transform -translate-x-1/2 -translate-y-1/2'>
        <div>
          <div id='payment-method' className='w-100' />
          <div id='agreement' className='w-100' />
        </div>
        <div className='w-full mt-10 py-3 rounded-lg flex gap-2 p-5 mb-3'>
          <Button
            className='w-1/2 text-[1rem]'
            onClick={async () => {
              try {
                await widgets?.requestPayment({
                  orderId: crypto.randomUUID(),
                  orderName: '토스 티셔츠 외 2건',
                  customerName: '김토스',
                  customerEmail: 'customer123@gmail.com',
                  successUrl: `${window.location.origin}/order/success${window.location.search}`,
                  failUrl: `${window.location.origin}/order/fail${window.location.search}`,
                });
              } catch (error) {
                console.error('결제 요청 중 오류 발생=>', error);
              }
            }}
            disabled={!ready}
          >
            결제
          </Button>
          <Button className='w-1/2 text-[1rem] bg-gray' onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </>
  );
}
