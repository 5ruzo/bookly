'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/authService';
import { useAuthStore } from '@/store/useAuthStore';

const SignIn = () => {
  const { setUser, setError, error } = useAuthStore();
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  // react-hook-form을 설정
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema), // zod 스키마로 유효성 검사 적용
  });

  // 로그인 폼 제출 시 호출되는 함수
  const onSubmit = async (values: FieldValues) => {
    try {
      const { data, error } = await authService.signIn(
        values.email,
        values.password,
        rememberMe // rememberMe 옵션 추가
      );

      if (error) {
        setError(error);
        return;
      }

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      if (data?.user) {
        setUser(data.user);
        alert('로그인 성공!');
        router.push('/');
      }
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* 페이지 전체를 감싸는 컨테이너 */}
      <div className='flex flex-1 items-start justify-center p-6'>
        {/* 로그인 카드 */}
        <div className='w-full h-[700px] max-h-[700px] max-w-[1000px] rounded-xl bg-[var(--color-secondary)] flex overflow-hidden'>
          {/* 좌측: 이미지 영역 */}
          <div className='w-[45%] relative flex items-center justify-center'>
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
          <div className='p-6 w-[55%]'>
            <div className='flex flex-col justify-center w-[100%] h-full bg-[var(--color-white-light)] p-12 rounded-xl'>
              <h2 className='text-2xl mb-6 text-left'>로그인</h2>

              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                  아이디 또는 비밀번호가 잘못 되었습니다.
                  <br /> 아이디와 비밀번호를 정확히 입력해 주세요.
                </div>
              )}

              {/* 로그인 입력 폼 */}
              <form
                className='space-y-5 mt-8'
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* 이메일 입력 필드 */}
                <div>
                  <label className='block text-base'>
                    이메일
                    <input
                      type='email'
                      {...register('email')}
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      autoComplete='email'
                      placeholder='Email'
                    />
                  </label>
                  {/* 이메일 유효성 검사 오류 메시지 */}
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.email && (
                      <span>{formState.errors.email.message as string}</span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 입력 필드 */}
                <div>
                  <label className='block text-base mb-2'>
                    비밀번호
                    <input
                      type='password'
                      {...register('password')}
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      autoComplete='current-password'
                      placeholder='Password'
                    />
                  </label>
                  {/* 비밀번호 유효성 검사 오류 메시지 */}
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.password && (
                      <span>{formState.errors.password.message as string}</span>
                    )}
                  </div>
                </div>

                {/* 자동 로그인 & 비밀번호 찾기 링크 */}
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
                    href='forgot-password'
                    className='text-gray-500 hover:underline'
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                {/* 로그인 버튼 */}
                <button
                  disabled={!formState.isValid} // 유효하지 않거나 로딩 중일 때 비활성화
                  type='submit'
                  className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-gray-800 transition'
                >
                  로그인
                </button>

                {/* 네이버 로그인 버튼 */}
                <button
                  type='button'
                  className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center gap-2'
                >
                  {/* 네이버 로고 SVG */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='30'
                    fill='none'
                    viewBox='-4 -4 32 30'
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
                      </linearGradient>
                    </defs>
                  </svg>
                  네이버 로그인
                </button>
              </form>

              {/* 회원가입 링크 */}
              <div className='mt-6 text-center text-sm'>
                <p>
                  계정이 없으신가요?{' '}
                  <Link
                    href='/sign-up'
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

export default SignIn;
