import { BestSeller, RecommendedBooks } from '@/types/common.type';
import browserClient from '../utils/supabase/client';

/**
 * 베스트셀러 도서 목록을 가져오는 비동기 함수
 *
 * 베스트셀러 랭킹이 12위 이하인 도서들을 랭킹 오름차순으로 정렬하여 반환합니다.
 *
 * @returns {Promise<BestSeller[]>} 베스트셀러 도서 목록
 */
export const fetchGetBooksByBestseller = async (): Promise<BestSeller[]> => {
  const { data, error } = await browserClient
    .from('books')
    .select('*')
    .lte('best_rank', 12)
    .order('best_rank', { ascending: true });

  if (error) {
    console.error('베스트셀러 도서를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }

  return data as BestSeller[];
};

/**
 * 추천 도서 목록을 가져오는 비동기 함수
 *
 * 추천 도서 목록과 각 도서의 상세 정보(ID, 이미지 URL, 제목, 저자, 설명, 가격, 평점)를 가져옵니다.
 * 초기 응답에서 도서 정보만 필터링하여 반환합니다.
 *
 * @returns {Promise<RecommendedBooks[]>} 추천 도서 목록
 */
export const fetchGetBooksByRecommend = async (): Promise<
  RecommendedBooks[]
> => {
  const { data, error } = await browserClient
    .from('recommended_list')
    .select(
      'book_id, books(id, image_url, title, author, description, price, rating)'
    );

  if (error) {
    console.error('추천 도서 목록을 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }

  const filteredData: RecommendedBooks[] = data
    .map((item) => item.books)
    .flat();

  return filteredData;
};
