import { API_KEY, SUPABASE_URL } from '@/constants/my-page.constant';

export const fetchGetOrderDetails = async (userId: string) => {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/order_list?user_id=eq.${userId}&select=id,created_at,user_id,total_price,order_details(id,book_id,order_id,quantity,books(id,genre,price,title,author,rating,best_rank,image_url,publisher,description,published_date))`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        apikey: API_KEY || '',
      },
    }
  );

  const data = await res.json();

  return data;
};
