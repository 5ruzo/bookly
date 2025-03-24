'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetBooksByRecommend } from '../api/common.api';
import { QUERY_KEYS } from '../../constants/common.constant';

export const useGetBooksByRecommendQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RECOMMENDED_BOOKS,
    queryFn: fetchGetBooksByRecommend,
  });
};
