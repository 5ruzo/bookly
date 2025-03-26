import { CONTROL_TYPE } from '@/constants/quantity-control-constant';
import * as CartUtils from '@/lib/utils/cart.utils';
import { TypeCartItem } from '@/types/cart/cart.type';
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
} = CartUtils;

type TypeCartStore = {
  cartBooks: TypeCartItem[];
  totalPrice: number;
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
};

//@TODO: 데이터 넘어오면 삭제 예정
const MOCK_DATA = [
  {
    id: '12345',
    bookInfo: {
      title:
        '지박소년 하나코 군 23 (트리플 특장판) - 홀로그램 양면 책갈피 + 아크릴 스탠딩 POP + 일러스트 양면 코스터',
      author: '아이다이로 (지은이), 장혜영 (옮긴이)',
      image_url:
        'https://image.aladin.co.kr/product/36071/90/cover500/k772037248_1.jpg',
    },
    quantity: 1,
    price: 6000,
  },
  {
    id: crypto.randomUUID(),
    bookInfo: {
      title: '셜리 1',
      author: '샬럿 브론테 (지은이), 송은주 (옮긴이)',
      image_url:
        'https://image.aladin.co.kr/product/35722/43/cover500/k352036331_3.jpg',
    },
    quantity: 2,
    price: 20000,
  },
  {
    id: crypto.randomUUID(),
    bookInfo: {
      title: '소년이 온다 - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      image_url:
        'https://image.aladin.co.kr/product/4086/97/cover500/8936434128_2.jpg',
    },
    quantity: 3,
    price: 15000,
  },
];

//@TODO: store로 보낼 때 이런 형태로 보내달라고 요청하기!
const initialState = {
  cartBooks: MOCK_DATA,
  totalPrice: calculateTotalPrice(MOCK_DATA),
  checkedBooks: [],
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
        set(() => ({
          checkedBooks: [],
        })),
      deleteBooks: (ids) =>
        set((state) => {
          const { newCartBooks, totalPrice } = deleteFromCart(
            state.cartBooks,
            ids
          );
          return {
            cartBooks: newCartBooks,
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
