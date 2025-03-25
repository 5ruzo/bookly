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
  calcTotalPrice: () => void;
  checkAllBooks: (newCheckedBooks: TypeCartItem['id'][]) => void;
  setCheckedBooks: (newCheckedBook: TypeCartItem['id']) => void;
  resetCheckedBooks: () => void;
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
        set((state) => ({
          cartBooks: addToCartBooks(state.cartBooks, addedBooks),
        })),
      increaseQuantity: (id) =>
        set((state) => ({
          cartBooks: handleQuantity(state.cartBooks, id, INCREASE),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cartBooks: handleQuantity(state.cartBooks, id, DECREASE),
        })),
      updateQuantity: (id, newQuantity) =>
        set((state) => ({
          cartBooks: updateQuantity(state.cartBooks, id, newQuantity),
        })),
      calcTotalPrice: () =>
        set((state) => ({
          totalPrice: calculateTotalPrice(state.cartBooks),
        })),
      checkAllBooks: (newCheckedBooks) =>
        set((state) => ({
          checkedBooks: newCheckedBooks,
        })),
      setCheckedBooks: (newCheckedBook) =>
        set((state) => ({
          checkedBooks: toggleCheckedBooks(state.checkedBooks, newCheckedBook),
        })),
      resetCheckedBooks: () =>
        set(() => ({
          checkedBooks: [],
        })),
    }),
    {
      name: 'cartList',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
