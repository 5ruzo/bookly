'use client';

import useCartStore from '@/store/cart/cart-store';
import { useEffect, useState } from 'react';

export const useQuantityControl = (id: string, storeQuantity: number) => {
  const { calcTotalPrice, updateQuantity, increaseQuantity, decreaseQuantity } =
    useCartStore();
  const [quantity, setQuantity] = useState(storeQuantity);

  useEffect(() => setQuantity(storeQuantity), [storeQuantity]);

  const handleBookQuantityByButton = (
    handleType: 'increase' | 'decrease'
  ): void => {
    if (handleType === 'increase') {
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
