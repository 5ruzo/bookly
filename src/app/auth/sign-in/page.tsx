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

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 메서드 호출
      await authService.signInWithKakao();
    } catch (err) {
      // 오류 핸들링
      console.error('카카오 로그인 실패:', err);
      alert('로그인에 실패했습니다.');
    }
  };

  // 로그인 폼 제출 시 호출되는 함수
  const onSubmit = async (values: FieldValues) => {
    try {
      const { data, error } = await authService.signIn(
        values.email,
        values.password
      );

      if (error) {
        setError(error);
        return;
      }

      if (data?.user) {
        setUser(data.user);
        alert('로그인 성공!');
        router.push('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className='flex min-h-screen items-start justify-center px-4 py-6'>
      {/* 로그인 카드 */}
      <div className='w-full max-w-4xl rounded-xl bg-[var(--color-secondary)] flex flex-col md:flex-row overflow-hidden shadow-lg'>
        {/* 이미지 영역 - 모바일과 데스크톱에서 조건부 렌더링 */}
        <div className='hidden md:block md:w-1/2 relative'>
          <div className='relative w-full h-full min-h-[500px]'>
            <Image
              src='/images/login-image.png'
              alt='회원가입 이미지'
              fill
              priority
              style={{ objectFit: 'contain' }}
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
        </div>
        {/* 폼 영역 */}
        <div className='w-full md:w-[55%] p-6'>
          <div className='flex flex-col justify-center w-full h-full bg-[var(--color-white-light)] p-6 md:p-12 rounded-xl'>
            <h2 className='text-2xl mb-6 text-left'>로그인</h2>

            {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm md:text-base'>
                아이디 또는 비밀번호가 잘못 되었습니다.
                <br /> 아이디와 비밀번호를 정확히 입력해 주세요.
              </div>
            )}

            {/* 로그인 입력 폼 */}
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
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
                  {/* 이메일 유효성 검사 오류 메시지 */}
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.email && (
                      <span className='text-red-500'>
                        {formState.errors.email.message as string}
                      </span>
                    )}
                  </div>
                </label>
              </div>

              {/* 비밀번호 입력 필드 */}
              <div>
                <label className='block text-base'>
                  비밀번호
                  <input
                    type='password'
                    {...register('password')}
                    className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                    autoComplete='current-password'
                    placeholder='Password'
                  />
                  {/* 비밀번호 유효성 검사 오류 메시지 */}
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.password && (
                      <span className='text-red-500'>
                        {formState.errors.password.message as string}
                      </span>
                    )}
                  </div>
                </label>
              </div>

              {/* 비밀번호 찾기 링크 */}
              <div className='flex justify-end text-base'>
                <Link
                  href='forgot-password'
                  className='text-gray-500 hover:underline'
                >
                  비밀번호 찾기
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <button
                disabled={!formState.isValid}
                type='submit'
                className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-gray-800 transition'
              >
                로그인
              </button>

              {/* 카카오 로그인 버튼 */}
              <button
                type='button'
                className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center gap-2'
                onClick={handleKakaoLogin}
              >
                카카오 로그인
              </button>
            </form>

            {/* 회원가입 링크 */}
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
  );
};

export default SignIn;
