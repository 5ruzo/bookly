import { CONTROL_TYPE } from '@/constants/quantity-control.constant';
import * as CartUtils from '@/lib/utils/cart.utils';
import { TypeCartItem } from '@/types/cart.type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
const { INCREASE, DECREASE } = CONTROL_TYPE;
const {
  addToCartBooks,
  updateQuantity,
  toggleCheckedBooks,
  handleQuantity,
  calculateTotalPrice,
  deleteFromCart,
  getBooksToOrder,
} = CartUtils;

type TypeCartStore = {
  cartBooks: TypeCartItem[];
  totalPrice: number;
  booksToOrder: TypeCartItem[];
  checkedBooks: TypeCartItem['id'][];
  addToCart: (books: TypeCartItem[]) => void;
  increaseQuantity: (id: TypeCartItem['id']) => void;
  decreaseQuantity: (id: TypeCartItem['id']) => void;
  updateQuantity: (
    id: TypeCartItem['id'],
    newQuantity: TypeCartItem['quantity']
  ) => void;
  checkAllBooks: (newCheckedBooks: TypeCartItem['id'][]) => void;
  setCheckedBooks: (newCheckedBook: TypeCartItem['id']) => void;
  resetCheckedBooks: () => void;
  deleteBooks: (ids: TypeCartItem['id'][]) => void;
  orderBooks: () => void;
};

const initialState = {
  cartBooks: [],
  totalPrice: calculateTotalPrice([]),
  checkedBooks: [],
  booksToOrder: [],
};

const useCartStore = create<TypeCartStore>()(
  persist(
    (set) => ({
      ...initialState,
      addToCart: (addedBooks) =>
        set(({ cartBooks }) => {
          const { newCartBooks, totalPrice } = addToCartBooks(
            cartBooks,
            addedBooks
          );
          return {
            cartBooks: newCartBooks,
            totalPrice: totalPrice,
          };
        }),
      increaseQuantity: (id) =>
        set((state) => {
          const { newCartBooks, totalPrice } = handleQuantity(
            state.cartBooks,
            id,
            INCREASE
          );
          return { cartBooks: newCartBooks, totalPrice };
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const { newCartBooks, totalPrice } = handleQuantity(
            state.cartBooks,
            id,
            DECREASE
          );
          return { cartBooks: newCartBooks, totalPrice };
        }),
      updateQuantity: (id, newQuantity) =>
        set(({ cartBooks }) => {
          const { newCartBooks, totalPrice } = updateQuantity(
            cartBooks,
            id,
            newQuantity
          );
          return {
            cartBooks: newCartBooks,
            totalPrice,
          };
        }),
      checkAllBooks: (newCheckedBooks) =>
        set(() => ({
          checkedBooks: newCheckedBooks,
        })),
      setCheckedBooks: (newCheckedBook) =>
        set(({ checkedBooks }) => ({
          checkedBooks: toggleCheckedBooks(checkedBooks, newCheckedBook),
        })),
      resetCheckedBooks: () =>
        set((state) => ({
          ...state,
          checkedBooks: [],
        })),
      deleteBooks: (ids) =>
        set((state) => {
          const { newCartBooks, totalPrice, newCheckedBooks } = deleteFromCart(
            state.checkedBooks,
            state.cartBooks,
            ids
          );
          return {
            cartBooks: newCartBooks,
            totalPrice,
            checkedBooks: newCheckedBooks,
          };
        }),
      orderBooks: () =>
        set((state) => {
          const { booksToOrder, totalPrice } = getBooksToOrder(
            state.cartBooks,
            state.checkedBooks
          );
          return {
            booksToOrder,
            totalPrice,
          };
        }),
    }),
    {
      name: 'cart-list',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
