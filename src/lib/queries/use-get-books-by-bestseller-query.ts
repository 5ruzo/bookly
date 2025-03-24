'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetBooksByBestseller } from '../api/common.api';

export const useGetBooksByBestsellerQuery = () => {
  return useQuery({
    queryKey: ['BestSeller'],
    queryFn: fetchGetBooksByBestseller,
  });
};
