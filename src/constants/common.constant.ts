// 스크롤 한 번에 슬라이드 될 개수
export const SLIDES_TO_ONE_SCROLL = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 4,
};
export const QUERY_KEYS = {
  BEST_SELLER: ['BEST_SELLER'],
  RECOMMENDED_BOOKS: ['RECOMMENDED_BOOKS'],
};

// 기본 배송비
export const DEFAULT_DELIVERY_FEE = 3500;
// 배송비 무료 최소 금액
export const MIN_FREE_DELIVERY_PRICE = 30000;

// Supabase base url
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

//Supabase API key
export const SUPABSE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
