'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/home.constant';
import { fetchGetImagesByMainCarousel } from '../api/home.api';

export const useGetImagesByMainCarousel = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MAIN_CAROUSEL_IMAGE,
    queryFn: fetchGetImagesByMainCarousel,
  });
};
