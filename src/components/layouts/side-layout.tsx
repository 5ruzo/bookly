import { ReactNode } from 'react';

export default function SideLayout({
  SidebarContent,
  children,
}: {
  SidebarContent: any;
  children: ReactNode;
}) {
  return (
    <>
      <main className='flex justify-center mt-[122px] gap-[71px]'>
        <aside>
          <div className='w-[194px] border-t border-b border-solid px-[16px] py-[20px]'>
            <SidebarContent />
          </div>
        </aside>
        <section>{children}</section>
      </main>
    </>
  );
}
