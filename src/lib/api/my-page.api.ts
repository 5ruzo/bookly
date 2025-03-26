import { LikeList, OrderDetailInfo } from '@/types/my-page.type';
import browserClient from '../utils/supabase/client';

export const fetchGetOrderDetails = async (
  userId: string
): Promise<OrderDetailInfo[]> => {
  const { data, error } = await browserClient
    .from('order_list')
    .select(
      `
      id,
      created_at,
      user_id,
      total_price,
      order_details (
        id,
        book_id,
        order_id,
        quantity,
        books (
          id,
          genre,
          price,
          title,
          author,
          rating,
          best_rank,
          image_url,
          publisher,
          description,
          published_date
        )
      )
    `
    )
    .eq('user_id', userId)
    .returns<OrderDetailInfo[]>();

  if (error) {
    throw new Error('주문 내역 가져오기 실패');
  }

  return data;
};

export const fetchGetLikeList = async (
  userId: string | undefined
): Promise<LikeList[]> => {
  const { data, error } = await browserClient
    .from('likes')
    .select(`*, book:books(*)`)
    .eq('user_id', userId);

  if (error) {
    throw new Error('찜 목록 가져오기 실패');
  }

  return data;
};
