import BookListBestSidebar from '@/components/features/book-list/book-list-best-sidebar';
import SideLayout from '@/components/layouts/side-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SideLayout SidebarContent={BookListBestSidebar}>{children}</SideLayout>
  );
}
