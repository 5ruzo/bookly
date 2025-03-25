import MyPageSideBar from '@/components/features/my-page/my-page-side-bar';
import SideLayout from '@/components/layouts/side-layout';

const tempUser = 'test@sparta.com';

export default async function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='pt-8'>
      <SideLayout SidebarContent={() => <MyPageSideBar />}>
        <div className='flex items-end'>
          <h2 className='text-xl'>{tempUser}님,</h2>{' '}
          <span className='text-primary text-lg'>안녕하세요</span>
        </div>
        <hr className='my-6' />
        {children}
      </SideLayout>
    </div>
  );
}
