'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetBooksByBestseller } from '../api/common.api';
import { QUERY_KEYS } from '@/constants/common.constant';

export const useGetBooksByBestsellerQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BEST_SELLER,
    queryFn: fetchGetBooksByBestseller,
  });
};
