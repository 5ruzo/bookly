'use client';

import BookListItem from '../book-list/book-list-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetBooksBySearchTerm } from '@/lib/queries/use-get-books-by-search-term.query';
import SearchLoading from '@/app/search/loading';
import SearchNoSearchResult from './search-no-search-result';

export default function SearchResultView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchTerm = searchParams.get('query');
  const option = searchParams.get('option');

  //검색값이 비어있으면 홈으로 리다이렉트
  if (!searchTerm) router.push('/');

  const queryKey: (string | object)[] = [searchTerm as string];

  if (option) {
    const optionGenreList = option.split(' ');
    const optionObj: Record<string, string> = {};
    optionGenreList.forEach((genre) => {
      optionObj[genre] = genre;
    });

    queryKey.push(optionObj);
  }

  const {
    data: bookList,
    isPending,
    error,
  } = useGetBooksBySearchTerm(queryKey as (string | object)[]);

  if (isPending) {
    return <SearchLoading />;
  }

  if (error) {
    return <></>; // 에러시 에러 페이지 만든다음 에러페이지로 이동시키기
  }

  //검색결과가 없을 때
  if (bookList.length === 0) {
    return <SearchNoSearchResult />;
  }

  return (
    <ul className='flex flex-col gap-[70px] min-h-[calc(100vh-24rem)]'>
      {bookList?.map((book) => {
        return (
          <BookListItem
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            price={book.price}
            description={book.description}
            image_url={book.image_url}
          />
        );
      })}
    </ul>
  );
}
