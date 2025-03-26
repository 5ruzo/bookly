'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchGetRecommendedSearchKeywordList } from '../api/search.api';
import { SEARCH_QUERY_KEYS } from '@/constants/search.constant';

export const useGetRecommendSearches = () => {
  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.RECOMMEND,
    queryFn: fetchGetRecommendedSearchKeywordList,
  });
};
