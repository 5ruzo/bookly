'use client';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import AuthCard from '@/components/features/auth/auth-card';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import AuthInput from '@/components/features/auth/auth-input';
import AuthLink from '@/components/features/auth/auth-link';
import AuthButton from '@/components/features/auth/auth-button';

import { loginSchema } from '@/lib/utils/auth.util';
import { authService } from '@/lib/api/auth-service';
import { useAuthStore } from '@/store/use-auth-store';

const SignIn = () => {
  const setError = useAuthStore((state) => state.setError);
  const error = useAuthStore((state) => state.error);

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  });

  const handleKakaoLogin = async () => {
    try {
      await authService.signInWithKakao();
    } catch (err) {
      console.error('카카오 로그인 실패:', err);
      Swal.fire({
        title: '다시 시도하세요!',
        text: '로그인에 실패했습니다.',
        icon: 'error',
      });
    }
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const { data, error } = await authService.signIn(
        values.email,
        values.password
      );

      if (error) {
        setError(error.message);
        return;
      }

      if (data?.user) {
        Swal.fire({
          title: '환영합니다!',
          text: '로그인 성공!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
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
    <AuthCard>
      <h2 className='text-2xl mb-6 text-left'>로그인</h2>

      {error && (
        <AuthErrorMessage
          message='아이디 또는 비밀번호가 잘못 되었습니다. 
          아이디와 비밀번호를 정확히 입력해 주세요.'
        />
      )}

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
          autoComplete='current-password'
        />

        <div className='flex justify-end text-base'>
          <AuthLink href='/auth/forgot-password'>비밀번호 찾기</AuthLink>
        </div>

        <AuthButton disabled={!formState.isValid}>로그인</AuthButton>

        <AuthButton type='button' variant='kakao' onClick={handleKakaoLogin}>
          카카오 로그인
        </AuthButton>
      </form>

      <div className='mt-6 text-center text-sm'>
        <p>
          계정이 없으신가요? <AuthLink href='/auth/sign-up'>회원가입</AuthLink>
        </p>
      </div>
    </AuthCard>
  );
};

export default SignIn;
