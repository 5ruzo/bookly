'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/utils/auth/schemas';
import { authService } from '@/lib/api/auth-service';

const ForgotPassword = () => {
  // 비밀번호 재설정 요청 완료 여부를 확인하는 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  // react-hook-form 설정: 이메일 필드와 zod를 통한 유효성 검사 적용
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema), // zod 스키마로 유효성 검사 적용
  });

  // 폼 제출 시 실행되는 비동기 함수
  const onSubmit = async (values: FieldValues) => {
    try {
      // resetPassword 함수로 이메일 전송
      const { error } = await authService.resetPassword(values.email);
      if (error) {
        return alert('유효한 이메일이 아닙니다.');
      }
      // 성공 시 제출 완료 상태로 변경
      setIsSubmitted(true);
    } catch (err) {
      // 에러 발생 시 콘솔에 오류 메시지 출력
      console.error('Reset password error:', err);
    }
  };

  return (
    <div className='flex min-h-screen'>
      {/* 화면 전체를 감싸는 컨테이너 */}
      <div className='flex flex-1 items-center justify-center p-6'>
        {/* 비밀번호 찾기 카드 */}
        <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-md'>
          {/* 페이지 제목 */}
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            비밀번호 찾기
          </h2>

          {/* 비밀번호 재설정 링크 발송 완료 시 나타나는 메시지 */}
          {isSubmitted ? (
            <div className='text-center'>
              {/* 성공 메시지 */}
              <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
                비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을
                확인해주세요.
              </div>
              {/* 로그인 페이지로 이동하는 링크 */}
              <Link
                href='/auth/sign-in'
                className='text-blue-600 hover:underline'
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          ) : (
            // 비밀번호 찾기 폼
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              {/* 이메일 입력 필드 */}
              <div>
                <label className='block text-base font-medium mb-2'>
                  이메일
                  <input
                    type='email'
                    {...register('email')}
                    className='w-full px-4 py-3 border rounded-xl bg-gray-50 mt-2'
                    placeholder='가입한 이메일을 입력하세요'
                  />
                </label>
                {/* 이메일 유효성 검사 오류 메시지 */}
                <div className='mt-2 text-red-500'>
                  {formState.errors.email && (
                    <span>{formState.errors.email.message as string}</span>
                  )}
                </div>
              </div>

              {/* 비밀번호 재설정 링크 요청 버튼 */}
              <button
                type='submit'
                disabled={!formState.isValid}
                className='w-full py-3 bg-[var(--color-primary)] text-white rounded-xl hover:bg-gray-800 transition'
              >
                비밀번호 재설정 링크 받기
              </button>

              {/* 로그인 페이지로 돌아가는 링크 */}
              <div className='text-center mt-4'>
                <Link
                  href='/auth/sign-in'
                  className='text-blue-600 hover:underline'
                >
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
