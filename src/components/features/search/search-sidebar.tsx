'use client';

import { SearchCheckBox } from './search-checkbox';

export default function SearchSidebar({ genreList }: { genreList: string[] }) {
  return (
    <aside>
      <SearchCheckBox genreList={genreList} />
    </aside>
  );
}
