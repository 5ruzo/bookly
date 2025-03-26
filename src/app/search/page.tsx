import SearchResultView from '@/components/features/search/search-result-view';
import React from 'react';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const searchString = searchParams.query;

  return {
    title: ` '${searchString}' 책 제목 검색결과 - Bookly에서 책 찾아보기`,
    description: `Bookly에서 '${searchString}'의 검색결과를 확인하세요.`,

    openGraph: {
      title: `Bookly - '${searchString}'에 대한 검색 결과 확인하기`,
      description: `Bookly에서 '${searchString}'의 검색결과를 확인하세요.`,
      images: '/images/logo.png',
    },
  };
}
export default async function BookListPage() {
  return <SearchResultView />;
}
