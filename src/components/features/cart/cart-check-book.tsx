'use-client';
import { Checkbox } from '@/components/ui/checkbox';
import useCartStore from '@/store/cart-store';
import { TypeCartBooks } from '@/types/cart.type';

type TypeCartCheckBookProps = {
  id: TypeCartBooks['id'];
};

export default function CartCheckBook({ id }: TypeCartCheckBookProps) {
  const { checkedBooks, setCheckedBooks } = useCartStore();
  const handleCheckedChange = () => {
    setCheckedBooks(id);
  };

  return (
    <Checkbox
      checked={checkedBooks.includes(id)}
      onCheckedChange={handleCheckedChange}
    />
  );
}
