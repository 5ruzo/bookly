import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { paymentKey, orderId, amount } = await request.json();
    console.log('결제요청정보 => ', paymentKey, orderId, amount);
    return NextResponse.json({ message: '결제 승인 완료' }, { status: 200 });
  } catch (error) {
    console.error('결제 승인 요청 중 에러 발생:', error);
    return NextResponse.json({ message: '결제 승인 실패' }, { status: 500 });
  }
}
