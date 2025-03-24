import Cart from '@/components/features/cart/cart';
export default function CartPage() {
  return (
    <section className='w-full max-w-[1000px] mx-auto py-20'>
      <h2 className='font-bold text-2xl text-center mb-16'>장바구니</h2>
      <Cart />
    </section>
  );
}
