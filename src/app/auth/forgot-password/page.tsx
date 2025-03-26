'use client';

import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import AuthCard from '@/components/features/auth/auth-card';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import AuthInput from '@/components/features/auth/auth-input';
import AuthLink from '@/components/features/auth/auth-link';
import AuthButton from '@/components/features/auth/auth-button';

import { forgotPasswordSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/auth-service';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: FieldValues) => {
    try {
      setError(null);
      const { error } = await authService.resetPassword(values.email);

      if (error) {
        setError(error.message || '비밀번호 재설정 링크 전송에 실패했습니다.');
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '예상치 못한 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Reset password error:', err);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/sign-in');
  };

  if (isSubmitted) {
    return (
      <AuthCard>
        <div className='text-center'>
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
            비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을
            확인해주세요.
          </div>
          <AuthButton onClick={handleBackToLogin}>
            로그인 페이지로 돌아가기
          </AuthButton>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h2 className='text-2xl mb-6 text-left'>비밀번호 찾기</h2>

      {error && <AuthErrorMessage message={error} />}

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label='이메일'
          type='email'
          register={register('email')}
          error={formState.errors.email}
          placeholder='가입한 이메일을 입력하세요'
          autoComplete='email'
        />

        <AuthButton disabled={!formState.isValid}>
          비밀번호 재설정 링크 받기
        </AuthButton>

        <div className='mt-4 text-center'>
          <AuthLink href='/auth/sign-in'>로그인 페이지로 돌아가기</AuthLink>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
