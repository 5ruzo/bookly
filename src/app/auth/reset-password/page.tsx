'use client';

import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import AuthCard from '@/components/features/auth/auth-card';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import AuthInput from '@/components/features/auth/auth-input';
import AuthLink from '@/components/features/auth/auth-link';
import AuthButton from '@/components/features/auth/auth-button';

import { resetPasswordSchema } from '@/lib/utils/auth/schemas';
import browserClient from '@/lib/utils/supabase/client';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const parseHashFragment = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          switch (error) {
            case 'access_denied':
              if (errorDescription?.includes('expired')) {
                setError(
                  '비밀번호 재설정 링크가 만료되었습니다. 새 링크를 요청해주세요.'
                );
              } else {
                setError(
                  '유효하지 않은 접근입니다. 비밀번호 재설정 링크를 다시 요청해주세요.'
                );
              }
              break;
            default:
              setError('비밀번호 재설정 중 오류가 발생했습니다.');
          }
        }
      }
    };

    parseHashFragment();
  }, []);

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await browserClient.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      setIsSubmitted(true);

      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 3000);
    } catch (err: any) {
      setError(err.message || '비밀번호 재설정 중 오류가 발생했습니다.');
      console.error('Reset password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthCard>
        <div className='text-center'>
          <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
            비밀번호가 성공적으로 재설정되었습니다. 로그인 페이지로 이동합니다.
          </div>
          <AuthLink href='/auth/sign-in'>로그인 페이지로 이동</AuthLink>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <h2 className='text-2xl mb-6 text-left'>비밀번호 재설정</h2>

      {error && <AuthErrorMessage message={error} />}

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          label='새 비밀번호'
          type='password'
          register={register('password')}
          error={formState.errors.password}
          placeholder='새로운 비밀번호를 입력하세요'
          autoComplete='new-password'
          disabled={!!error}
        />

        <AuthInput
          label='비밀번호 확인'
          type='password'
          register={register('confirmPassword')}
          error={formState.errors.confirmPassword}
          placeholder='비밀번호를 다시 입력하세요'
          autoComplete='new-password'
          disabled={!!error}
        />

        <AuthButton disabled={!formState.isValid || isLoading || !!error}>
          {isLoading ? '처리 중...' : '비밀번호 변경하기'}
        </AuthButton>

        {error && (
          <div className='text-center mt-4'>
            <AuthLink href='/auth/forgot-password'>
              비밀번호 재설정 링크 다시 받기
            </AuthLink>
          </div>
        )}
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
