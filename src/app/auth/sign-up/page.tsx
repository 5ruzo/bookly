'use client';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import AuthCard from '@/components/features/auth/auth-card';
import AuthInput from '@/components/features/auth/auth-input';
import AuthButton from '@/components/features/auth/auth-button';
import AuthLink from '@/components/features/auth/auth-link';

import { signupSchema } from '@/lib/utils/auth.util';
import { authService } from '@/lib/api/auth-service';
import { useAuthStore } from '@/store/use-auth-store';

const SignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
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
        return;
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
    <AuthCard imageSrc='/images/sign-up-image.png' imageAlt='회원가입 이미지'>
      <div className='w-full max-w-md mx-auto'>
        <h2 className='text-2xl mb-6 text-left'>회원가입</h2>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            label='이메일'
            type='email'
            register={register('email')}
            error={formState.errors.email}
            placeholder='Email'
            autoComplete='email'
          />

          <AuthInput
            label='비밀번호'
            type='password'
            register={register('password')}
            error={formState.errors.password}
            placeholder='Password'
            autoComplete='new-password'
          />

          <AuthInput
            label='비밀번호 확인'
            type='password'
            register={register('confirmPassword')}
            error={formState.errors.confirmPassword}
            placeholder='Password'
            autoComplete='new-password'
          />

          <AuthInput
            label='휴대폰 번호'
            type='tel'
            register={register('phone')}
            error={formState.errors.phone}
            placeholder='010-1234-5678'
          />

          <AuthButton disabled={!formState.isValid}>회원가입</AuthButton>
        </form>

        <div className='mt-6 text-center text-sm'>
          <p>
            이미 계정이 있으신가요?{' '}
            <AuthLink href='/auth/sign-in'>로그인</AuthLink>
          </p>
        </div>
      </div>
    </AuthCard>
  );
};

export default SignUp;
