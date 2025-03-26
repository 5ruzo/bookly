'use-client';
import { Checkbox } from '@/components/ui/checkbox';
import useCartStore from '@/store/cart/cart-store';

export default function CartCheckBook({ id }: { id: string }) {
  const { checkedBooks, setCheckedBooks } = useCartStore();
  return (
    <Checkbox
      checked={checkedBooks.includes(id)}
      onCheckedChange={() => setCheckedBooks(id)}
    />
  );
}
