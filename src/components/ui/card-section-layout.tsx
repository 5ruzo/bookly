import { mergeClasses } from '@/lib/utils/common.util';
import { SectionContainerProps } from '@/types/common.type';
import { ChevronRight } from 'lucide-react';

import Link from 'next/link';
import React from 'react';

function CardSectionLayout({
  title,
  path,
  children,
  className,
}: SectionContainerProps) {
  return (
    <section className={mergeClasses('max-w-[1000px] mx-auto', className)}>
      <h2 className='ml-2 font-semibold text-lg mb-8'>
        {path ? (
          <Link href={path} className='flex items-center gap-1'>
            {title} <ChevronRight className='w-4' />
          </Link>
        ) : (
          title
        )}
      </h2>
      {children}
    </section>
  );
}

export default CardSectionLayout;
