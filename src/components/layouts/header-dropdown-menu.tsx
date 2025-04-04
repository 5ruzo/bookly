import { HeaderMenuProps } from '@/types/layout.type';
import Link from 'next/link';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify } from 'lucide-react';

const HeaderDropdownMenu = ({ menuList }: HeaderMenuProps) => {
  return (
    <div className='md:min-w-28 flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify color='var(--color-gray)' strokeWidth={2.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white border-gray mr-4'>
          {menuList.map((menu, index) => (
            <DropdownMenuItem
              key={index}
              className='text-md p-0'
              onClick={menu.onClick}
            >
              {menu.href ? (
                <Link
                  href={menu.href}
                  className='block w-full h-full px-2 py-1.5'
                >
                  {menu.text}
                </Link>
              ) : (
                <span className='block w-full h-full px-2 py-1.5 cursor-pointer'>
                  {menu.text}
                </span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderDropdownMenu;
