import { TypeCartItem } from '@/types/cart/cart.type';
import { CONTROL_TYPE } from '@/constants/quantity-control-constant';
const { INCREASE, DECREASE } = CONTROL_TYPE;

//**cart-store에서 사용하는 함수를 정의해둔 곳 */

/**
 * 장바구니에 책을 추가하는 함수
 * @remarks addedBooks를 추가할 때 꼭 형식에 맞게 넣어주세요 (TypeCartItem 참고)
 * @param originCartBooks - 기존에 장바구니에 추가되어있던 책
 * @param addedBooks - 장바구니에 새롭게 추가하려는 책
 * @returns 새로운 장바구니 리스트
 * @example addToCart({
 *  id:'stringId',
 *  quantity : 2,
 *  price : 1000,
 *  bookInfo : {
 *  title : '책',
 *  author : '저자',
 *  image_url: 'image.png'
 *  }
 * })
 */
export const addToCartBooks = (
  originCartBooks: TypeCartItem[],
  addedBooks: TypeCartItem[]
) => {
  const newCartBooks = [...originCartBooks];

  addedBooks.forEach((addedBook) => {
    const existingBook = newCartBooks.find(
      (newBook) => newBook.id === addedBook.id
    );
    if (existingBook) {
      existingBook.quantity += addedBook.quantity;
    } else {
      newCartBooks.push(addedBook);
    }
  });
  return newCartBooks;
};

/**
 * 사용자가 버튼이 아닌 타이핑으로 수량을 수정할 때 동작하는 함수
 * @param cartBooks - 장바구니에 들어있는 책의 수량을 핸들링하는 함수
 * @param id - 수정할 타겟 id
 * @param newQuantity - 수정할 수량
 * @returns 수량이 수정된 장바구니 리스트
 */
export const updateQuantity = (
  cartBooks: TypeCartItem[],
  id: TypeCartItem['id'],
  newQuantity: TypeCartItem['quantity']
) => {
  return cartBooks.map((book) =>
    book.id === id ? { ...book, quantity: newQuantity } : book
  );
};

/**
 * 개별 체크박스를 선택/해제하는 함수
 * @param checkedBooks - 기존이 이미 체크되어 있던 책들
 * @param newCheckedBook - 새롭게 체크하려는(체크 해제하려는) 책
 * @returns 체크박스가 적용된 책들
 */
export const toggleCheckedBooks = (
  checkedBooks: TypeCartItem['id'][],
  newCheckedBook: TypeCartItem['id']
): TypeCartItem['id'][] => {
  const checkedSet = new Set(checkedBooks);
  if (checkedSet.has(newCheckedBook)) checkedSet.delete(newCheckedBook);
  else checkedSet.add(newCheckedBook);
  return Array.from(checkedSet);
};

/**
 * 사용자가 버튼으로 책의 수량을 수정할 때 동작하는 함수
 * @param books - 장바구니에 담긴 책들
 * @param id - 수정할 책의 id
 * @param type - 수정하려는 방식 (증가 or 감소)
 * @returns 수량이 수정된 책들
 */
export const handleQuantity = (
  books: TypeCartItem[],
  id: TypeCartItem['id'],
  type: typeof INCREASE | typeof DECREASE
) => {
  return books.map((book) =>
    book.id === id
      ? {
          ...book,
          quantity: type === INCREASE ? book.quantity + 1 : book.quantity - 1,
        }
      : book
  );
};

/**
 * 장바구니에 담겨있는 책들의 전체 금액을 계산하는 함수
 * @param cartBooks - 장바구니에 담겨있는 책들
 * @returns 장바구니에 담겨있는 책들의 전체 금액
 */
export const calculateTotalPrice = (cartBooks: TypeCartItem[]): number => {
  return cartBooks.reduce((acc, book) => acc + book.price * book.quantity, 0);
};
