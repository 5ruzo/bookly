'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useGetRecommendSearches } from '@/lib/queries/use-get-recommend-searches.query';

export function SearchBarComboBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm: string = searchParams.get('query') || '';
  const [inputTextSearchBar, setInputTextSearchBar] =
    useState<string>(searchTerm);

  const [isSuggestionsView, setIsSuggestionsView] = useState<boolean>(false);

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
      className='relative'
      tabIndex={0}
      onFocus={() => {
        console.log('ON focus');
        setIsSuggestionsView(true);
        setInputTextSearchBar('');
      }}
      onBlur={() => {
        console.log('ON BLur');
        setIsSuggestionsView(false);
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
        <ul className='absolute w-full bg-white border rounded mt-1 shadow-lg'>
          <li className='pt-2 pl-2 text-gray text-sm'>추천목록</li>
          {suggestions?.map((suggestion) => (
            <li
              key={suggestion}
              className={'p-2 cursor-pointer'}
              onClick={(e) => {
                e.stopPropagation();
                setIsSuggestionsView(false);
                setInputTextSearchBar(suggestion);
                handleSearch(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
