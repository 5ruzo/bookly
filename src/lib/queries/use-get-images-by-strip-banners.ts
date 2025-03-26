'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/home.constant';
import { fetchGetImagesByStripBanners } from '../api/home.api';

export const useGetImagesByStripBanners = () => {
  return useQuery({
    queryKey: QUERY_KEYS.STRIP_BANNERS,
    queryFn: fetchGetImagesByStripBanners,
  });
};
