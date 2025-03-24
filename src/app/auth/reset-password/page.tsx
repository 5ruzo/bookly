'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/store/useAuthStore'; //
import { resetPasswordSchema } from '@/lib/utils/auth/schemas';

const ResetPassword = () => {
  // 로딩 상태, 에러 메시지, 제출 완료 상태를 관리하는 로컬 상태
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const router = useRouter();
  const searchParams = useSearchParams(); // URL에서 쿼리 파라미터를 가져오는 훅

  // 비밀번호 및 비밀번호 확인 입력 필드를 관리하는 폼 설정
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  // 컴포넌트 마운트 시 URL에서 토큰 유효성 검사
  useEffect(() => {
    const token = searchParams?.get('token'); // URL에서 'token' 쿼리 파라미터 추출
    if (!token) {
      setError(
        '유효하지 않은 접근입니다. 비밀번호 재설정 링크를 다시 요청해주세요.'
      );
    }
  }, [searchParams]); // searchParams 변경 시 실행

  // 비밀번호 재설정 폼 제출 핸들러
  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);
      setError(null);

      // URL에서 토큰을 가져와서 확인
      const token = searchParams?.get('token');
      if (!token) {
        throw new Error('Reset token is missing');
      }

      // Supabase를 사용해 비밀번호 업데이트
      const { error } = await supabase.auth.updateUser({
        password: values.password, // 새 비밀번호 전달
      });

      if (error) throw error;

      setIsSubmitted(true); // 제출 완료 상태로 변경

      // 3초 후 로그인 페이지로 리다이렉트
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
          {/* 페이지 제목 */}
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            비밀번호 재설정
          </h2>

          {/* 에러 메시지 출력 */}
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          {/* 비밀번호 변경 완료 후 안내 메시지 출력 */}
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
            // 비밀번호 재설정 폼
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              {/* 새 비밀번호 입력 필드 */}
              <div>
                <label className='block text-sm font-medium mb-2'>
                  새 비밀번호
                </label>
                <input
                  type='password'
                  {...register('password')}
                  className='w-full px-4 py-3 border rounded-xl bg-gray-50'
                  placeholder='새로운 비밀번호를 입력하세요'
                  autoComplete='new-password'
                />
                {/* 유효성 검사 오류 메시지 */}
                <div className='mt-2 text-red-500'>
                  {formState.errors.password && (
                    <span>{formState.errors.password.message as string}</span>
                  )}
                </div>
              </div>

              {/* 비밀번호 확인 입력 필드 */}
              <div>
                <label className='block text-sm font-medium mb-2'>
                  비밀번호 확인
                </label>
                <input
                  type='password'
                  {...register('confirmPassword')}
                  className='w-full px-4 py-3 border rounded-xl bg-gray-50'
                  placeholder='비밀번호를 다시 입력하세요'
                  autoComplete='new-password'
                />
                {/* 유효성 검사 오류 메시지 */}
                <div className='mt-2 text-red-500'>
                  {formState.errors.confirmPassword && (
                    <span>
                      {formState.errors.confirmPassword.message as string}
                    </span>
                  )}
                </div>
              </div>

              {/* 비밀번호 변경 버튼 */}
              <button
                type='submit'
                disabled={!formState.isValid || isLoading}
                className='w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition'
              >
                {isLoading ? '처리 중...' : '비밀번호 변경하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
