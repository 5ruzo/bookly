import { Book } from '@/types/book-list.type';
import browserClient from '../utils/supabase/client';

export const fetchGetSearchedBookList = async (
  queryKey: (string | object)[]
): Promise<Book[]> => {
  const searchTerm = queryKey[0] as string;
  const genreFilter = queryKey[1] ? Object.values(queryKey[1]) : [];

  let query = browserClient
    .from('books')
    .select('*')
    .ilike('title', `%${searchTerm}%`);

  if (genreFilter.length > 0) {
    query = query.in('genre', genreFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.error('도서를 검색하는 중 오류가 발생했습니다:', error);
    throw error;
  }

  return data as Book[];
};

export const fetchGetRecommendedSearchKeywordList = async (): Promise<
  string[]
> => {
  const { data, error } = await browserClient
    .from('recommended_searches')
    .select('keyword');

  if (error) {
    console.error('추천 검색어를 가져오는 중 오류가 발생했습니다:', error);
    throw error;
  }

  return data?.map((obj) => obj.keyword) || [];
};
