'use client';
import { TypePaymentsInfo } from '@/types/order.type';
import {
  ANONYMOUS,
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_TEST_KEY as string;

export const useTossPayments = (
  isFormFilled: boolean,
  paymentsInfo: TypePaymentsInfo
) => {
  const [ready, setReady] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const { name, amount, items } = paymentsInfo;

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
        await widgets.setAmount({
          currency: 'KRW',
          value: amount,
        });

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

  const requestPayment = async () => {
    if (!widgets) return;
    try {
      await widgets.requestPayment({
        orderId: crypto.randomUUID(),
        orderName: items,
        customerName: name,
        successUrl: `${window.location.origin}/order/success${window.location.search}`,
        failUrl: `${window.location.origin}/order/fail${window.location.search}`,
      });
    } catch (error) {
      Swal.fire({
        title: '결제 실패!',
        text: '결제 요청 중 오류가 발생했습니다',
        icon: 'error',
      });
      console.error('결제 요청 중 오류 발생=>', error);
    }
  };

  return { ready, requestPayment };
};
