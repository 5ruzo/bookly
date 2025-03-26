'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useGetRecommendSearches } from '@/lib/queries/use-get-recommend-searches.query';

export function SearchBarComboBox() {
  const router = useRouter();
  const pathName = usePathname();

  //검색어 인풋창 관련 훅들
  const searchParams = useSearchParams();
  const searchTerm: string = searchParams.get('query') || '';
  const [inputTextSearchBar, setInputTextSearchBar] =
    useState<string>(searchTerm);
  useEffect(() => {
    if (pathName !== '/search') setInputTextSearchBar('');
  }, [pathName]);

  //추천검색어창 관련훅들
  const [isSuggestionsView, setIsSuggestionsView] = useState<boolean>(false);
  const isMouseOverSuggestionsView = useRef(true);
  const { data: suggestions } = useGetRecommendSearches();

  //추천검색어를 누르거나 폼 입력했을 때 실행
  const handleSearch = (query: string) => {
    const option = searchParams.get('option');
    const searchQuery = query || inputTextSearchBar;

    if (searchQuery === '') return;

    if (option) {
      router.push(`/search?query=${searchQuery}&option=${option}`);
    } else {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const handleSearchInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch('');
  };

  return (
    <div
      className='relative z-[51]'
      onFocus={() => {
        setIsSuggestionsView(true);
      }}
      onBlur={() => {
        if (isMouseOverSuggestionsView.current) setIsSuggestionsView(false);
        setInputTextSearchBar(searchTerm);
      }}
    >
      <form onSubmit={handleSearchInputSubmit}>
        <label className='relative'>
          <Search
            color='var(--color-primary)'
            strokeWidth={2.5}
            className='absolute top-1/2 -translate-y-1/2 left-4 md:left-6 w-4 md:w-6'
          />
          <input
            type='text'
            value={inputTextSearchBar}
            className='block h-14 rounded-2xl w-full pl-12 md:pl-16 outline-none border-1 border-lightgray'
            placeholder='Bookly에서 가장 재밌는 책은?'
            onChange={(e) => {
              setInputTextSearchBar(e.target.value);
              if (e.target.value === '') setIsSuggestionsView(true);
              else setIsSuggestionsView(false);
            }}
          />
        </label>
      </form>
      {isSuggestionsView && (
        <div
          className='absolute w-full bg-white border border-lightgray rounded-xl mt-1 flex flex-col'
          onMouseEnter={() => {
            isMouseOverSuggestionsView.current = false;
          }}
          onMouseLeave={() => {
            isMouseOverSuggestionsView.current = true;
          }}
        >
          <div className='py-3 pl-5 text-gray text-sm'>추천목록</div>
          {suggestions?.map((suggestion) => (
            <button
              key={suggestion}
              type='button'
              className={'pl-5 pb-3 cursor-pointer w-full text-start'}
              onClick={(e) => {
                setIsSuggestionsView(false);
                setInputTextSearchBar(suggestion);
                handleSearch(suggestion);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
