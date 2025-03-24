'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { LinkItem } from '@/types/layout.type';
import HeaderDropdownMenu from './header-dropdown-menu';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { signOut, isAuthenticated } = useAuthStore();

  const [inputTextSearchBar, setInputTextSearchBar] = useState<string>('');
  const router = useRouter();

  const navigationLinks: LinkItem[] = isAuthenticated
    ? [
        { text: '마이페이지', href: '/mypage' },
        { text: '장바구니(0)', href: '/cart' },
        {
          text: '로그아웃',
          onClick: () => {
            signOut();
          },
        },
      ]
    : [
        { text: '로그인', href: '/sign-in' },
        { text: '회원가입', href: '/sign-up' },
      ];

  const handleSearchInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTextSearchBar === '') return;
    router.push(`/search?query=${inputTextSearchBar}`);
  };

  return (
    <header className='flex flex-col'>
      <div className='flex bg-secondary px-6 md:px-10 items-center justify-between h-24 gap-6 md:gap-0'>
        <h1 className='hidden md:block h-full aspect-[4/3]'>
          <Link href='/' className='block relative w-full h-full'>
            <Image
              src='/images/logo.png'
              fill
              sizes='20vw'
              alt='bookly'
              priority
              className='relative'
            />
          </Link>
        </h1>
        <div className='flex-1 md:flex-none md:w-[40%]'>
          <form onSubmit={handleSearchInputSubmit}>
            <label className='relative'>
              <Search
                color='var(--color-primary)'
                strokeWidth={2.5}
                className='absolute top-1/2 -translate-y-1/2 left-4 md:left-6 w-4 md:w-6 '
              />
              <input
                type='text'
                value={inputTextSearchBar}
                className='block h-14 rounded-2xl w-full pl-12 md:pl-16 outline-none border-1 border-lightgray'
                placeholder='Bookly에서 가장 재밌는 책은?'
                onChange={(e) => {
                  setInputTextSearchBar(e.target.value);
                }}
              />
            </label>
          </form>
        </div>
        <HeaderDropdownMenu menuList={navigationLinks} />
      </div>
      <div className='bg-white'>
        <ul className='flex justify-center gap-20 py-2 text-md'>
          <li>
            <Link href='/'>홈</Link>
          </li>
          <li>
            <Link href='/book-list/best'>베스트</Link>
          </li>
          <li>
            <Link href='/book-list/new'>신상품</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
