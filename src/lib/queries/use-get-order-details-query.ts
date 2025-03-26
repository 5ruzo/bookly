import { OrderDetailInfo } from '@/types/my-page.type';
import { useQuery } from '@tanstack/react-query';
import { fetchGetOrderDetails } from '../api/my-page.api';
import { QUERY_KEYS } from '@/constants/my-page.constant';

export function useGetOrderDetailsQuery(userId: string) {
  const { data, isLoading, isError } = useQuery<OrderDetailInfo[], Error>({
    queryKey: QUERY_KEYS.ORDER_DETAILS(userId),
    queryFn: () => fetchGetOrderDetails(userId),
    enabled: Boolean(userId),
  });

  return { data, isLoading, isError };
}
