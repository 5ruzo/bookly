'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetBooksByRecommend } from '../api/common.api';

export const useGetBooksByRecommendQuery = () => {
  return useQuery({
    queryKey: ['RecommendBooks'],
    queryFn: fetchGetBooksByRecommend,
  });
};
