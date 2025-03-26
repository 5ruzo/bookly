import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify } from 'lucide-react';

const SideDropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='md:min-w-28 flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AlignJustify color='var(--color-lightgray)' strokeWidth={2.5} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white border-gray mr-4'>
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SideDropdownMenu;
