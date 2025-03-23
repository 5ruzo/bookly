'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const genreArray = [
  '만화',
  '소설',
  '자기계발',
  '에세이',
  '경제',
  '사회과학',
  '좋은부모',
];

export default function BookListBestSidebar() {
  const params = useParams();
  const genre = params.genre && decodeURIComponent(params.genre as string);

  return (
    <nav>
      <ul>
        {genreArray.map((genreItem) => {
          const bgColor = genreItem === genre && 'bg-secondary';
          return (
            <Link href={`/book-list/${genreItem}`}>
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
