'use client';

import MyPageSideBar from '@/components/features/my-page/my-page-side-bar';
import SideLayout from '@/components/layouts/side-layout';
import { useAuthStore } from '@/store/use-auth-store';

export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((state) => state.user);
  return (
    <div className='px-12 w-full min-h-[calc(100vh-16rem)]'>
      <SideLayout SidebarContent={() => <MyPageSideBar />}>
        {user ? (
          <div className='flex items-end'>
            <h2 className='text-xl'>{user.email}님,</h2>{' '}
            <span className='text-primary text-lg'>안녕하세요</span>
          </div>
        ) : (
          <div className='flex items-end'>
            <h2 className='text-xl'>로그인이 필요한 페이지입니다.</h2>
          </div>
        )}

        <hr className='my-6' />
        {children}
      </SideLayout>
    </div>
  );
}
