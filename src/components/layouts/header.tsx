'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LinkItem } from '@/types/layout.type';
import HeaderDropdownMenu from './header-dropdown-menu';
import { authService } from '@/lib/api/auth-service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import { SearchBarComboBox } from '../features/search/search-search-bar';
import { Suspense } from 'react';

const Header = () => {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();

  const navigationLinks: LinkItem[] = user
    ? [
        { text: '마이페이지', href: '/my-page/like-list' },
        { text: '장바구니(0)', href: '/cart' },
        {
          text: '로그아웃',
          onClick: async () => {
            await authService.signOut();
            clearUser();
            alert('로그아웃 성공!');
            router.push('/');
          },
        },
      ]
    : [
        { text: '로그인', href: '/auth/sign-in' },
        { text: '회원가입', href: '/auth/sign-up' },
      ];

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
          <Suspense
            fallback={
              <div className='block bg-lightgray h-14 rounded-2xl w-full pl-12 md:pl-16 outline-none border-1 border-lightgray'></div>
            }
          >
            <SearchBarComboBox />
          </Suspense>
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
