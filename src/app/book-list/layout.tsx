import BookListBestSidebar from '@/components/features/book-list/book-list-best-sidebar';
import SideLayout from '@/components/layouts/side-layout';
import { fetchGetGenreList } from '@/lib/api/book-list.api';

export default async function BooKListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const genreList = await fetchGetGenreList();

  return (
    <SideLayout
      SidebarContent={() => <BookListBestSidebar genreList={genreList} />}
    >
      {children}
    </SideLayout>
  );
}
