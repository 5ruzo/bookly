import Cart from '@/components/features/cart/cart';
export default function CartPage() {
  return (
    <section className='w-full max-w-[1000px] mx-auto py-10 sm:py-20'>
      <h2 className='font-bold text-lg sm:text-2xl text-center mb-8 sm:mb-16'>
        장바구니
      </h2>
      <Cart />
    </section>
  );
}
