'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/lib/utils/auth/schemas';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const { signUp, checkEmailExists, isLoading, error } = useAuthStore();
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string | null>(
    null
  );
  const { register, handleSubmit, formState, getValues, trigger } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();

  const handleEmailCheck = async () => {
    const email = getValues('email');

    // 유효한 이메일인지 확인하는 로직
    const isValid = await trigger('email');
    if (!isValid) return;

    // 유효한 이메일이 있는지 체크하는 로직
    const exists = await checkEmailExists(email);
    if (exists) {
      setEmailChecked(false);
      setEmailCheckMessage('이미 사용 중인 이메일입니다.');
    } else {
      setEmailChecked(true);
      setEmailCheckMessage('사용 가능한 이메일입니다.');
    }
  };

  const onSubmit = async (values: FieldValues) => {
    if (!emailChecked) {
      setEmailCheckMessage('이메일 중복 검사를 해주세요.');
      return;
    }

    try {
      await signUp(values.email, values.password, values.phone);
      router.push('/');
    } catch (err) {
      console.error('Sign up error:', err);
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
          <div className='p-6 w-[50%] '>
            <div className='w-[100%] h-full bg-[var(--color-white-light)] p-12 rounded-xl'>
              <h2 className='text-2xl font-semibold mb-6 text-left'>Sign Up</h2>

              {error && (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                  {error}
                </div>
              )}

              <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className='block text-base mb-2'>이메일</label>
                  <div className='flex gap-4'>
                    <input
                      {...register('email')}
                      type='email'
                      placeholder='Email'
                      className='w-9/12 px-4 py-3 border rounded-xl var(--color-white-light) text-base'
                      autoComplete='email'
                    />
                    <button
                      type='button'
                      className='border rounded-lg bg-[var(--color-gray)] w-16'
                      onClick={handleEmailCheck}
                    >
                      중복검사
                    </button>
                  </div>
                  <div className='ml-1 mt-2 text-red-500'>
                    {formState.errors.email && (
                      <span>{formState.errors.email.message as string}</span>
                    )}
                    {!formState.errors.email && emailCheckMessage && (
                      <span
                        className={
                          emailChecked ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {emailCheckMessage}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className='block text-base mb-2'>비밀번호</label>
                  <input
                    type='password'
                    {...register('password')}
                    className='w-9/12 px-4 py-3 border rounded-xl bg-[var(--color-white-light)] text-base'
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
                    className='w-9/12 px-4 py-3 border rounded-xl var(--color-gray) text-base'
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
                      className='w-9/12 px-4 py-3 border rounded-xl bg-gray-100 text-base'
                      placeholder="'-' 없이 입력"
                    />
                  </div>
                  {formState.errors.phone && (
                    <p className='text-red-500 ml-1 mt-2'>
                      {formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  disabled={!formState.isValid || isLoading}
                  type='submit'
                  className='w-full py-3 bg-black text-white rounded-xl transition mb-2'
                >
                  {isLoading ? '처리 중...' : '회원가입'}
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

export default SignUpPage;
