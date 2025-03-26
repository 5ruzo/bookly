import { API_KEY, SUPABASE_URL } from '@/constants/detail.constans';
import { TypeOrderedBook } from '@/types/order.type';

export const createOrderList = async (payload: {
  userId: string;
  totalPrice: number;
}) => {
  const { userId, totalPrice } = payload;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/order_list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      apikey: API_KEY || '',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ user_id: userId, total_price: totalPrice }),
  });

  if (!res.ok) throw new Error('주문 리스트 생성을 실패했습니다.');
  const data = await res.json();
  return data[0].id;
};

export const createOrderDetails = async (orderedData: {
  orderedBooks: TypeOrderedBook[];
  orderId: number | string;
}) => {
  const { orderedBooks, orderId } = orderedData;
  const orderDetails = orderedBooks.map((book) => ({
    order_id: orderId,
    book_id: book.bookId,
    quantity: book.quantity,
  }));

  const res = await fetch(`${SUPABASE_URL}/rest/v1/order_details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      apikey: API_KEY || '',
    },
    body: JSON.stringify(orderDetails),
  });
  if (!res.ok) throw new Error('주문 내역을 생성하는데 실패했습니다.');
};
