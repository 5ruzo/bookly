'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/authService';
import { useAuthStore } from '@/store/useAuthStore';

const SignUp = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(signupSchema), // Zod로 입력 값 유효성 검사
  });

  // 회원가입 폼 제출 함수
  const onSubmit = async (values: FieldValues) => {
    try {
      const { data, error } = await authService.signUp(
        values.email,
        values.password,
        values.phone
      ); // 회원가입 요청

      if (error) {
        console.error('회원가입 에러:', error);
        alert('회원가입 실패!');
      }

      if (data?.user) {
        setUser(data.user);
        alert('회원가입 성공!');
        router.push('/');
      }
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-start justify-center p-6'>
        <div className='w-full h-[700px] max-h-[700px] max-w-[1000px] rounded-xl bg-[var(--color-secondary)] flex overflow-hidden'>
          {/* 이미지 영역 */}
          <div className='w-[45%] relative flex items-center justify-center'>
            <div className='relative w-full h-full max-w-full max-h-full'>
              <Image
                src='/images/sign-up-image.png'
                alt='회원가입 이미지'
                fill
                priority
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          </div>

          {/* 오른쪽 폼 */}
          <div className='p-6 w-[55%]'>
            <div className='flex flex-col justify-center w-[100%] h-full bg-[var(--color-white-light)] p-12 rounded-xl'>
              <h2 className='text-2xl mb-6 text-left'>회원가입</h2>

              <form className='space-y-0' onSubmit={handleSubmit(onSubmit)}>
                {/* 이메일 입력 */}
                <div>
                  <label className='block text-base'>
                    이메일
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      autoComplete='email'
                    />
                  </label>
                  {/* 이메일 유효성 검사 오류 메시지 */}
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.email && (
                      <span className='text-red-500'>
                        {formState.errors.email.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 입력 */}
                <div>
                  <label className='block text-base'>
                    비밀번호
                    <input
                      type='password'
                      {...register('password')}
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      placeholder='Password'
                      autoComplete='new-password'
                    />
                  </label>
                  {/* 비밀번호 유효성 검사 오류 메시지 */}
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.password && (
                      <span className='text-red-500'>
                        {formState.errors.password.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div>
                  <label className='block text-base'>비밀번호 확인</label>
                  <input
                    id='confirmPassword'
                    type='password'
                    {...register('confirmPassword')}
                    className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <div className='block left-0 right-0 h-6 mt-1'>
                    {formState.errors.confirmPassword && (
                      <span className='text-red-500'>
                        {formState.errors.confirmPassword.message as string}
                      </span>
                    )}
                  </div>
                </div>

                {/* 휴대폰 번호 입력 */}
                <div>
                  <label className='block text-base'>
                    휴대폰 번호
                    <input
                      type='tel'
                      {...register('phone')}
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      placeholder='010-1234-5678'
                    />
                  </label>
                  {/* 휴대폰 번호 유효성 검사 오류 메시지 */}
                  <div className='block left-0 right-0 h-6 mt-1 mb-2'>
                    {formState.errors.phone && (
                      <p className='text-red-500'>
                        {formState.errors.phone.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <button
                  disabled={!formState.isValid}
                  type='submit'
                  className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl  transition mb-2'
                >
                  회원가입
                </button>
              </form>

              {/* 로그인 링크 */}
              <div className='mt-6 text-center text-sm'>
                <p>
                  이미 계정이 있으신가요?{' '}
                  <Link
                    href='/sign-in'
                    className='text-blue-600 hover:underline'
                  >
                    로그인
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

export default SignUp;
