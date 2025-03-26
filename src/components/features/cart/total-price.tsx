import { formatNumberWithCommas } from '@/lib/utils/common.util';
import { TypeCartItem } from '@/types/cart.type';

type TypeTotalPrice = {
  quantity: number;
  price: number;
};

const getTotalPrice = (
  quantity: TypeCartItem['quantity'],
  price: TypeCartItem['price']
) => {
  return formatNumberWithCommas(quantity * price);
};

export default function TotalPrice({ quantity, price }: TypeTotalPrice) {
  return <span>{getTotalPrice(quantity, price)}원</span>;
}
