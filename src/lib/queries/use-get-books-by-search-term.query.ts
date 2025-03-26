'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetSearchedBookList } from '../api/search.api';

export const useGetBooksBySearchTerm = (queryKey: (string | object)[]) => {
  return useQuery({
    queryKey,
    queryFn: () => fetchGetSearchedBookList(queryKey),
  });
};
