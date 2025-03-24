'use client';

import { CONTROL_TYPE } from '@/constants/quantity-control-constant';
import useCartStore from '@/store/cart/cart-store';
import { useEffect, useState } from 'react';
const { INCREASE, DECREASE } = CONTROL_TYPE;

export const useQuantityControl = (id: string, storeQuantity: number) => {
  const { calcTotalPrice, updateQuantity, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const [quantity, setQuantity] = useState(storeQuantity);

  useEffect(() => setQuantity(storeQuantity), [storeQuantity]);

  const handleBookQuantityByButton = (
    handleType: typeof INCREASE | typeof DECREASE
  ): void => {
    if (handleType === INCREASE) {
      increaseQuantity(id);
      calcTotalPrice();
    } else if (storeQuantity > 1) {
      decreaseQuantity(id);
      calcTotalPrice();
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
      calcTotalPrice();
    } else {
      updateQuantity(id, quantity);
      calcTotalPrice();
    }
  };

  return {
    quantity,
    handleBookQuantityByButton,
    handleBookQuantityByText,
    updateBookQuantityByText,
  };
};
