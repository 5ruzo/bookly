import { CarouselImages } from '@/types/home.type';
import browserClient from '../utils/supabase/client';

/**
 * @function fetchGetImagesByMainCarousel
 * @description 메인 캐러셀에 표시할 이미지 데이터를 Supabase에서 가져옵니다.
 * 활성화된 이미지만 가져오고 표시 순서(display_order)에 따라 오름차순으로 정렬합니다.
 *
 * @async
 * @returns {Promise<CarouselImages[]>} 메인 캐러셀 이미지 데이터 배열을 담은 Promise
 */
export const fetchGetImagesByMainCarousel = async (): Promise<
  CarouselImages[]
> => {
  const { data, error } = await browserClient
    .from('main_carousel_images')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(
      '메인 캐러셀 이미지를 가져오는 중 오류가 발생했습니다:',
      error
    );
    throw error;
  }

  return data as CarouselImages[];
};

/**
 * @function fetchGetImagesByStripBanners
 * @description 띠배너 영역에 표시할 이미지 데이터를 Supabase에서 가져옵니다.
 * 활성화된 배너만 가져오고 표시 순서(display_order)에 따라 오름차순으로 정렬합니다.
 *
 * @async
 * @returns {Promise<CarouselImages[]>} 띠배너 이미지 데이터 배열을 담은 Promise
 */
export const fetchGetImagesByStripBanners = async (): Promise<
  CarouselImages[]
> => {
  const { data, error } = await browserClient
    .from('strip_banners')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(
      '스트립 배너 이미지를 가져오는 중 오류가 발생했습니다:',
      error
    );
    throw error;
  }

  return data as CarouselImages[];
};
