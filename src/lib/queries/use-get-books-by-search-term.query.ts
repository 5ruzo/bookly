'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetSearchedBookList } from '../api/search.api';

export const useGetBooksBySearchTerm = (searchTerm: string) => {
  return useQuery({
    queryKey: [searchTerm],
    queryFn: () => fetchGetSearchedBookList(searchTerm),
  });
};
