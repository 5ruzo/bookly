export default function PriceSummary() {
  return (
    <dl className='flex flex-col items-center mb-16 py-6 border-t-2 border-b-2 border-lightgray sm:flex-row sm:justify-evenly'>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>상품금액</dt>
        <dd>10,000원</dd>
      </div>
      <span className='font-bold text-lg'>+</span>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>배송비</dt>
        <dd>3,500원</dd>
      </div>
      <span className='font-bold text-lg'>=</span>
      <div className='flex flex-col items-center'>
        <dt className='font-bold'>결제 예정 금액</dt>
        <dd>13,500원</dd>
      </div>
    </dl>
  );
}
