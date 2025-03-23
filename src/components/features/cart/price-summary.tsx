import '@/styles/cart/cart.css';

export default function PriceSummary() {
  return (
    <dl className='payment-field'>
      <div className='payment-item'>
        <dt className='font-bold'>상품금액</dt>
        <dd>10,000원</dd>
      </div>
      <span className='font-bold text-lg'>+</span>
      <div className='payment-item'>
        <dt className='font-bold'>배송비</dt>
        <dd>3,500원</dd>
      </div>
      <span className='font-bold text-lg'>=</span>
      <div className='payment-item'>
        <dt className='font-bold'>결제 예정 금액</dt>
        <dd>13,500원</dd>
      </div>
    </dl>
  );
}
