import BookListItem from '@/components/features/book-list/book-list-item';
import SearchResultView from '@/components/features/search/search-result-view';
import { BOOK_LIST_REVALIDATE_TIME } from '@/constants/book-list';
import { fetchGetBookListByTop50Rank } from '@/lib/api/book-list.api';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: { genre: string };
}) {
  const searchString = '해당책';
  return {
    title: ` ${searchString} 검색결과 - Bookly에서 책 찾아보기`,
    description: `Bookly에서 '${searchString}의 검색결과를 확인하세요.`,

    openGraph: {
      title: `Bookly - '${searchString}'에 대한 검색 결과 확인하기`,
      description: `Bookly에서 '${searchString}의 검색결과를 확인하세요.`,
      images: '/images/logo.png',
    },
  };
}
export default async function BookListPage() {
  return <SearchResultView />;
}
