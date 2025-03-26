import DeliveryInfo from '@/components/features/order/delivery-info';

export default function OrderPage() {
  return (
    <section className='w-[80%] sm:w-[90%] max-w-[800px] mx-auto py-10 sm:py-20'>
      <h2 className='font-bold text-xl sm:text-2xl text-center mb-8 sm:mb-16'>
        주문/결제
      </h2>
      <DeliveryInfo />
    </section>
  );
}
