'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

  // 컴포넌트 마운트 시 해시 프래그먼트 및 오류 처리
  useEffect(() => {
    // 해시 프래그먼트에서 오류 파싱
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

  // 비밀번호 재설정 폼 제출 핸들러
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

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-1 items-center justify-center p-6'>
        <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-md'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            비밀번호 재설정
          </h2>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          {isSubmitted ? (
            <div className='text-center'>
              <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
                비밀번호가 성공적으로 재설정되었습니다. 로그인 페이지로
                이동합니다.
              </div>
              <Link
                href='/auth/sign-in'
                className='text-blue-600 hover:underline'
              >
                로그인 페이지로 이동
              </Link>
            </div>
          ) : (
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className='block text-base font-medium mb-2'>
                  새 비밀번호
                  <input
                    type='password'
                    {...register('password')}
                    className='w-full px-4 py-3 border rounded-xl bg-gray-50 mt-1'
                    placeholder='새로운 비밀번호를 입력하세요'
                    autoComplete='new-password'
                    disabled={!!error}
                  />
                </label>
                <div className='mt-2 text-red-500'>
                  {formState.errors.password && (
                    <span>{formState.errors.password.message as string}</span>
                  )}
                </div>
              </div>

              <div>
                <label className='block text-base font-medium mb-2'>
                  비밀번호 확인
                  <input
                    type='password'
                    {...register('confirmPassword')}
                    className='w-full px-4 py-3 border rounded-xl bg-gray-50 mt-1'
                    placeholder='비밀번호를 다시 입력하세요'
                    autoComplete='new-password'
                    disabled={!!error}
                  />
                </label>
                <div className='mt-2 text-red-500'>
                  {formState.errors.confirmPassword && (
                    <span>
                      {formState.errors.confirmPassword.message as string}
                    </span>
                  )}
                </div>
              </div>

              <button
                type='submit'
                disabled={!formState.isValid || isLoading || !!error}
                className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-gray-800 transition'
              >
                {isLoading ? '처리 중...' : '비밀번호 변경하기'}
              </button>

              {error && (
                <div className='text-center mt-4'>
                  <Link
                    href='/forgot-password'
                    className='text-blue-600 hover:underline'
                  >
                    비밀번호 재설정 링크 다시 받기
                  </Link>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
