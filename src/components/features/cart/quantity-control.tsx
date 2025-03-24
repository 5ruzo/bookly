import { useQuantityControl } from '@/lib/hooks/use-quantity-control';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { Minus, Plus } from 'lucide-react';

type TypeQuantityControlProps = {
  id: string;
  price: number;
  quantity: number;
};

export default function QuantityControl({
  id,
  price,
  quantity,
}: TypeQuantityControlProps) {
  const {
    quantity: bookQuantity,
    handleBookQuantityByButton,
    handleBookQuantityByText,
    updateBookQuantityByText,
  } = useQuantityControl(id, quantity);
  return (
    <>
      <span className='mb-5'>{formatNumberWithCommas(price)}원</span>
      <div className='border border-lightgray rounded'>
        <button
          className='p-3'
          onClick={() => handleBookQuantityByButton('decrease')}
        >
          <Minus size={10} />
        </button>
        <input
          type='text'
          value={bookQuantity}
          onChange={handleBookQuantityByText}
          onBlur={updateBookQuantityByText}
          className='outline-none w-[40px] text-center'
        />
        <button
          className='p-3'
          onClick={() => handleBookQuantityByButton('increase')}
        >
          <Plus size={10} />
        </button>
      </div>
    </>
  );
}
