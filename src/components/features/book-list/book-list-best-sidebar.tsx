'use client';

import { DEFAULT_GENRE_LIST_ON_ERROR } from '@/constants/book-list';
import { useGetGenreListQuery } from '@/lib/queries/use-get-genre-list-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BookListBestSidebar() {
  const params = useParams();
  const genreFromPath = decodeURIComponent(params.genre as string);

  const { genreList, isPending } = useGetGenreListQuery();

  if (isPending) {
    return (
      <div className='w-[162px] h-[500px] bg-gray animate-pulse rounded'></div>
    );
  }

  return (
    <nav>
      <ul>
        {genreList.map((genreItem) => {
          //장르 구분자가 '/'로 들어가면 각 구분 페이지로 인식되기 때문에, 이를 '-'로 변경하여 처리
          const formattedGenreForUrl = genreItem.replace(/\//g, '-');

          const bgColor =
            genreItem === genreFromPath.replace(/-/g, '/') && 'bg-secondary';
          return (
            <Link key={genreItem} href={`/book-list/${formattedGenreForUrl}`}>
              <li
                key={genreItem}
                className={`${bgColor} text-sm w-[162px] h-[26px] pl-[24px] flex items-center`}
              >
                {genreItem}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
