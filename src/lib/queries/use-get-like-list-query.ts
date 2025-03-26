import { LikeList } from '@/types/my-page.type';
import { useQuery } from '@tanstack/react-query';
import { fetchGetLikeList } from '../api/my-page.api';
import { QUERY_KEYS } from '@/constants/my-page.constant';

export function useGetLikeListQuery(userId: string) {
  const { data, isLoading, isError } = useQuery<LikeList[], Error>({
    queryKey: QUERY_KEYS.LIKE_LIST(userId),
    queryFn: () => fetchGetLikeList(userId),
    enabled: Boolean(userId),
  });

  return { data, isLoading, isError };
}
