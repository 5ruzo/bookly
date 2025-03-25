import { BestSeller, RecommendedBooks } from '@/types/common.type';

/**
 * 베스트셀러 도서 목록을 가져오는 비동기 함수
 *
 * 베스트셀러 랭킹이 12위 이하인 도서들을 랭킹 오름차순으로 정렬하여 반환합니다.
 *
 * @returns {Promise<BestSeller[]>} 베스트셀러 도서 목록
 */
export const fetchGetBooksByBestseller = async (): Promise<BestSeller[]> => {
  const queryString = 'books?best_rank=lte.12&order=best_rank.asc';
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

  const data: BestSeller[] = await res.json();

  return data;
};

/**
 * 추천 도서 데이터의 초기 응답 형식을 정의하는 타입
 *
 * @type InitialData
 * @property {number} book_id - 도서 ID
 * @property {RecommendedBooks} books - 추천 도서 정보
 */
type InitialData = {
  book_id: number;
  books: RecommendedBooks;
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
  const queryString =
    'recommended_list?select=book_id,books(id, image_url, title, author, description, price, rating)';
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

  const data: InitialData[] = await res.json();
  const filterdData: RecommendedBooks[] = data.map(
    (item: InitialData) => item.books
  );
  console.log('filterdData =====>', filterdData);
  return filterdData;
};
