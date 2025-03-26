'use client';

import { CONTROL_TYPE } from '@/constants/quantity-control.constant';
import useCartStore from '@/store/cart-store';
import { TypeCartBooks } from '@/types/cart.type';
import { useEffect, useState } from 'react';
const { INCREASE, DECREASE } = CONTROL_TYPE;

export const useQuantityControl = (
  id: TypeCartBooks['id'],
  itemQuantity: TypeCartBooks['quantity']
) => {
  const { updateQuantity, increaseQuantity, decreaseQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(itemQuantity);

  useEffect(() => setQuantity(itemQuantity), [itemQuantity]);

  const handleBookQuantityByButton = (
    handleType: typeof INCREASE | typeof DECREASE
  ): void => {
    if (handleType === INCREASE) {
      increaseQuantity(id);
    } else if (itemQuantity > 1) {
      decreaseQuantity(id);
    }
  };

  const handleBookQuantityByText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setQuantity(value ? parseInt(value, 10) : 0);
  };

  const updateBookQuantityByText = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
      updateQuantity(id, 1);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleUpdateBookQuantityByEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      updateBookQuantityByText();
    }
  };

  return {
    quantity,
    handleBookQuantityByButton,
    handleBookQuantityByText,
    updateBookQuantityByText,
    handleUpdateBookQuantityByEnter,
  };
};
