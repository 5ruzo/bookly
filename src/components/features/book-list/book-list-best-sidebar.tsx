'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BookListBestSidebar({
  genreList,
}: {
  genreList: string[];
}) {
  const params = useParams();
  const genreFromPath = decodeURIComponent(params.genre as string);

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
