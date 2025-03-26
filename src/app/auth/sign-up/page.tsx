'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/auth/auth-service';
import { useAuthStore } from '@/store/auth/use-auth-store';

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
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      const { data, error } = await authService.signUp(
        values.email,
        values.password,
        values.phone
      );

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
    <div className='flex min-h-screen items-start justify-center px-4 py-6'>
      <div className='w-full max-w-4xl rounded-xl bg-[var(--color-secondary)] flex flex-col md:flex-row overflow-hidden shadow-lg'>
        {/* 이미지 영역 - 모바일과 데스크톱에서 조건부 렌더링 */}
        <div className='hidden md:block md:w-1/2 relative'>
          <div className='relative w-full h-full min-h-[500px]'>
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
        {/* 폼 영역 */}
        <div className='w-full md:w-[55%] p-6'>
          <div className='flex flex-col justify-center w-full h-full bg-[var(--color-white-light)] p-6 md:p-12 rounded-xl'>
            <div className='w-full max-w-md mx-auto'>
              <h2 className='text-2xl mb-6 text-left'>회원가입</h2>

              <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
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
                  <label className='block text-base'>
                    비밀번호 확인
                    <input
                      id='confirmPassword'
                      type='password'
                      {...register('confirmPassword')}
                      className='w-full px-4 py-3 border rounded-xl text-base mt-2'
                      placeholder='Password'
                      autoComplete='current-password'
                    />
                  </label>
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
                  className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-gray-800 transition mb-2'
                >
                  회원가입
                </button>
              </form>

              {/* 로그인 링크 */}
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
