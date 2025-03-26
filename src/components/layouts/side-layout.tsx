import { ReactNode } from 'react';
import SideDropdownMenu from './side-dropdown-menu';

//사이드바의 기본 레이아웃과 스타일을 정의한 컴포넌트입니다
//해당하는 page폴더의 layout.tsx에 정의해서 사용합니다
//SidebarContent에 사이드바에 쓰일 컴포넌트를 넘겨주고 나머지는 children으로 넘겨주면 됩니다
export default function SideLayout({
  SidebarContent,
  children,
}: {
  SidebarContent: any;
  children: ReactNode;
}) {
  return (
    <main className='flex justify-center mt-[50px] gap-[71px]'>
      <div className='max-w-[1200px] flex justify-between'>
        {/* 작은사이즈일때 나타나는 사이드바 햄버거 */}
        <aside className='lg:hidden fixed top-[100px] left-0 z-50 bg-gray rounded-r-lg p-4'>
          <SideDropdownMenu>
            <SidebarContent />
          </SideDropdownMenu>
        </aside>
        {/* 보통사이즈일때 나타나는 사이드바 */}

        <aside className='hidden lg:block'>
          <div className='w-[194px]'>
            <div className='fixed border-t border-b border-solid px-[16px] py-[20px]'>
              <SidebarContent />
            </div>
          </div>
        </aside>
        <section className='w-auto lg:w-2/3'>{children}</section>
      </div>
    </main>
  );
}
