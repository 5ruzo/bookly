import { ReactNode } from 'react';

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
    <main className='flex justify-center mt-[122px] gap-[71px]'>
      <aside>
        <div className='w-[194px] border-t border-b border-solid px-[16px] py-[20px]'>
          <SidebarContent />
        </div>
      </aside>
      <section>{children}</section>
    </main>
  );
}
