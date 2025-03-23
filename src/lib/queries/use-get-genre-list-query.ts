import { QUERY_KEY } from '@/constants/qurey-key';
import { useQuery } from '@tanstack/react-query';
import { fetchGetGenreList } from '../api/book-list.api';
import { useEffect, useState } from 'react';
import { DEFAULT_GENRE_LIST_ON_ERROR } from '@/constants/book-list';

export const useGetGenreListQuery = () => {
  const { data, error, isPending } = useQuery<string[], Error>({
    queryKey: [QUERY_KEY.GENRES],
    queryFn: fetchGetGenreList,
    retry: false,
  });

  const [genreList, setGenreList] = useState<string[]>([]);

  useEffect(() => {
    //장르 리스트가 잘 불러와지면 불러온 장르 리스트 리턴
    if (data) {
      setGenreList(data);
    }
    //에러가 났을 때 설정해둔 디폴트 장르 리스트 리턴
    if (error) {
      console.log(error);
      setGenreList(DEFAULT_GENRE_LIST_ON_ERROR);
    }
  }, [data, error]);

  return { genreList, error, isPending };
};
