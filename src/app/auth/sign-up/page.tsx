'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/utils/schemas';

const SignUp = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-center justify-center p-6'>
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
          <div className='p-6 w-[55%] '>
            <div className='w-[100%] bg-white p-8 rounded-xl'>
              <h2 className='text-xl font-semibold mb-6 text-left'>Sign Up</h2>

              <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className='block text-base mb-2'>이메일</label>
                  <div className='flex gap-4'>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
                      className='w-10/12 px-4 py-3 border rounded-xl var(--color-white-light) text-base'
                      autoComplete='email'
                    />
                    <button
                      type='button'
                      className='border rounded-lg bg-[var(--color-gray)] w-16'
                    >
                      중복검사
                    </button>
                  </div>
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.email && (
                      <span>{formState.errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-base mb-2'>비밀번호</label>
                  <input
                    type='password'
                    {...register('password')}
                    className='w-10/12 px-4 py-3 border rounded-xl bg-[var(--color-white-light)] text-base'
                    placeholder='Password'
                    autoComplete='new-password'
                  />
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.password && (
                      <span>{formState.errors.password.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-base mb-2'>비밀번호 확인</label>
                  <input
                    id='confirmPassword'
                    type='password'
                    {...register('confirmPassword')}
                    className='w-10/12 px-4 py-3 border rounded-xl var(--color-gray) text-base'
                    placeholder='Password'
                    autoComplete='current-password'
                  />
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.confirmPassword && (
                      <span>{formState.errors.confirmPassword.message}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-base mb-2'>휴대폰 번호</label>
                  <div className='flex gap-4'>
                    <input
                      type='text'
                      {...register('phone')}
                      className='w-10/12 px-4 py-3 border rounded-xl bg-gray-100 text-base'
                      placeholder="'-' 없이 입력"
                    />
                    <button
                      type='button'
                      className='border rounded-lg bg-[gray] w-16'
                    >
                      인증
                    </button>
                  </div>
                  {formState.errors.phone && (
                    <p className='text-red-500 ml-1 mt-2'>
                      {formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={!formState.isValid}
                  type='submit'
                  className='w-10/12 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition mb-2'
                >
                  회원가입
                </button>
              </form>

              <div className='mt-6 text-center text-sm'>
                <p>
                  이미 계정이 있으신가요?{' '}
                  <Link
                    href='/auth/sign-in'
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
