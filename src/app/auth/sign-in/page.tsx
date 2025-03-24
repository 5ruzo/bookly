'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/utils/auth/schemas';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

const SignInPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { user, signIn } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      await signIn(values.email, values.password, rememberMe);
      if (user !== null) {
        router.push('/');
      }
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-center justify-center p-6'>
        <div className='w-full h-[700px] max-h-[700px] max-w-[1000px] rounded-xl bg-[var(--color-secondary)] flex overflow-hidden'>
          {/* 이미지 영역 */}
          <div className='w-[50%] relative flex items-center justify-center'>
            <div className='relative w-full h-full max-w-full max-h-full'>
              <Image
                src='/images/login-image.png'
                alt='로그인 이미지'
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 768px) 100vw, 50vw'
                priority
              />
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className='p-6 w-[50%] '>
            <div className='w-[100%] h-full bg-[var(--color-white-light)] p-12 rounded-xl'>
              <h2 className='text-2xl font-semibold mb-6 text-left'>Sign In</h2>

              <form
                className='space-y-5 mt-16'
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label className='block text-base mb-2'>
                    이메일
                    <input
                      type='email'
                      {...register('email')}
                      className='w-full px-4 py-3 border rounded-xl bg-[var(--color-white-light)] text-base'
                      autoComplete='email'
                      placeholder='Email'
                    />
                  </label>
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.email && (
                      <span>{formState.errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-base mb-2'>
                    비밀번호
                    <input
                      type='password'
                      {...register('password')}
                      className='w-full px-4 py-3 border rounded-xl bg-[var(--color-white-light)] text-base'
                      autoComplete='current-password'
                      placeholder='Password'
                    />
                  </label>
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.password && (
                      <span>{formState.errors.password.message}</span>
                    )}
                  </div>
                </div>

                <div className='flex items-center justify-between text-base'>
                  <div className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id='rememberMe'
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor='rememberMe'>자동 로그인</label>
                  </div>
                  <Link
                    href='/forgot-password'
                    className='text-gray-500 hover:underline'
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                <button
                  disabled={!formState.isValid}
                  type='submit'
                  className='w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition'
                >
                  로그인
                </button>

                <button
                  type='button'
                  className='w-full py-3 bg-[#03CF5D] text-white rounded-xl flex items-center justify-center gap-2'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='30'
                    fill='none'
                    viewBox='-4 -4 32 30'
                    id='ico_logo'
                    x='32'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M15.817 22L8.074 10.612V22H0V0h8.187l7.743 11.386V0H24v22h-8.183z'
                      fill='url(#afpaint0_linear_3876_26143)'
                    />
                    <defs>
                      <linearGradient
                        id='afpaint0_linear_3876_26143'
                        x1='-12'
                        y1='11'
                        x2='9.917'
                        y2='34.909'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='var(--color-white-light)' />
                        <stop offset='0' stopColor='var(--color-white-light)' />
                        <stop offset='1' stopColor='var(--color-white-light)' />
                      </linearGradient>
                    </defs>
                  </svg>{' '}
                  네이버 로그인
                </button>
              </form>

              <div className='mt-6 text-center text-sm'>
                <p>
                  계정이 없으신가요?{' '}
                  <Link
                    href='/auth/sign-up'
                    className='text-blue-600 hover:underline'
                  >
                    회원가입
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
