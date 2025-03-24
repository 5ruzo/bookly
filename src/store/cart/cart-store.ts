import { TypeCartBooks, TypeCartItem } from '@/types/cart/cart.type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TypeCartStore = {
  cartBooks: TypeCartItem[];
  increaseQuantity: (id: TypeCartBooks['id']) => void;
  decreaseQuantity: (id: TypeCartBooks['id']) => void;
  updateQuantity: (
    id: TypeCartBooks['id'],
    newQuantity: TypeCartBooks['quantity']
  ) => void;
};

//@TODO: store로 보낼 때 이런 형태로 보내달라고 요청하기!
const initialState = {
  cartBooks: [
    {
      id: crypto.randomUUID(),
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
  ],
};

const useCartStore = create<TypeCartStore>()(
  persist(
    (set) => ({
      ...initialState,
      increaseQuantity: (id) =>
        set((state) => ({
          cartBooks: handleQuantity(state.cartBooks, id, 'increase'),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          cartBooks: handleQuantity(state.cartBooks, id, 'decrease'),
        })),
      updateQuantity: (id, newQuantity) =>
        set((state) => ({
          cartBooks: state.cartBooks.map((book) =>
            book.id === id ? { ...book, quantity: newQuantity } : book
          ),
        })),
    }),
    {
      name: 'cartList',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const handleQuantity = (
  books: TypeCartItem[],
  id: TypeCartItem['id'],
  type: 'increase' | 'decrease'
) => {
  return books.map((book) =>
    book.id === id
      ? {
          ...book,
          quantity: type === 'increase' ? book.quantity + 1 : book.quantity - 1,
        }
      : book
  );
};

export default useCartStore;
