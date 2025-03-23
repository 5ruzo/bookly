import { QUERY_KEY } from '@/constants/qurey-key';
import { useQuery } from '@tanstack/react-query';
import { fetchGetGenreList } from '../api/book-list.api';

export const useGetGenreListQuery = () => {
  const { data, error, isPending } = useQuery<string[], Error>({
    queryKey: [QUERY_KEY.GENRES],
    queryFn: fetchGetGenreList,
    retry: false,
  });

  return { data, error, isPending };
};
