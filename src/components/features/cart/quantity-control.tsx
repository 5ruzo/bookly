import { CONTROL_TYPE } from '@/constants/quantity-control.constant';
import { useQuantityControl } from '@/lib/hooks/use-quantity-control';
import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { TypeCartBooks } from '@/types/cart.type';
import { Minus, Plus } from 'lucide-react';
const { INCREASE, DECREASE } = CONTROL_TYPE;
type TypeQuantityControlProps = {
  id: TypeCartBooks['id'];
  price?: TypeCartBooks['price'];
  quantity: TypeCartBooks['quantity'];
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
    handleUpdateBookQuantityByEnter,
  } = useQuantityControl(id, quantity);
  return (
    <>
      {price && <span className='mb-5'>{formatNumberWithCommas(price)}원</span>}
      <div className='border border-lightgray rounded flex items-center'>
        <button
          className='p-2'
          onClick={() => handleBookQuantityByButton(DECREASE)}
        >
          <Minus size={10} />
        </button>
        <input
          type='text'
          value={bookQuantity}
          onChange={handleBookQuantityByText}
          onBlur={updateBookQuantityByText}
          onKeyDown={handleUpdateBookQuantityByEnter}
          className='outline-none w-[40px] text-center bg-white-light'
        />
        <button
          className='p-2'
          onClick={() => handleBookQuantityByButton(INCREASE)}
        >
          <Plus size={10} />
        </button>
      </div>
    </>
  );
}
