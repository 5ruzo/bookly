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
      SidebarContent={() => <>{/* 필터를 담당할 컴포넌트 생성해서 넣기 */}</>}
    >
      {children}
    </SideLayout>
  );
}
