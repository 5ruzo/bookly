import { CarouselImages } from '@/types/home.type';

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
  const queryString =
    'main_carousel_images?is_active=eq.true&order=display_order.asc';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        Prefer: 'return=minimal',
      },
    }
  );
  const data: CarouselImages[] = await res.json();

  return data;
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
  const queryString = 'strip_banners?is_active=eq.true&order=display_order.asc';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        Prefer: 'return=minimal',
      },
    }
  );
  const data: CarouselImages[] = await res.json();

  return data;
};
